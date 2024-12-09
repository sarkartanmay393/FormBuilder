"use server";

import { useSupabase } from "./initSupabase";

export async function getNextFormDataId() {
  "use server";
  const supabase = useSupabase();
  const data = await supabase.from("forms").insert({ title: "", questions: [] }).select('id').maybeSingle();
  return Number(data.data?.id);
}

export const fetchSubmissionRecord = async () => {
  'use server';
  const supabase = useSupabase();
  try {
    const { data } = await supabase.from("submission_record").select();
    if (data) {
      return data
    }
  } catch (error) {
    console.error("Error fetching submission record:", error);
  }

  return [];
};