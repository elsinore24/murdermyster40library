import { a as PUBLIC_SUPABASE_URL, P as PUBLIC_SUPABASE_ANON_KEY } from "./public.js";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
export {
  supabase as s
};
//# sourceMappingURL=supabase.js.map
