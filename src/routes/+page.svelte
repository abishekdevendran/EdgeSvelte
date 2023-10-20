<script lang="ts">
	import { P } from 'flowbite-svelte';

	export let data;
</script>

{#each data.resp as datum}
	<P>{JSON.stringify(datum)}</P>
{/each}
