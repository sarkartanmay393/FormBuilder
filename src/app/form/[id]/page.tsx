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
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from("forms")
            .select()
            .eq("id", Number(id))
            .maybeSingle();

          if (data) {
            const form = data as Form;
            if (form.published) {
              loadFormData(data);
            } else {
              router.replace(`/draft/${id}`);
            }
          } else {
            router.replace('/');
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };

      fetchData();
    }

    return () => {
      loadFormData(null);
    }
  }, [id]);

  return <FormPreview />;
};

export default Page;
