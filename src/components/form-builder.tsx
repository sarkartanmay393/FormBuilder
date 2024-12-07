/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { PreviewMode } from "./preview-mode"
import type { Form, Question } from "@/types/form";
import { FormHeader } from "./form-header";
import { FormFooter } from "./form-footer";
import AddQuestionDropdown from "./add-question-dropdown";
import { QuestionEditor } from "./question-editor";

export function FormBuilder() {
  // States
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState<Form>({
    id: "1",
    title: "Frontend Developer Application Form",
    questions: [],
  });

  // dnd
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const questions = Array.from(form.questions);
    const [reorderedQuestion] = questions.splice(result.source.index, 1);
    questions.splice(result.destination.index, 0, reorderedQuestion);

    setForm({
      ...form,
      questions,
    });
  };
 

  // Methods
  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: `q${form.questions.length + 1}`,
      type,
      title: "",
      helpText: "",
      options:
        type === "select"
          ? [
              { id: "opt1", text: "Option 1" },
              { id: "opt2", text: "Option 2" },
            ]
          : undefined,
    };
    setForm({
      ...form,
      questions: [...form.questions, newQuestion],
    });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    });
  };

  return (
    <>
      <div className="relative mx-auto max-w-2xl rounded-lg shadow-sm border overflow-hidden">
        <FormHeader
          onPreview={() => setShowPreview(true)}
          form={form}
          setForm={setForm}
        />
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
                    <Draggable
                      key={question.id}
                      draggableId={question.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <QuestionEditor question={question} onRemove={() => null} onUpdate={(q) => updateQuestion(q.id, q)} />
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
            <AddQuestionDropdown addQuestion={addQuestion} />
          </div>
        </div>
        <FormFooter onPublish={() => null} onSaveDraft={() => null} />
      </div>
      {showPreview && (
        <PreviewMode
          form={form}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
