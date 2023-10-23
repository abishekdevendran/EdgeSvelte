<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import '../app.postcss';
	import { Button, Navbar, NavBrand, Spinner } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let data;

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	let isLoggingOut = false;
	const logoutHandler = async () => {
		if (isLoggingOut) return;
		isLoggingOut = true;
		const res = await fetch('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			isLoggingOut = false;
			invalidate('app:user');
			return toast.success('Logged out successfully');
		}
		let resp = await res.json();
		if (resp.error) {
			toast.error(resp.error);
		} else {
			toast.error('Something went wrong');
		}
		isLoggingOut = false;
	};
</script>

<svelte:head>
	<title>VerbaTrack</title>
	<link rel="icon" type="image/svg" href="logo.svg" />
	{@html webManifestLink}
</svelte:head>
<Toaster />
<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b">
	<NavBrand href="/">
		<img src="logo.svg" class="mr-3 h-6 sm:h-9" alt="VerbaTrack Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>VerbaTrack</span
		>
	</NavBrand>
	<div class="flex gap-2 items-center justify-center">
		{#if data.user}
			<form
				action="/?/logout"
				method="POST"
				use:enhance={() => {
					isLoggingOut = true;
					invalidate('app:user');
					return async ({ result }) => {
						isLoggingOut = false;
						if (result.type === 'redirect') {
							goto(result.location);
						} else {
							await applyAction(result);
						}
					};
				}}
			>
				<Button disabled={isLoggingOut} type="submit">
					{#if isLoggingOut}
						<Spinner class="mr-3" size="4" color="white" />
					{/if}
					Logout</Button
				>
			</form>
		{:else}
			<Button href="/auth/github">Github</Button>
		{/if}
		<DarkMode />
	</div>
</Navbar>
<div class="mt-16" />
{#key data.url}
	<div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: -200, duration: 300 }}>
		<slot />
	</div>
{/key}
