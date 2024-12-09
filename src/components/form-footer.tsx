"use client";

import { useFormContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/initSupabase";
import { Check, Loader2Icon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormFooter() {
  const { form } = useFormContext();
  const supabase = useSupabase();
  const router = useRouter();
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSaveDraft = async (publish: boolean) => {
    publish ? setIsLoading(true) : setIsDraftLoading(true);
    await supabase.from("forms").upsert(form);
    publish ? setIsLoading(false) : setIsDraftLoading(false);
    if (publish) {
      router.push("/form/" + form.id);
    }
  };

  return (
    <div className="h-[54px] fixed bottom-0 w-full border max-w-2xl mx-auto flex items-center justify-between p-4 border-gray-100 bg-gray-100">
      <>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-900 rounded-xl gap-1 font-semibold px-[14px] pr-[16px] py-[6px] h-[32px] border-gray-200"
          onClick={() => onSaveDraft(false)}
        >
          {isDraftLoading ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save as Draft
            </>
          )}
        </Button>
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 rounded-xl gap-1 font-semibold border-green-500 px-[14px] pr-[16px] py-[6px] h-[32px]"
          onClick={() => onSaveDraft(true)}
        >
          {isLoading ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Publish form
            </>
          )}
        </Button>
      </>
    </div>
  );
}
