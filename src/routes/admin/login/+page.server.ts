import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { verifyPassword, createSession, invalidateSession } from '$lib/server/auth';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email('Format email tidak valid').toLowerCase(),
	password: z.string().min(1, 'Kata sandi wajib diisi')
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/admin');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, url, locals }) => {
		const formData = await request.formData();
		const intent = formData.get('_action') || formData.get('action') || url.searchParams.get('action');

		if (intent === 'logout') {
			const sessionId = cookies.get('session_id');
			if (sessionId) {
				await invalidateSession(sessionId);
				cookies.delete('session_id', { path: '/' });
			}
			locals.user = null;
			locals.session = null;
			throw redirect(303, '/admin/login');
		}

		const rawEmail = formData.get('email');
		const rawPassword = formData.get('password');

		const validation = loginSchema.safeParse({
			email: rawEmail?.toString().trim() ?? '',
			password: rawPassword?.toString() ?? ''
		});

		if (!validation.success) {
			const firstError = validation.error.issues[0]?.message || 'Data login tidak valid';
			return fail(400, {
				error: firstError,
				email: rawEmail?.toString() || ''
			});
		}

		const { email, password } = validation.data;

		try {
			const [user] = await db
				.select()
				.from(schema.users)
				.where(eq(schema.users.email, email))
				.limit(1);

			if (!user) {
				return fail(400, {
					error: 'Email atau kata sandi tidak valid.',
					email
				});
			}

			const passwordValid = verifyPassword(password, user.passwordHash);
			if (!passwordValid) {
				return fail(400, {
					error: 'Email atau kata sandi tidak valid.',
					email
				});
			}

			const sessionId = await createSession(user.id);
			cookies.set('session_id', sessionId, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: false, // secure: false for localhost/tunnel
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});

			const redirectTo = url.searchParams.get('redirectTo') || '/admin';
			throw redirect(303, redirectTo);
		} catch (err: any) {
			if (err?.status === 303) throw err;
			console.error('Login action error:', err);
			return fail(500, {
				error: 'Terjadi kesalahan pada server. Silakan coba lagi.',
				email
			});
		}
	}
};
