"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, fetchUserIp } from "@/lib/utils";
import { format } from "date-fns";
import { useFormContext } from "@/app/context";
import type { Question } from "@/types/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNextFormDataId } from "@/lib/server-actions";
import { useSupabase } from "@/lib/initSupabase";
import Image from "next/image";

export function FormPreview() {
  const { form, changeQsAnswer, isPreview, loadFormData } = useFormContext();
  const [isSubmited, setSubmitted] = useState(false);

  const handleAnswerChange = (qsId: number, answer: string) => {
    changeQsAnswer({ qsId, answer });
  };

  const calculateProgress = () => {
    const totalQuestions = form?.questions.length;
    if (totalQuestions === 0) return 0;

    const answeredQuestions = form?.questions.filter(
      (q) => q.answer && q.answer.trim() !== ""
    ).length;
    return Math.round(((answeredQuestions ?? 0) / (totalQuestions ?? 0)) * 100);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            placeholder="Type your answer here"
            value={question.answer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="border border-gray-300 rounded-md "
          />
        );

      case "long":
        return (
          <Textarea
            placeholder="Type your answer here"
            value={question.answer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="border border-gray-300 rounded-md min-h-[100px] "
          />
        );

      case "select":
        return (
          <RadioGroup
            value={question.answer || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="flex flex-col gap-2"
          >
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.text}
                  id={`option-${option.id}`}
                />
                <label htmlFor={`option-${option.id}`} className="text-xs">
                  {option.text}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case "url":
        return (
          <Input
            type="url"
            placeholder="https://example.com"
            value={question.answer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="border border-gray-300 rounded-md text-xs"
          />
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal text-xs",
                  !question.answer && "text-muted-foreground"
                )}
              >
                <p>{question?.answer || "MM-DD-YYYY"}</p>
                <Image
                  src={"/calender-icon.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  question.answer ? new Date(question.answer) : undefined
                }
                onSelect={(date) =>
                  handleAnswerChange(
                    question.id,
                    date ? date.toISOString() : ""
                  )
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return null;
    }
  };

  const supabase = useSupabase();

  const handleSubmit = async () => {
    const userIp = (await fetchUserIp()) as string;
    const { data, error } = await supabase
      .from("submission_record")
      .select()
      .eq("userIp", userIp)
      .single();

    if (data) {
      let updatedFormIds = data?.formId || [];
      if (!updatedFormIds.includes(form?.id)) {
        updatedFormIds.push(form?.id);
      }

      const { error: udpateE } = await supabase
        .from("submission_record")
        .update({ formId: updatedFormIds })
        .eq("userIp", userIp);
      if (udpateE) {
        console.error("Error updating submission record:", udpateE.message);
      }
    } else {
      const { error: upsertError } = await supabase
        .from("submission_record")
        .upsert({ userIp, formId: [form?.id] });

      if (upsertError) {
        console.error(
          "Error upserting submission record:",
          upsertError.message
        );
      }
    }

    setSubmitted(true);
  };

  const router = useRouter();
  const allDone = calculateProgress();

  return (
    <div className="h-[calc(100vh-54px)] overflow-y-auto mt-[54px] mb-[4px] py-[4px] px-[24px] border">
      {isSubmited ? (
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <h1 className="text-green-600 text-2xl font-bold">Success! 🥳</h1>
            {!isPreview && (
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const nextId = await getNextFormDataId();
                  router.push("/draft/" + nextId);
                }}
              >
                Create another form
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-6 py-4">
            {form?.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <div className="flex flex-col">
                  <label className="block font-medium text-sm">
                    {question.title || "Untitled question"}
                  </label>
                  {question.helpText && (
                    <p className="text-xs text-gray-500">{question.helpText}</p>
                  )}
                </div>
                {renderQuestion(question)}
              </div>
            ))}
          </div>
          {(form?.questions?.length ?? 0) > 0 && (
            <div className="mt-6 mr-4 flex justify-end mb-14">
              <Button
                disabled={allDone < 100}
                onClick={handleSubmit}
                size="sm"
                className=" bg-green-600 hover:bg-green-700 text-white rounded-xl border-green-500 h-[32px] px-[14px]"
              >
                Submit
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
