import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useFormContext } from "@/context";
import type { Question } from "@/types/form";

export function FormPreview() {
  const { form, changeQsAnswer } = useFormContext();

  const handleAnswerChange = (qsId: number, answer: string) => {
    changeQsAnswer({ qsId, answer });
  };

  const calculateProgress = () => {
    const totalQuestions = form.questions.length;
    if (totalQuestions === 0) return 0;

    const answeredQuestions = form.questions.filter(
      (q) => q.answer && q.answer.trim() !== ""
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            placeholder="Type your answer here"
            value={question.answer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="border border-gray-300 rounded-md"
          />
        );

      case "long":
        return (
          <Textarea
            placeholder="Type your answer here"
            value={question.answer || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="border border-gray-300 rounded-md min-h-[100px]"
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
                <label htmlFor={`option-${option.id}`} className="text-sm">
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
            className="border border-gray-300 rounded-md"
          />
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !question.answer && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {question.answer
                  ? format(new Date(question.answer), "PPP")
                  : "Pick a date"}
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

  return (
    <div className="h-[calc(100vh-108px)] overflow-y-auto my-[54px] py-[8px]">
      <div className="p-4">
        <div className="space-y-6">
          {form.questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <label className="block font-medium">
                {question.title || "Untitled question"}
              </label>
              {question.helpText && (
                <p className="text-sm text-gray-500 mb-2">
                  {question.helpText}
                </p>
              )}
              {renderQuestion(question)}
            </div>
          ))}
        </div>

        {form.questions.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
