"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, StepBack, X } from "lucide-react";
import EditableLabel from "./editable-label";
import { useFormContext } from "@/app/context";

export function FormHeader({ isPreview }: { isPreview?: boolean }) {
  const {
    form,
    changeTitle,
    isPreview: isLocalPreview,
    setIsPreview,
  } = useFormContext();

  const calculateProgress = () => {
    const totalQuestions = form.questions.length;
    if (totalQuestions === 0) return 0;

    const answeredQuestions = form.questions.filter(
      (q) => q.answer && q.answer.trim() !== ""
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="fixed top-0 w-full max-w-2xl mx-auto bg-white border px-[24px]">
      <div className="h-[54px] flex items-center justify-between py-4 gap-1">
        {isPreview || isLocalPreview ? (
          <div className="flex items-center gap-1 w-[50%] overflow-clip">
            {isLocalPreview && (
              <StepBack
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsPreview(false)}
              />
            )}
            <p className="font-medium text-[16px] text-ellipsis whitespace-nowrap">Submit form: <span className="font-normal text-sm">{form.title}</span></p>
          </div>
        ) : (
          <EditableLabel
            value={form.title}
            placeholder="Untitled form"
            onChange={(val: string) => changeTitle({ newTitle: val })}
          />
        )}
        <div className="w-1/2 flex flex-col items-end gap-2">
          {!(isPreview || isLocalPreview) ? (
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 rounded-xl gap-1 font-semibold px-[14px] pl-[16px] py-[6px]"
              onClick={() => setIsPreview(true)}
              disabled={form?.questions.length < 1}
            >
              Preview
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          ) : (
            <>
              <h1 className="text-sm text-gray-500 font-medium">
                Form completeness — {calculateProgress()}%{" "}
              </h1>
              {(isPreview || isLocalPreview) && form.questions.length > 0 && (
                <div className="h-1 bg-gray-100 w-full rounded-lg">
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
