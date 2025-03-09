import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.CuRZwUm0.js","_app/immutable/chunks/Bj4WGR_5.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DptCN1eL.js","_app/immutable/chunks/92oxic9D.js"];
export const stylesheets = ["_app/immutable/assets/0.z0PpVeQe.css"];
export const fonts = [];
