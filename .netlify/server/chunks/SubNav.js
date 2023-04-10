import { c as create_ssr_component, e as escape } from "./index.js";
const SubNav_svelte_svelte_type_style_lang = "";
const css = {
  code: "#subheader.svelte-1kzkurn.svelte-1kzkurn{height:15rem;display:flex;justify-content:center;align-items:flex-end;padding-bottom:3rem;position:relative;background:url(/img08m.webp) center / cover no-repeat}#subheader.svelte-1kzkurn h1.svelte-1kzkurn{font-size:2em;letter-spacing:2px;color:white;position:relative;z-index:3;text-transform:capitalize}#subheader.svelte-1kzkurn .abs-head.svelte-1kzkurn{position:absolute;max-width:100%;bottom:1.5em;z-index:2}#subheader.svelte-1kzkurn .overlay.svelte-1kzkurn{position:absolute;width:100%;height:100%;top:0;left:0;object-fit:cover;background-color:black;opacity:60%}@media(min-width: 768px){#subheader.svelte-1kzkurn.svelte-1kzkurn{height:15rem;background:url(/img08l.webp) center / cover no-repeat}}@media(min-width: 1200px){#subheader.svelte-1kzkurn.svelte-1kzkurn{height:18rem}}",
  map: null
};
const SubNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pageTitle } = $$props;
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$result.css.add(css);
  return `<section id="${"subheader"}" class="${"svelte-1kzkurn"}"><img aria-hidden="${"true"}" src="${"/twig.png"}" alt="${"twig"}" class="${"abs-head svelte-1kzkurn"}" width="${"100"}" height="${"139"}">
	<h1 class="${"svelte-1kzkurn"}">${escape(pageTitle)}</h1>
	<div class="${"overlay svelte-1kzkurn"}"></div>
</section>`;
});
export {
  SubNav as S
};
