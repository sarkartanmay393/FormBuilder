import { Question } from "@/types/form";
import { Link2, AlignLeft, Calendar, List, Type } from "lucide-react";

export const getQuestionIcon = (type: Question["type"]) => {
  switch (type) {
    case "short":
      return <Type className="w-4 h-4" />;
    case "long":
      return <AlignLeft className="w-4 h-4" />;
    case "select":
      return <List className="w-4 h-4" />;
    case "date":
      return <Calendar className="w-4 h-4" />;
    case "url":
      return <Link2 className="w-4 h-4" />;
    default:
      return null;
  }
};
