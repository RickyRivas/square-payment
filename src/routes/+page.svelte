<script lang="ts">
	// components
	import LazyImage from '$lib/util/LazyImage.svelte';
	import BaseImage from './../lib/util/BaseImage.svelte';
	// stores
	import { URL, companyName, industry, cityAndState, pages } from '$lib/config';
	import { reviews, services } from '$lib/content';
	import { page } from '$app/stores';
	// styles
	import '$styles/home/main.css';
	// logic
	const thisPage = pages.find((p) => p.path === $page.route.id);
</script>

<svelte:head>
	<link rel="canonical" href={URL} />
	<meta name="description" content={thisPage?.metaDescription} />
	<meta property="og:description" content={thisPage?.metaDescription} />
	<title>{companyName} | {industry} | {cityAndState}</title>
</svelte:head>

<main id="home">
	<!-- ============================================ -->
	<!--                 Landing                      -->
	<!-- ============================================ -->
	<section id="landing">
		<picture>
			<source media="(max-width: 600px)" srcset="/home/img02m.webp" />
			<source media="(min-width: 601px)" srcset="/home/img02.webp" />
			<img
				aria-hidden="true"
				decoding="async"
				src="/home/img02.jpeg"
				alt="hero"
				width="276"
				height="132"
			/>
		</picture>
		<div class="overlay" />
		<div class="content">
			<h1>Main Keywords of What They Do, And Location If Needed</h1>
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
