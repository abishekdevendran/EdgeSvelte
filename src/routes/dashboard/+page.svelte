<script lang="ts">
	import { A, Avatar, Breadcrumb, BreadcrumbItem, P } from 'flowbite-svelte';

	export let data;
</script>

<Breadcrumb class="m-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumb>
<P>
	Logged In Welcome {JSON.stringify(data)}
	<Avatar src={data.user.avatar ?? undefined} />
	<A href="/test">Go to test route</A>
</P>
