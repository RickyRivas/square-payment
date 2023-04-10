import { c as create_ssr_component } from "./index.js";
const SubFooter_svelte_svelte_type_style_lang = "";
const css = {
  code: "#subfooter.svelte-1mw65op.svelte-1mw65op{background:url(/subfooter/subfooter.webp) center / cover no-repeat;padding:4em 1.5em;position:relative}@media only screen and (min-width: 64em){#subfooter.svelte-1mw65op.svelte-1mw65op{padding:6em 0}}#subfooter.svelte-1mw65op.svelte-1mw65op::before{content:'';width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0, 0, 0, 0.5);z-index:1}#subfooter.svelte-1mw65op .container.svelte-1mw65op{width:100%;max-width:35em;margin:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;z-index:2;position:relative;text-align:center}#subfooter.svelte-1mw65op .container h2.svelte-1mw65op{font-size:2.5em;color:white;margin-bottom:1em}#subfooter.svelte-1mw65op .container p.svelte-1mw65op{line-height:1.3;font-size:1.1em;color:white;margin-bottom:1em}",
  map: null
};
const SubFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="${"subfooter"}" class="${"svelte-1mw65op"}"><div class="${"container svelte-1mw65op"}"><h2 class="${"svelte-1mw65op"}">Get it done<br> with us today</h2>
		<p class="${"svelte-1mw65op"}">Say something catchy, informative, and encouraging to click the button to go to the contact
			page. I like to add these to the bottom of all pages.
		</p>
		<a class="${"btn"}" href="${"/contact"}">Request an Estimate</a></div>
</div>`;
});
export {
  SubFooter as S
};
