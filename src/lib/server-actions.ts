"use server";

import { useSupabase } from "./initSupabase";

export async function getNextFormDataId() {
  "use server";
  const supabase = useSupabase();
  const data = await supabase.from("forms").insert({ title: "", questions: [] }).select('id').maybeSingle();
  return Number(data.data?.id);
}
