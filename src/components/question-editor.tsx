"use client"

import { GripVertical, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Question } from "@/types/form"

interface QuestionEditorProps {
  question: Question
  onUpdate: (question: Question) => void
  onRemove: () => void
}

export function QuestionEditor({ question, onUpdate, onRemove }: QuestionEditorProps) {
  const handleTypeChange = (type: Question["type"]) => {
    onUpdate({ ...question, type })
  }

  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, title })
  }

  const handleHelpTextChange = (helpText: string) => {
    onUpdate({ ...question, helpText })
  }

  const handleRequiredChange = (required: boolean) => {
    onUpdate({ ...question, required })
  }

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="mt-2 cursor-move">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Write a question"
                value={question.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <Select value={question.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short Answer</SelectItem>
                <SelectItem value="long">Long Answer</SelectItem>
                <SelectItem value="select">Single Select</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="url">URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="help-text">Help Text</Label>
            <Textarea
              id="help-text"
              placeholder="Write a help text or caption (leave empty if not needed)"
              value={question.helpText || ""}
              onChange={(e) => handleHelpTextChange(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={question.required}
              onCheckedChange={handleRequiredChange}
            />
            <Label htmlFor="required">Required</Label>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove} className="text-red-500">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

