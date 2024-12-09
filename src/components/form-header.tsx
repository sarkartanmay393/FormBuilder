// FormHeader.tsx
import { Button } from "@/components/ui/button";
import { ArrowUpRight, X } from "lucide-react";
import EditableLabel from "./editable-label";
import { useFormContext } from "@/context";

export function FormHeader() {
  const { form, changeTitle, isPreview, setIsPreview } = useFormContext();

  const calculateProgress = () => {
    const totalQuestions = form.questions.length;
    if (totalQuestions === 0) return 0;

    const answeredQuestions = form.questions.filter(
      (q) => q.answer && q.answer.trim() !== ""
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="fixed top-0 w-full max-w-2xl mx-auto">
      <div className="h-[54px] flex items-center justify-between p-4 border-b bg-white">
        {isPreview ? (
          <div className="font-medium">Submit form</div>
        ) : (
          <EditableLabel
            value={form.title}
            placeholder="Untitled form"
            onChange={(val: string) => changeTitle({ newTitle: val })}
          />
        )}
        <div className="w-1/2 flex flex-col items-end gap-2">
          {!isPreview ? (
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 rounded-xl gap-1 font-semibold px-[14px] pl-[16px] py-[6px]"
              onClick={() => setIsPreview(!isPreview)}
            >
              {/* {isPreview ? (
              <>
                Edit
                <X className="w-4 h-4" />
              </>
            ) : ( */}

              <>
                Preview
                <ArrowUpRight className="w-4 h-4" />
              </>
            </Button>
          ) : (
            <>
              <h1 className="text-sm text-gray-500 font-medium">
                Form completeness — {calculateProgress()}%{" "}
              </h1>
              {isPreview && form.questions.length > 0 && (
                <div className="h-1 bg-gray-100 w-full">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
