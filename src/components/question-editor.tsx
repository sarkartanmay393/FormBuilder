import {
  AlignLeft,
  CalendarIcon,
  Circle,
  GripVertical,
  Link2,
  Plus,
  Type,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Question } from "@/types/form";
import EditableLabel from "./editable-label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/context";

interface QuestionEditorProps {
  question: Question;
  onRemove?: () => void;
  mode?: 'admin' | 'preview';
}

export function QuestionEditor({ question, mode = 'admin' }: QuestionEditorProps) {
  const {
    changeQsAnswer,
    changeQsTitle,
    changeQsHelperText,
    changeQsType,
    addOptionToQs,
    changeOptionToQs,
  } = useFormContext();

  const handleAnswerChange = (answer: string) => {
    changeQsAnswer({ qsId: question.id, answer });
  };

  const handleTitleChange = (title: string) => {
    changeQsTitle({ qsId: question.id, title });
  };

  const handleHelpTextChange = (helperText: string) => {
    changeQsHelperText({ qsId: question.id, helperText });
  };

  const handleTypeChange = (type: Question["type"]) => {
    changeQsType({ qsId: question.id, type });
  };

  const handleAddOption = (optionText: string) => {
    addOptionToQs({ qsId: question.id, optionText });
  };

  const handleOptionChange = (updatedOptionText: string, optionId: number) => {
    changeOptionToQs({ qsId: question.id, updatedOptionText, optionId });
  };

  const renderAnswerInput = (question: Question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            placeholder="Type your answer here"
            value={question?.answer || ""}
            disabled
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        );
      case "long":
        return (
          <Textarea
            placeholder="Type your answer here"
            value={question?.answer || ""}
            disabled
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        );
      case "select":
        return (
          <RadioGroup
            defaultValue={question?.answer}
            className="flex flex-col gap-1 items-start w-full"
            onValueChange={(v) => handleAnswerChange(v)}
          >
            {question?.options?.map((op: any, i: any) => (
              <div key={op.id} className="flex items-center justify-start w-full gap-2">
                <RadioGroupItem value={op.text} id={op.id} />
                <Input
                  className="w-full"
                  key={op.id}
                  value={op.text}
                  onChange={(e) => {
                    handleOptionChange(e.target.value, op.id);
                  }}
                />
                {(question?.options?.length ?? 0) - 1 === i && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className=""
                    onClick={() => {
                      handleAddOption(
                        `Option ${question.options?.length ?? 2 + 1}`,
                      );
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </RadioGroup>
        );
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !question?.answer && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {question?.answer || "MM-DD-YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border rounded-lg shadow-md z-[1000] ">
              <Calendar
                mode="single"
                disabled
                selected={question?.answer}
                onSelect={(date) => {
                  // setDate(date)
                  // if (date) {
                  //   setAnswers({
                  //     ...answers,
                  //     [question.id]: format(date, "yyyy-MM-dd")
                  //   })
                  // }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case "url":
        return (
          <Input
            type="url"
            placeholder="https://example.com"
            value={question?.answer || ""}
            disabled
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 m-2 shadow-none rounded-[16px] flex flex-col gap-1">
      <div className="flex w-full gap-1">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-2 flex-col">
            <EditableLabel
              placeholder="Write a question"
              value={question.title}
              onChange={(val: string) => handleTitleChange(val)}
              mode={mode}
            />
            <EditableLabel
              className="text-xs"
              classNameLabel="text-xs font-normal text-gray-300"
              placeholder="Helper Text"
              value={question.helpText}
              onChange={(val: string) => handleHelpTextChange(val)}
              mode={mode}
            />
          </div>
        </div>
        <Select value={question.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-fit border-none shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-w-4">
            <SelectItem value="short" className="">
              <Type className="w-4 h-4" />
            </SelectItem>
            <SelectItem value="long" className="">
              <AlignLeft className="w-4 h-4" />
            </SelectItem>
            <SelectItem value="select" className="">
              <Circle className="w-4 h-4" />
            </SelectItem>
            <SelectItem value="url" className="">
              <Link2 className="w-4 h-4" />
            </SelectItem>
            <SelectItem value="date" className="">
              <CalendarIcon className="w-4 h-4" />
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-2 cursor-move">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className={`space-y-2 ${mode === 'preview' ? "mt-0" : 'mt-2'}`}>{renderAnswerInput(question)}</div>
    </Card>
  );
}
