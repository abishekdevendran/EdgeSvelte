interface Resp {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export async function load() {
	const resp: Resp[] = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
		response.json()
	);
	console.log(new Date());
	return {
		resp: resp
	};
}
