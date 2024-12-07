import {
  AlignLeft,
  Calendar,
  Circle,
  GripVertical,
  Link2,
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

interface QuestionEditorProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onRemove?: () => void;
}

export function QuestionEditor({
  question,
  onUpdate,
}: QuestionEditorProps) {
  const handleTypeChange = (type: Question["type"]) => {
    onUpdate({ ...question, type });
  };

  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, title });
  };

  const handleHelpTextChange = (helpText: string) => {
    onUpdate({ ...question, helpText });
  };

  const handleAnswerChange = (answer: string) => {
    onUpdate({ ...question, answer });
  };

  return (
    <Card className="p-4 m-2 shadow-none rounded-[16px] flex gap-1">
      <div className="flex-1 space-y-4">
        <div className="flex items-start gap-2 flex-col">
          <EditableLabel
            defaultValue="Write a question"
            value={question.title}
            onChange={(val: string) => handleTitleChange(val)}
          />
          <EditableLabel
            className="text-xs"
            classNameLabel="text-xs font-normal text-gray-300"
            defaultValue="Helper Text"
            value={question.helpText}
            onChange={(val: string) => handleHelpTextChange(val)}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            id="help-text"
            placeholder=""
            value={question.answer || ""}
            disabled
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>
      </div>
      <Select value={question.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-fit border-none shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">
            <Type className="w-4 h-4" />
          </SelectItem>
          <SelectItem value="long">
            <AlignLeft className="w-4 h-4" />
          </SelectItem>
          <SelectItem value="select">
            <Circle className="w-4 h-4" />
          </SelectItem>
          <SelectItem value="url">
            <Link2 className="w-4 h-4" />
          </SelectItem>
          <SelectItem value="date">
            <Calendar className="w-4 h-4" />
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-2 cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
    </Card>
  );
}
