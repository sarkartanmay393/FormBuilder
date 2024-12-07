import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import EditableLabel from "./editable-label";
import { useFormContext } from "@/context";

export function FormHeader() {
  const { form, changeTitle } = useFormContext();

  return (
    <div className="h-[54px] fixed top-0 w-full max-w-2xl mx-auto flex items-center justify-between p-4 border-b">
      <EditableLabel
        value={form.title}
        placeholder="Untitled form"
        onChange={(val: string) => changeTitle({ newTitle: val })}
      />
      <Button
        variant="outline"
        size="sm"
        className="text-gray-600 rounded-xl gap-1 font-semibold px-[14px] pl-[16px] py-[6px]"
        onClick={() => null}
      >
        Preview
        <ArrowUpRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
