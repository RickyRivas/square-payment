<script lang="ts">
	// components
	import SubNav from '$lib/components/SubNav.svelte';
	import SubFooter from '$lib/components/SubFooter.svelte';
	import BaseImage from './../../lib/util/BaseImage.svelte';
	// stores
	import { URL, companyName, industry, cityAndState, pages } from '$lib/config';
	import { page } from '$app/stores';
	// styles
	import '$styles/about/main.css';
	// logic
	const thisPage = pages.find((p) => p.path === $page.route.id);
	const pageTitle = $page.route.id?.slice(1);
</script>

<svelte:head>
	<link rel="canonical" href={URL + $page.route.id} />
	<meta name="description" content={thisPage?.metaDescription} />
	<meta property="og:description" content={thisPage?.metaDescription} />
	<title>{companyName} | {industry} | {cityAndState}</title>
</svelte:head>

<SubNav {pageTitle} />

<main id="about">
	<!-- ============================================ -->
	<!--                 Main About                   -->
	<!-- ============================================ -->
	<div class="container">
		<div class="img-container">
			<BaseImage src="/about/owner.webp" alt="Owner" width="500" height="750" />
			<div class="name">
				<p>Richard Smith</p>
				<span>Owner</span>
			</div>
		</div>
		<div class="content">
			<div class="flex">
				<BaseImage src="/about/grass.svg" alt="icon" width="25" height="25" />
				<span>Our Story</span>
			</div>
			<h2>Who we are</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
				officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				pariatur harum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, suscipit
				laborum est perferendis illo, totam, itaque dolores nulla debitis impedit reiciendis
				repellendus in id. Consectetur placeat quis dolores voluptatem quibusdam?
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
				officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				pariatur harum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, suscipit
				laborum est perferendis illo, totam, itaque dolores nulla debitis impedit reiciendis
				repellendus in id. Consectetur placeat quis dolores voluptatem quibusdam?
			</p>
			<div class="btns">
				<a href="/">Contact Us</a>
			</div>
		</div>
	</div>
</main>

<SubFooter />
