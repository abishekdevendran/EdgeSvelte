<script>
	import '../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>VerbaTrack</title>
</svelte:head>

<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b">
	<NavBrand href="/">
		<img src="logo.svg" class="mr-3 h-6 sm:h-9" alt="VerbaTrack Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>VerbaTrack</span
		>
	</NavBrand>
	<DarkMode />
</Navbar>
<div class="mt-16"/>
<slot />
