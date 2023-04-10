<script lang="ts">
	export let className: string = '';
	export let id: string = '';
	export let alt: string = '';
	export let src: string = '';
	export let width: string = '25';
	export let height: string = '25';
</script>

{#if id}
	<img {id} class={className} {src} {alt} {width} {height} decoding="async" />
{:else}
	<img class={className} {src} {alt} {width} {height} decoding="async" />
{/if}
