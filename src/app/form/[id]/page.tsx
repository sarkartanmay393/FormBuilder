'use client'

import { useFormContext } from "@/app/context";
import { FormPreview } from "@/components/form-preview";
import { useSupabase } from "@/lib/initSupabase";
import { Form } from "@/types/form";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params: { id } }: any) => {
  const { loadFormData } = useFormContext();
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
            const form = data.data as Form;
            if (form.published) {
              loadFormData(data.data);
            } else {
              router.replace(`/draft/${id}`)
            }
          }
        });
    }
  }, [id]);

  return <FormPreview />;
};

export default Page;
