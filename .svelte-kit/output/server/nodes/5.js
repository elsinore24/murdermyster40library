import * as universal from '../entries/pages/mansion/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mansion/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/mansion/+page.js";
export const imports = ["_app/immutable/nodes/5.DPcjhJ2u.js","_app/immutable/chunks/DptCN1eL.js","_app/immutable/chunks/92oxic9D.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/DdwJhmqI.js","_app/immutable/chunks/Cy3-0ISO.js","_app/immutable/chunks/GOTcNiBf.js","_app/immutable/chunks/C0sslGl3.js","_app/immutable/chunks/SLVMguDr.js","_app/immutable/chunks/Bj4WGR_5.js","_app/immutable/chunks/C1FmrZbK.js"];
export const stylesheets = ["_app/immutable/assets/5.BKoL4GOs.css","_app/immutable/assets/Environment.v7xTj5jM.css"];
export const fonts = [];
