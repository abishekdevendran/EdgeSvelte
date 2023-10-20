interface Resp {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function load() {
	const resp:Resp[] = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
		response.json()
	);
	return {
		resp: resp
	};
}
