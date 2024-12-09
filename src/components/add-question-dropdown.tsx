'use client'

import { Plus, Calendar, Link2, Type, AlignLeft, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Question } from "@/types/form";

interface AddQuestionDropdownProps {
  addQuestion: ({ type }: { type: Question["type"] }) => void;
}

export default function AddQuestionDropdown({
  addQuestion,
}: AddQuestionDropdownProps) {
  const handleAddQuestion = (type: Question["type"]) => {
    addQuestion({ type });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl gap-1 font-semibold px-[14px] pr-[16px] py-[6px]"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-[16px]">
        <div className="p-0.5">
          <div className="bg-gray-50 h-[32px] rounded-[8px] w-full flex items-center">
            <h4 className="text-sm font-medium text-gray-500 px-2">
              INPUT TYPES
            </h4>
          </div>
          <DropdownMenuItem onClick={() => handleAddQuestion("short")}>
            <Type className="w-4 h-4 mr-2" />
            Short answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("long")}>
            <AlignLeft className="w-4 h-4 mr-2" />
            Long answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("select")}>
            <Circle className="w-4 h-4 mr-2" />
            Single select
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("url")}>
            <Link2 className="w-4 h-4 mr-2" />
            URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("date")}>
            <Calendar className="w-4 h-4 mr-2" />
            Date
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
