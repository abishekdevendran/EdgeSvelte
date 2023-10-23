export const load = async ({ url, data }) => {
	return {
    ...data,
		url: url.pathname
	};
};
