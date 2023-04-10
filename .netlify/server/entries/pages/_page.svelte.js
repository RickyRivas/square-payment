import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as each, v as validate_component } from "../../chunks/index.js";
import { L as LazyImage } from "../../chunks/LazyImage.js";
import { B as BaseImage } from "../../chunks/BaseImage.js";
import { a as pages, U as URL, c as companyName, i as industry, b as cityAndState } from "../../chunks/config.js";
import { s as services } from "../../chunks/content.js";
import { p as page } from "../../chunks/stores.js";
const main = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const thisPage = pages.find((p) => p.path === $page.route.id);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-bltveu_START --><link rel="${"canonical"}"${add_attribute("href", URL + $page.route.id, 0)}><meta name="${"description"}"${add_attribute("content", thisPage?.metaDescription, 0)}><meta property="${"og:description"}"${add_attribute("content", thisPage?.metaDescription, 0)}>${$$result.title = `<title>${escape(companyName)} | ${escape(industry)} | ${escape(cityAndState)}</title>`, ""}<!-- HEAD_svelte-bltveu_END -->`, ""}

<main id="${"home"}">
	
	
	<section id="${"landing"}"><picture><source media="${"(max-width: 600px)"}" srcset="${"/home/img02m.webp"}">
			<source media="${"(min-width: 601px)"}" srcset="${"/home/img02.webp"}">
			<img aria-hidden="${"true"}" decoding="${"async"}" src="${"/home/img02.jpeg"}" alt="${"hero"}" width="${"276"}" height="${"132"}"></picture>
		<div class="${"overlay"}"></div>
		<div class="${"content"}"><h1>Main Keywords of What They Do, And Location If Needed</h1>
			<p>Talk about the other services they do with keywords and locations where they serve. Try to
				make this 2-3 lines tall.
			</p>
			<div class="${"btns"}"><a href="${"/contact"}" class="${"btn"}">Main Call to Action</a></div></div></section>
	
	
	
	<section id="${"services"}"><div class="${"container"}">${each(services, ({ name, description }, i) => {
    return `<div class="${"item"}"><div class="${"icon"}">${validate_component(BaseImage, "BaseImage").$$render(
      $$result,
      {
        src: "/home/0" + (i + 1) + ".svg",
        alt: "icon",
        width: "100",
        height: "100"
      },
      {},
      {}
    )}</div>
					<h2>${escape(name)}</h2>
					<p>${escape(description)}</p>
				</div>`;
  })}</div></section>
	
	
	
	<section id="${"layout01"}"><div class="${"container"}"><div class="${"img-container"}">${validate_component(LazyImage, "LazyImage").$$render(
    $$result,
    {
      src: "/home/about.webp",
      alt: "Owner",
      width: "500",
      height: "750"
    },
    {},
    {}
  )}</div>
			<div class="${"content"}"><h2>Trusted home builders for (main city) for over 20 years</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<p class="${"list-head"}"><strong>A list if you need it.</strong></p>
				<ul>${each({ length: 4 }, (_) => {
    return `<li>${validate_component(LazyImage, "LazyImage").$$render(
      $$result,
      {
        src: "/check.svg",
        alt: "checkmark",
        width: "20",
        height: "20"
      },
      {},
      {}
    )}
							<span>List item about something, this one is going to two lines so you can see what it
								looks like</span>
						</li>`;
  })}</ul>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<div class="${"btns"}"><a href="${"/contact"}">Contact Us</a></div></div></div></section>
	
	
	
	<section id="${"layout02"}"><div class="${"container"}"><div class="${"content"}"><h2>Trusted home builders for (main city) for over 20 years</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<p class="${"list-head"}"><strong>A list if you need it.</strong></p>
				<ul>${each({ length: 4 }, (_) => {
    return `<li>${validate_component(LazyImage, "LazyImage").$$render(
      $$result,
      {
        src: "/check.svg",
        alt: "checkmark",
        width: "20",
        height: "20"
      },
      {},
      {}
    )}
							<span>List item about something, this one is going to two lines so you can see what it
								looks like</span>
						</li>`;
  })}</ul>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
					officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				</p>
				<div class="${"btns"}"><a href="${"/contact"}">Contact Us</a></div></div>
			<div class="${"img-container"}">${validate_component(LazyImage, "LazyImage").$$render(
    $$result,
    {
      src: "/home/about.webp",
      alt: "Owner",
      width: "500",
      height: "750"
    },
    {},
    {}
  )}</div></div></section></main>`;
});
export {
  Page as default
};
