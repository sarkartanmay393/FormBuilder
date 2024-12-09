"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import AddQuestionDropdown from "./add-question-dropdown";
import { QuestionEditor } from "./question-editor";
import { useFormContext } from "@/app/context";
import type { Question } from "@/types/form";

export function FormBuilder() {
  const { form, addQuestion, changeQsOrder } = useFormContext();

  const handleAddQuestion = ({ type }: { type: Question["type"] }) => {
    addQuestion({ type });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    changeQsOrder({
      qsId: form.questions[result.source.index].id,
      newOrder: result.destination.index,
    });
  };

  return (
    <div className="h-[calc(100vh-108px)] overflow-y-auto my-[54px] py-[4px] border">
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
                  draggableId={question.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <QuestionEditor
                        question={question}
                        onRemove={() => null}
                      />
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
        <AddQuestionDropdown addQuestion={handleAddQuestion} />
      </div>
    </div>
  );
}
