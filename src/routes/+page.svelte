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
	<section id="services">
		<div class="container">
			{#each services as { name, description }, i}
				<div class="item">
					<div class="icon">
						<BaseImage src="/home/0{i + 1}.svg" alt="icon" width="100" height="100" />
					</div>
					<h2>{name}</h2>
					<p>
						{description}
					</p>
				</div>
			{/each}
		</div>
	</section>
	<!-- ============================================ -->
	<!--                 About Us                     -->
	<!-- ============================================ -->
	<section id="layout01">
		<div class="container">
			<div class="img-container">
				<LazyImage src="/home/about.webp" alt="Owner" width="500" height="750" />
			</div>
			<div class="content">
				<h2>Trusted home builders for (main city) for over 20 years</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<p class="list-head"><strong>A list if you need it.</strong></p>
				<ul>
					{#each { length: 4 } as _}
						<li>
							<LazyImage src="/check.svg" alt="checkmark" width="20" height="20" />
							<span
								>List item about something, this one is going to two lines so you can see what it
								looks like</span
							>
						</li>
					{/each}
				</ul>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<div class="btns">
					<a href="/contact">Contact Us</a>
				</div>
			</div>
		</div>
	</section>
	<!-- ============================================ -->
	<!--                 Misc                         -->
	<!-- ============================================ -->
	<section id="layout02">
		<div class="container">
			<div class="content">
				<h2>Trusted home builders for (main city) for over 20 years</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<p class="list-head"><strong>A list if you need it.</strong></p>
				<ul>
					{#each { length: 4 } as _}
						<li>
							<LazyImage src="/check.svg" alt="checkmark" width="20" height="20" />
							<span
								>List item about something, this one is going to two lines so you can see what it
								looks like</span
							>
						</li>
					{/each}
				</ul>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<div class="btns">
					<a href="/contact">Contact Us</a>
				</div>
			</div>
			<div class="img-container">
				<LazyImage src="/home/about.webp" alt="Owner" width="500" height="750" />
			</div>
		</div>
	</section>
</main>
