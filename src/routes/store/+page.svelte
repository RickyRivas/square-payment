<script lang="ts">
	// components
	import SubNav from '$lib/components/SubNav.svelte';
	import SubFooter from '$lib/components/SubFooter.svelte';
	// stores
	import {
		URL,
		companyName,
		industry,
		cityAndState,
		phone,
		email,
		fullAddress,
		googleLink,
		pages
	} from '$lib/config';
	import { page } from '$app/stores';
	// styles
	import '$styles/contact/main.css';
	// logic
	const thisPage = pages.find((p) => p.path === $page.route.id);
	const pageTitle = $page.route.id?.slice(1);

	// LOGIC
	export let data;
	console.log(data);
</script>

<svelte:head>
	<link rel="canonical" href={URL + $page.route.id} />
	<meta name="description" content={thisPage?.metaDescription} />
	<meta property="og:description" content={thisPage?.metaDescription} />
	<title>{companyName} | {industry} | {cityAndState}</title>
</svelte:head>

<SubNav {pageTitle} />

<main id="home">
	<!-- ============================================ -->
	<!--                 Landing                      -->
	<!-- ============================================ -->
	<section id="store">
		<div class="content">
			<h1>Store Demo</h1>
			<p>
				Talk about the other services they do with keywords and locations where they serve. Try to
				make this 2-3 lines tall.
			</p>
			<div class="btns">
				<a href="/contact" class="btn">Main Call to Action</a>
			</div>
		</div>
	</section>
	<!-- ============================================ -->
	<!--                 Services                     -->
	<!-- ============================================ -->
</main>
