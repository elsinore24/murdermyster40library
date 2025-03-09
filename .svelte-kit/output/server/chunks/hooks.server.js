import { P as PUBLIC_SUPABASE_ANON_KEY, a as PUBLIC_SUPABASE_URL } from "./public.js";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    }
  });
};
export {
  handle
};
//# sourceMappingURL=hooks.server.js.map
