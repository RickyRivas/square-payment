<script>
	// components
	// stores
	// styles
	// logic
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ToTop from '$lib/components/ToTop.svelte';
	import '$styles/global.css';
</script>

<Navigation />
<slot />
<Footer />
<ToTop />
