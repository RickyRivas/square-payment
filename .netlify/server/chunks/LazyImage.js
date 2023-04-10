import { c as create_ssr_component, d as add_attribute } from "./index.js";
const LazyImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { id = "" } = $$props;
  let { alt = "" } = $$props;
  let { src = "" } = $$props;
  let { width = "25" } = $$props;
  let { height = "25" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `${id ? `<img${add_attribute("id", id, 0)}${add_attribute("class", className, 0)}${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} decoding="${"async"}" loading="${"lazy"}">` : `<img${add_attribute("class", className, 0)}${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} decoding="${"async"}" loading="${"lazy"}">`}`;
});
export {
  LazyImage as L
};
