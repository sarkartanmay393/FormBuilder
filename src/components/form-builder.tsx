"use client"

import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { Plus, Save, MoreVertical, Calendar, Link2, Type, AlignLeft, List, Circle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
// import { PreviewMode } from "./preview-mode"
import { saveDraft, publishForm } from "@/lib/actions"
import type { Form, Question } from "@/types/form"
import { FormHeader } from "./form-header"
import { FormFooter } from "./form-footer"

export function FormBuilder() {
  const [form, setForm] = useState<Form>({
    id: "1",
    title: "Frontend Developer Application Form",
    questions: []
  })
  const [showPreview, setShowPreview] = useState(false)

  const getQuestionIcon = (type: Question["type"]) => {
    switch (type) {
      case "short":
        return <Type className="w-4 h-4" />
      case "long":
        return <AlignLeft className="w-4 h-4" />
      case "select":
        return <List className="w-4 h-4" />
      case "date":
        return <Calendar className="w-4 h-4" />
      case "url":
        return <Link2 className="w-4 h-4" />
      default:
        return null
    }
  }

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: `q${form.questions.length + 1}`,
      type,
      title: "",
      helpText: "",
      required: false,
      options: type === "select" ? [
        { id: "opt1", text: "Option 1" },
        { id: "opt2", text: "Option 2" }
      ] : undefined
    }
    setForm({
      ...form,
      questions: [...form.questions, newQuestion]
    })
  }

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q
      )
    })
  }

  const removeQuestion = (questionId: string) => {
    setForm({
      ...form,
      questions: form.questions.filter((q) => q.id !== questionId)
    })
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const questions = Array.from(form.questions)
    const [reorderedQuestion] = questions.splice(result.source.index, 1)
    questions.splice(result.destination.index, 0, reorderedQuestion)

    setForm({
      ...form,
      questions
    })
  }

  const renderQuestionEditor = (question: Question) => {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Input
              value={question.title}
              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
              placeholder="Write a question"
              className="font-medium"
            />
            {question.type !== "select" && (
              <Input
                value={question.helpText}
                onChange={(e) => updateQuestion(question.id, { helpText: e.target.value })}
                placeholder="Write a help text or caption (leave empty if not needed)"
                className="mt-2 text-sm text-gray-500"
              />
            )}
            {question.type === "select" && question.options && (
              <div className="mt-2 space-y-2">
                {question.options.map((option) => (
                  <Input
                    key={option.id}
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = question.options?.map((opt) =>
                        opt.id === option.id ? { ...opt, text: e.target.value } : opt
                      )
                      updateQuestion(question.id, { options: newOptions })
                    }}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    const newOptions = [
                      ...(question.options || []),
                      { id: `opt${question.options?.length + 1}`, text: `Option ${question.options?.length + 1}` }
                    ]
                    updateQuestion(question.id, { options: newOptions })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => removeQuestion(question.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative mx-auto max-w-2xl rounded-lg shadow-sm border overflow-hidden">
       <FormHeader onPreview={() => setShowPreview(true)} form={form} setForm={setForm} />
        <div className="h-[calc(100vh-108px)] overflow-y-auto my-[54px] py-[8px]">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {form.questions.map((question, index) => (
                    <Draggable key={question.id} draggableId={question.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {renderQuestionEditor(question)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex justify-center mt-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="p-2">
                  <h4 className="mb-2 text-sm font-medium text-gray-500 px-2">INPUT TYPES</h4>
                  <DropdownMenuItem onClick={() => addQuestion("short")}>
                    <Type className="w-4 h-4 mr-2" />
                    Short answer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addQuestion("long")}>
                    <AlignLeft className="w-4 h-4 mr-2" />
                    Long answer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addQuestion("select")}>
                    <Circle className="w-4 h-4 mr-2" />
                    Single select
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addQuestion("url")}>
                    <Link2 className="w-4 h-4 mr-2" />
                    URL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addQuestion("date")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
       <FormFooter onPublish={() => null} onSaveDraft={() => null} />
      </div>
    </>
  )
}

// {showPreview && (
//   <PreviewMode
//     form={form}
//     onClose={() => setShowPreview(false)}
//   />
// )}