"use client";

import { Plus, Calendar, Link2, Type, AlignLeft, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Question } from "@/types/form";
import Image from "next/image";

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
          className="rounded-xl text-sm gap-1 font-semibold px-[14px] pr-4 py-[6px]"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-[16px]">
        <div className="p-0.5">
          <div className="bg-gray-50 h-[32px] px-4 py-2 rounded-[8px] w-full flex items-center">
            <h4 className="text-xs font-semibold text-gray-500">INPUT TYPES</h4>
          </div>
          <DropdownMenuItem onClick={() => handleAddQuestion("short")}>
            <Image
              src={"/short-icon.svg"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            Short answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("long")}>
            <Image
              src={"/long-icon.svg"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            Long answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("select")}>
            <Image
              src={"/single-select.svg"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            Single select
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("url")}>
            <Image
              src={"/url-icon.svg"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddQuestion("date")}>
            <Image
              src={"/calender-icon.svg"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            Date
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
