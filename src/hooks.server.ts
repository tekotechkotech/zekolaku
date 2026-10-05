import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	if (sessionId) {
		const authResult = await validateSession(sessionId);
		if (authResult) {
			event.locals.user = {
				id: authResult.user.id,
				email: authResult.user.email,
				name: authResult.user.name,
				role: authResult.user.role
			};
			event.locals.session = authResult.session;
		} else {
			event.cookies.delete('session_id', { path: '/' });
			event.locals.user = null;
			event.locals.session = null;
		}
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	// Protect Admin routes
	if (event.url.pathname.startsWith('/admin')) {
		const isLoginPage = event.url.pathname === '/admin/login';

		if (!event.locals.user && !isLoginPage) {
			throw redirect(303, `/admin/login?redirectTo=${encodeURIComponent(event.url.pathname)}`);
		}

		if (event.locals.user && isLoginPage) {
			throw redirect(303, '/admin');
		}
	}

	return resolve(event);
};
