import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth';

async function handleLogout(cookies: any, locals: any) {
	const sessionId = cookies.get('session_id');
	if (sessionId) {
		await invalidateSession(sessionId);
		cookies.delete('session_id', { path: '/' });
	}
	locals.user = null;
	locals.session = null;
	throw redirect(303, '/admin/login');
}

export const GET: RequestHandler = async ({ cookies, locals }) => {
	await handleLogout(cookies, locals);
	throw redirect(303, '/admin/login');
};

export const POST: RequestHandler = async ({ cookies, locals }) => {
	await handleLogout(cookies, locals);
	throw redirect(303, '/admin/login');
};
