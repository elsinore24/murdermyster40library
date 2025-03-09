import * as universal from '../entries/pages/admin/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/admin/+page.js";
export const imports = ["_app/immutable/nodes/3.DT7EyDwg.js","_app/immutable/chunks/DptCN1eL.js","_app/immutable/chunks/92oxic9D.js","_app/immutable/chunks/C2qgC4ZJ.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/Cy3-0ISO.js","_app/immutable/chunks/SLVMguDr.js","_app/immutable/chunks/Bj4WGR_5.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/C0sslGl3.js"];
export const stylesheets = ["_app/immutable/assets/EvidenceBoard.DZLghJKq.css"];
export const fonts = [];
