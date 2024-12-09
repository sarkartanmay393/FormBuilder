"use client";

import { useEffect } from "react";
import { useFormContext } from "@/app/context";
import { FormBuilder } from "@/components/form-builder";
import { useSupabase } from "@/lib/initSupabase";

export default function DraftPage({ params: { id } }: any) {
  const { loadFormData } = useFormContext();
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
          }
        });
    }
  }, [id]);

  return (
    <div className="p-8">
      <FormBuilder />
    </div>
  );
}
