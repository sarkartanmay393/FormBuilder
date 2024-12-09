"use client";

import { useEffect } from "react";
import { useFormContext } from "@/app/context";
import { FormBuilder } from "@/components/form-builder";
import { useSupabase } from "@/lib/initSupabase";
import { FormPreview } from "@/components/form-preview";

export default function DraftPage({ params: { id } }: any) {
  const { loadFormData, isPreview } = useFormContext();
  const supabase = useSupabase();

  useEffect(() => {
    if (id) {
      supabase
        .from("forms")
        .select()
        .eq("id", Number(id))
        .maybeSingle()
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else if (data.data) {
            loadFormData(data.data);
          } else {
            supabase
              .from("forms")
              .insert({ id: Number(id), title: "", questions: [] })
              .then((insertData) => {
                if (insertData.error) {
                  console.log(insertData.error);
                } else {
                  console.log("New form inserted with id:", id);
                }
              });
          }
        });
    }
  }, [id]);

  return isPreview ? <FormPreview /> : <FormBuilder />;
}
