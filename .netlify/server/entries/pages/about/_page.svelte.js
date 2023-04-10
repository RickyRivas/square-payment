import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, v as validate_component } from "../../../chunks/index.js";
import { S as SubNav } from "../../../chunks/SubNav.js";
import { S as SubFooter } from "../../../chunks/SubFooter.js";
import { B as BaseImage } from "../../../chunks/BaseImage.js";
import { a as pages, U as URL, c as companyName, i as industry, b as cityAndState } from "../../../chunks/config.js";
import { p as page } from "../../../chunks/stores.js";
const main = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const thisPage = pages.find((p) => p.path === $page.route.id);
  const pageTitle = $page.route.id?.slice(1);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-bltveu_START --><link rel="${"canonical"}"${add_attribute("href", URL + $page.route.id, 0)}><meta name="${"description"}"${add_attribute("content", thisPage?.metaDescription, 0)}><meta property="${"og:description"}"${add_attribute("content", thisPage?.metaDescription, 0)}>${$$result.title = `<title>${escape(companyName)} | ${escape(industry)} | ${escape(cityAndState)}</title>`, ""}<!-- HEAD_svelte-bltveu_END -->`, ""}

${validate_component(SubNav, "SubNav").$$render($$result, { pageTitle }, {}, {})}

<main id="${"about"}">
	
	
	<div class="${"container"}"><div class="${"img-container"}">${validate_component(BaseImage, "BaseImage").$$render(
    $$result,
    {
      src: "/about/owner.webp",
      alt: "Owner",
      width: "500",
      height: "750"
    },
    {},
    {}
  )}
			<div class="${"name"}"><p>Richard Smith</p>
				<span>Owner</span></div></div>
		<div class="${"content"}"><div class="${"flex"}">${validate_component(BaseImage, "BaseImage").$$render(
    $$result,
    {
      src: "/about/grass.svg",
      alt: "icon",
      width: "25",
      height: "25"
    },
    {},
    {}
  )}
				<span>Our Story</span></div>
			<h2>Who we are</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
				officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				pariatur harum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, suscipit
				laborum est perferendis illo, totam, itaque dolores nulla debitis impedit reiciendis
				repellendus in id. Consectetur placeat quis dolores voluptatem quibusdam?
			</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quae quo, earum a nobis
				officiis maiores natus hic omnis corrupti minima eius eaque odio, placeat ad vero magnam
				pariatur harum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, suscipit
				laborum est perferendis illo, totam, itaque dolores nulla debitis impedit reiciendis
				repellendus in id. Consectetur placeat quis dolores voluptatem quibusdam?
			</p>
			<div class="${"btns"}"><a href="${"/"}">Contact Us</a></div></div></div></main>

${validate_component(SubFooter, "SubFooter").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
