<script lang="ts">
	// components
	import SubNav from '$lib/components/SubNav.svelte';
	import SubFooter from '$lib/components/SubFooter.svelte';
	import BaseImage from '$lib/util/BaseImage.svelte';
	// stores
	import { URL, companyName, industry, cityAndState, pages } from '$lib/config';
	import { page } from '$app/stores';
	// styles
	import '$styles/portfolio/main.css';
	// logic
	const thisPage = pages.find((p) => p.path === $page.route.id);
	const pageTitle = $page.route.id?.slice(1);
	// Swiperjs
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/autoplay';
	import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
	let allImageSrc: any = [];
	let showSwiper = false;
	let showSlideIndex: number | null;
	let imgs: any;
	const initSwiper = (index: any) => {
		showSlideIndex = parseInt(index);
		imgs.forEach((img: any) => {
			allImageSrc = [...allImageSrc, img.src];
		});
		showSwiper = !showSwiper;
	};
	onMount(() => {
		imgs = Array.from(document.querySelectorAll('.item > img'));
		imgs.forEach((img: any, i: any) => {
			img.dataset.index = i;
		});
	});
	async function autofocus(el: any) {
		await tick();
		el.focus();
	}
</script>

<svelte:head>
	<link rel="canonical" href={URL + $page.route.id} />
	<meta name="description" content={thisPage?.metaDescription} />
	<meta property="og:description" content={thisPage?.metaDescription} />
	<title>{companyName} | {industry} | {cityAndState}</title>
</svelte:head>

<SubNav {pageTitle} />

<main id="portfolio">
	<div class="grid">
		<div class="col">
			<div class="item">
				<img
					class=""
					src="/portfolio/img01.webp"
					width=""
					height=""
					alt=""
					loading="lazy"
					decoding="async"
					on:click={(e) => {
						if (!(e.target instanceof HTMLImageElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
					on:keydown={(e) => {
						if (!(e.target instanceof HTMLButtonElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
				/>
			</div>
			<div class="flex">
				<div class="item">
					<img
						class=""
						src="/portfolio/img02.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
				<div class="item">
					<img
						class=""
						src="/portfolio/img03.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="flex">
				<div class="item">
					<img
						class=""
						src="/portfolio/img02.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
				<div class="item">
					<img
						class=""
						src="/portfolio/img03.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
			</div>
			<div class="item">
				<img
					class=""
					src="/portfolio/img01.webp"
					width=""
					height=""
					alt=""
					loading="lazy"
					decoding="async"
					on:click={(e) => {
						if (!(e.target instanceof HTMLImageElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
					on:keydown={(e) => {
						if (!(e.target instanceof HTMLButtonElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
				/>
			</div>
		</div>
		<div class="col">
			<div class="item">
				<img
					class=""
					src="/portfolio/img01.webp"
					width=""
					height=""
					alt=""
					loading="lazy"
					decoding="async"
					on:click={(e) => {
						if (!(e.target instanceof HTMLImageElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
					on:keydown={(e) => {
						if (!(e.target instanceof HTMLButtonElement)) {
							return;
						}
						initSwiper(e.target.dataset.index);
					}}
				/>
			</div>
			<div class="flex">
				<div class="item">
					<img
						class=""
						src="/portfolio/img02.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
				<div class="item">
					<img
						class=""
						src="/portfolio/img03.webp"
						width=""
						height=""
						alt=""
						loading="lazy"
						decoding="async"
						on:click={(e) => {
							if (!(e.target instanceof HTMLImageElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
						on:keydown={(e) => {
							if (!(e.target instanceof HTMLButtonElement)) {
								return;
							}
							initSwiper(e.target.dataset.index);
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</main>

<SubFooter />

{#if showSwiper}
	<section id="swiper-modal" tabindex="-1" role="dialog">
		<div class="overlay" />
		<button
			class="close"
			on:click={() => {
				showSwiper = false;
				showSlideIndex = null;
			}}
		>
			<img src="/close.svg" alt="" width="20" height="20" decoding="async" />
		</button>
		<button class="prev control"
			><img src="/left-chevron.svg" alt="" width="20" height="20" /></button
		>
		<button class="next control"
			><img src="/right-chevron.svg" alt="" width="20" height="20" /></button
		>
		<Swiper
			modules={[Navigation, Autoplay]}
			navigation={{
				prevEl: '.prev',
				nextEl: '.next'
			}}
			autoplay={true}
			class="gallery-swiper"
			initialSlide={showSlideIndex}
			spaceBetween={0}
			slidesPerView={1}
			loop={true}
		>
			{#each allImageSrc as src, index}
				<SwiperSlide data-slide={index}><img {src} alt="swiper slide" /></SwiperSlide>
			{/each}
		</Swiper>
	</section>
{/if}
