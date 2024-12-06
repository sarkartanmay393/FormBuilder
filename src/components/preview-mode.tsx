"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { Form, Question } from "@/types/form"

interface PreviewModeProps {
  form: Form
  onClose: () => void
}

export function PreviewMode({ form, onClose }: PreviewModeProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [date, setDate] = useState<Date>()
  const [completeness, setCompleteness] = useState(0)

  useEffect(() => {
    // Calculate form completeness
    const requiredFields = form.questions.filter(q => q.required).length
    if (requiredFields === 0) {
      setCompleteness(0)
      return
    }

    const answeredRequired = form.questions.filter(q => {
      if (!q.required) return false
      const answer = answers[q.id]
      return answer && answer.trim() !== ""
    }).length

    const percentage = (answeredRequired / requiredFields) * 100
    setCompleteness(percentage)
  }, [answers, form.questions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Form submitted:', answers)
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'short':
        return (
          <Input
            placeholder="Type your answer here"
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            required={question.required}
          />
        )
      case 'long':
        return (
          <Textarea
            placeholder="Type your answer here"
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            required={question.required}
          />
        )
      case 'select':
        return (
          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
            required={question.required}
          >
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "MM-DD-YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date)
                  if (date) {
                    setAnswers({ 
                      ...answers, 
                      [question.id]: format(date, "yyyy-MM-dd") 
                    })
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )
      case 'url':
        return (
          <Input
            type="url"
            placeholder="https://example.com"
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            required={question.required}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{form.title}</h1>
          <Button onClick={onClose} variant="outline">Close Preview</Button>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Form completeness
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(completeness)}%
            </span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {form.questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <Label className="text-base font-medium">
                {question.title}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {question.helpText && (
                <p className="text-sm text-gray-500">{question.helpText}</p>
              )}
              {renderQuestion(question)}
            </div>
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
  )
}

