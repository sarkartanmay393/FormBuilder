import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Form } from "@/types/form";
import EditableLabel from "./editable-label";

interface FormHeaderProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  onPreview: () => void;
}

export function FormHeader({ form, setForm, onPreview }: FormHeaderProps) {
  return (
    <div className="h-[54px] fixed top-0 w-full max-w-2xl mx-auto flex items-center justify-between p-4 border-b">
      <EditableLabel
        value={form.title}
        defaultValue="Untitled form"
        onChange={(val: string) =>
          setForm((p) => ({
            ...p,
            title: val,
          }))
        }
      />
      <Button
        variant="outline"
        size="sm"
        className="text-gray-600 rounded-xl gap-1 font-semibold px-[14px] pl-[16px] py-[6px]"
        onClick={onPreview}
      >
        Preview
        <ArrowUpRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
