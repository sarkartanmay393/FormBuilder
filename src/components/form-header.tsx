"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, ExternalLink, MoveUpRight } from 'lucide-react'
import { Form } from "@/types/form"

interface FormHeaderProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  onPreview: () => void
}

export function FormHeader({ form, setForm,  onPreview }: FormHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="h-[54px] fixed top-0 w-full max-w-2xl mx-auto flex items-center justify-between p-4 border-b">
      {isEditing ? (
        <Input
          value={form.title}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              title: e.target.value,
            }))
          }
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
          className="max-w-[200px]"
          autoFocus
        />
      ) : (
        <h1
          className="text-sm font-medium text-gray-800 cursor-pointer hover:text-gray-600"
          onClick={() => setIsEditing(true)}
        >
          {form.title || "Untitled form"}
        </h1>
      )}
      <Button
        variant="outline"
        size="sm"
        className="text-gray-600 rounded-xl gap-1 font-semibold px-[14px] pl-[16px] py-[6px]"
        onClick={onPreview}
      >
        Preview
        <ArrowUpRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

