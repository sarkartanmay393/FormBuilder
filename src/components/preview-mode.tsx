'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionEditor } from "./question-editor";
import { useFormContext } from "@/app/context";

export function PreviewMode() {
  const [completeness, setCompleteness] = useState(0);
  const { form } = useFormContext();

  useEffect(() => {
    // Calculate form completeness
    // const requiredFields = form.questions.filter(q => q.required).length
    // if (requiredFields === 0) {
    //   setCompleteness(0)
    //   return
    // }
    // const percentage = (answeredRequired / requiredFields) * 100
    // setCompleteness(percentage)
  }, [form.questions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Form submitted:", answers);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{form.title}</h1>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Form completeness</span>
            <span className="text-sm text-gray-600">
              {Math.round(completeness)}%
            </span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {form.questions.map((question, index) => (
            <QuestionEditor question={question} onRemove={() => null} />
          ))}
          <Button
            type="submit"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
