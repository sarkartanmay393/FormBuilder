"use client";

import { GripVertical, Plus } from "lucide-react";
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
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/app/context";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface QuestionEditorProps {
  question: Question;
  onRemove?: () => void;
  mode?: "admin" | "preview";
}

export function QuestionEditor({
  question,
  mode = "admin",
}: QuestionEditorProps) {
  const {
    changeQsTitle,
    changeQsHelperText,
    changeQsType,
    addOptionToQs,
    changeOptionToQs,
  } = useFormContext();

  // Use a ref to track initialization
  const optionsInitialized = useRef(false);

  useEffect(() => {
    // Only run if this is a select question and options haven't been initialized
    if (
      question.type === "select" &&
      !optionsInitialized.current &&
      (!question.options || question.options.length === 0)
    ) {
      const timestamp = Date.now();
      const defaultOptions = [
        { id: timestamp, text: "Option 1" },
        { id: timestamp + 1, text: "Option 2" },
      ];

      // Add default options
      defaultOptions.forEach((option) => {
        addOptionToQs({
          qsId: question.id,
          optionText: option.text,
          optionId: option.id,
        });
      });

      optionsInitialized.current = true;
    }
  }, [question.type, question.id, addOptionToQs]);

  // Reset initialization when type changes
  useEffect(() => {
    if (question.type !== "select") {
      optionsInitialized.current = false;
    }
  }, [question.type]);

  const handleTitleChange = (title: string) => {
    changeQsTitle({ qsId: question.id, title });
  };

  const handleHelpTextChange = (helperText: string) => {
    changeQsHelperText({ qsId: question.id, helperText });
  };

  const handleTypeChange = (type: Question["type"]) => {
    changeQsType({ qsId: question.id, type });
    // Reset initialization when type changes
    optionsInitialized.current = false;
  };

  const handleAddOption = () => {
    const timestamp = Date.now();
    const newOptionNumber = (question.options?.length || 0) + 1;
    addOptionToQs({
      qsId: question.id,
      optionText: `Option ${newOptionNumber}`,
      optionId: timestamp,
    });
  };

  const handleOptionChange = (updatedOptionText: string, optionId: number) => {
    changeOptionToQs({
      qsId: question.id,
      updatedOptionText,
      optionId,
    });
  };

  const renderAnswerInput = (question: Question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            placeholder="Type your answer here"
            value=""
            disabled
            className="border border-gray-300 rounded-md bg-gray-100"
          />
        );
      case "long":
        return (
          <Textarea
            placeholder="Type your answer here"
            value=""
            disabled
            className="border border-gray-300 rounded-md bg-gray-100"
          />
        );
      case "select":
        return (
          <RadioGroup
            value={question?.answer || ""}
            className="flex flex-col gap-2 items-start w-full"
          >
            {question.options?.map((op, i) => (
              <div key={op.id} className="flex items-center w-full gap-2">
                <RadioGroupItem
                  value={op.text}
                  id={`option-${op.id}`}
                  className="cursor-not-allowed"
                  disabled
                />
                <Input
                  className="flex-1 border border-gray-300 rounded-md bg-white"
                  value={op.text}
                  onChange={(e) => handleOptionChange(e.target.value, op.id)}
                />
                {i === (question?.options?.length ?? 0) - 1 && (
                  <Button
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={handleAddOption}
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
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal border border-gray-300 rounded-md cursor-not-allowed bg-gray-100 text-sm px-2",
                  !question?.answer && "text-muted-foreground"
                )}
                disabled
              >
                <p>
                  {question?.answer
                    ? new Date(question?.answer)
                        .toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, "-")
                    : "MM-DD-YYYY"}
                </p>
                <Image
                  src={"/calender-icon.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </Button>
            </PopoverTrigger>
          </Popover>
        );
      case "url":
        return (
          <Input
            type="url"
            placeholder="https://example.com"
            value=""
            disabled
            className="border border-gray-300 rounded-md bg-gray-100"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 my-2 shadow-none rounded-[16px] flex flex-col gap-2 border border-gray-200 transition-all duration-300 group hover:bg-gray-50">
      <div className="flex w-full gap-2">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-0.5 flex-col">
            <EditableLabel
              placeholder="Write a question"
              value={question.title}
              onChange={(val: string) => handleTitleChange(val)}
              mode={mode}
              classNameLabel="w-full font-semibold group-hover:text-gray-400"
              classNameInput=" font-semibold"
            />
            <EditableLabel
              className="text-xs bg-gray-100 w-full"
              classNameLabel="text-xs font-normal text-gray-500 group-hover:text-gray-400"
              inputClassName="bg-gray-100"
              placeholder="Helper Text"
              value={question.helpText}
              onChange={(val: string) => handleHelpTextChange(val)}
              mode={mode}
            />
          </div>
        </div>
        <Select value={question.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-fit border-none shadow-none ">
            <SelectValue className="w-5 h-5" />
          </SelectTrigger>
          <SelectContent className="min-w-16 max-w-16">
            <SelectItem value="short">
              <Image
                src={"/short-icon.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </SelectItem>
            <SelectItem value="long">
              <Image
                src={"/long-icon.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </SelectItem>
            <SelectItem value="select">
              <Image
                src={"/single-select.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </SelectItem>
            <SelectItem value="url">
              <Image
                src={"/url-icon.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </SelectItem>
            <SelectItem value="date">
              <Image
                src={"/calender-icon.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-2 cursor-move">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className={`space-y-2 ${mode === "preview" ? "mt-0" : "mt-2"}`}>
        {renderAnswerInput(question)}
      </div>
    </Card>
  );
}
