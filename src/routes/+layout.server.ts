export async function load({ locals, depends }) {
  depends('app:user')
	const session = await locals.auth.validate();
	if (!session)
		return {
			user: null
		};
	return {
		user: session.user
	};
}
