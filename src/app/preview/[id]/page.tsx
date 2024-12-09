'use client'

import { useFormContext } from "@/app/context";
import { FormBuilder } from "@/components/form-builder";
import { useSupabase } from "@/lib/initSupabase";
import React, { useEffect } from "react";

const Page = ({ params: { id } }: any) => {
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
          } else {
            loadFormData(data.data);
          }
        });
    }
  }, [id]);

  return <FormBuilder />;
};

export default Page;
