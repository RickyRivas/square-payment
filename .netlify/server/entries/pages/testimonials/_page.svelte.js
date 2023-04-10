import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, v as validate_component, f as each } from "../../../chunks/index.js";
import { S as SubNav } from "../../../chunks/SubNav.js";
import { S as SubFooter } from "../../../chunks/SubFooter.js";
import { a as pages, U as URL, c as companyName, i as industry, b as cityAndState } from "../../../chunks/config.js";
import { r as reviews } from "../../../chunks/content.js";
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

<main id="${"testimonials"}"><div class="${"container"}">${each(reviews, ({ review, testifier }, i) => {
    return `<div class="${"item"}"><div class="${"stars"}">${each({ length: 5 }, (_) => {
      return `<svg width="${"30"}" height="${"30"}" viewBox="${"0 0 30 30"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" aria-hidden="${"true"}" role="${"img"}"><path d="${"M30 11.5908L19.0993 10.8741L14.994 0.560669L10.8888 10.8741L0 11.5908L8.3516 18.6821L5.61105 29.4393L14.994 23.5084L24.3771 29.4393L21.6365 18.6821L30 11.5908Z"}" fill="${"currentcolor"}"></path></svg>`;
    })}</div>
				<p>${escape(review)}</p>
				<div class="${"info"}"><img src="${"/reviews/user.svg"}" alt="${"testifier"}" width="${"40"}" height="${"40"}">
					<div><h4>${escape(testifier)}</h4>
						<p>Homeowner</p>
					</div></div>
			</div>`;
  })}</div></main>

${validate_component(SubFooter, "SubFooter").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
