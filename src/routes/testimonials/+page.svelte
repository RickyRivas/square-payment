<script lang="ts">
	// components
	import SubNav from '$lib/components/SubNav.svelte';
	import SubFooter from './../../lib/components/SubFooter.svelte';
	// stores
	import { URL, companyName, industry, cityAndState, pages } from '$lib/config';
	import { reviews } from '$lib/content';
	import { page } from '$app/stores';
	// styles
	import '$styles/testimonials/main.css';
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

<main id="testimonials">
	<div class="container">
		{#each reviews as { review, testifier }, i}
			<div class="item">
				<div class="stars">
					{#each { length: 5 } as _}
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							role="img"
						>
							<path
								d="M30 11.5908L19.0993 10.8741L14.994 0.560669L10.8888 10.8741L0 11.5908L8.3516 18.6821L5.61105 29.4393L14.994 23.5084L24.3771 29.4393L21.6365 18.6821L30 11.5908Z"
								fill="currentcolor"
							/>
						</svg>
					{/each}
				</div>
				<p>
					{review}
				</p>
				<div class="info">
					<img src="/reviews/user.svg" alt="testifier" width="40" height="40" />
					<div>
						<h4>{testifier}</h4>
						<p>Homeowner</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>

<SubFooter />
