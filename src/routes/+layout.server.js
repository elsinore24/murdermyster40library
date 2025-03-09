export const load = async ({ locals: { supabase } }) => {
  const { data: { session } } = await supabase.auth.getSession();
  return { session };
};
