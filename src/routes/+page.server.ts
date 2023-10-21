import { auth } from '$lib/server/lucia.js';
import { json, redirect } from '@sveltejs/kit';

interface Resp {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/dashboard');
	const resp: Resp[] = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
		response.json()
	);
	console.log(new Date());
	return {
		resp: resp
	};
}

export const actions = {
	logout: async ({ locals }) => {
		console.log('logout');
		const session = await locals.auth.validate();
		if (!session) return { error: 'Unauthorized' }
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/');
	}
};
