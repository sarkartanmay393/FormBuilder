"use client";

import { useEffect } from "react";
import { useFormContext } from "@/app/context";
import { FormBuilder } from "@/components/form-builder";
import { useSupabase } from "@/lib/initSupabase";
import { FormPreview } from "@/components/form-preview";
import { Form } from "@/types/form";
import { useRouter } from "next/navigation";

export default function DraftPage({ params: { id } }: any) {
  const { loadFormData, isPreview } = useFormContext();
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from("forms")
            .select()
            .eq("id", Number(id))
            .maybeSingle();

          console.log("data", data);

          if (error) {
            console.log(error);
          } else if (data) {
            const draft = data as Form;
            if (draft.published) {
              router.replace(`/form/${id}`);
            } else {
              console.log("id", id);
              loadFormData(draft);
            }
          } else {
            const { data, error } = await supabase
              .from("forms")
              .insert({ id: id, title: "", questions: [] })
              .select()
              .maybeSingle();
            if (error) {
              console.error("Error inserting new form:", error);
            } else if (data) {
              const newDraft = data as Form;
              console.log("New draft created with id:", newDraft.id);
              loadFormData(newDraft);
              router.replace(`/draft/${newDraft.id}`);
            }
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };

      fetchData();
    }
  }, [id]);

  return isPreview ? <FormPreview /> : <FormBuilder />;
}
