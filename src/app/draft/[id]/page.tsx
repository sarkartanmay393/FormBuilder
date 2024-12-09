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
      supabase
        .from("forms")
        .select()
        .eq("id", Number(id))
        .maybeSingle()
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else if (data.data) {
            const draft = data.data as Form;
            if (draft.published) {
              router.replace(`/form/${id}`);
            } else {
              loadFormData(draft);
            }
          }
        });
    }
  }, [id]);

  return isPreview ? <FormPreview /> : <FormBuilder />;
}
