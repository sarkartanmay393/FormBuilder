import React, { ReactNode, useContext, useState } from "react";
import { Form, Question } from "./types/form";

const FormContext = React.createContext<{
  form: Form;
  addQuestion: ({ newQuestion }: { newQuestion: Partial<Question> }) => void;
  changeTitle: ({ newTitle }: { newTitle: string }) => void;
  changeQsTitle: (params: { title: string; qsId: number }) => void;
  changeQsHelperText: (params: { helperText: string; qsId: number }) => void;
  changeQsAnswer: (params: { answer: string; qsId: number }) => void;
  changeQsType: ({
    qsId,
    type,
  }: {
    qsId: number;
    type: Question["type"];
  }) => void;
  changeQsOrder: ({
    qsId,
    newOrder,
  }: {
    qsId: number;
    newOrder: number;
  }) => void;
  addOptionToQs: (params: {
    optionText: string;
    qsId: number;
    optionId: number;
  }) => void;
  changeOptionToQs: (params: {
    updatedOptionText: string;
    qsId: number;
    optionId: number;
  }) => void;
}>({
  form: {
    id: 1,
    title: "",
    questions: [],
  },
  changeTitle: function (): void {
    throw new Error("Function not implemented.");
  },
  addQuestion: function (): void {
    throw new Error("Function not implemented.");
  },
  changeQsTitle: function (): void {
    throw new Error("Function not implemented.");
  },
  changeQsHelperText: function (): void {
    throw new Error("Function not implemented.");
  },
  changeQsAnswer: function (): void {
    throw new Error("Function not implemented.");
  },
  changeQsType: function (): void {
    throw new Error("Function not implemented.");
  },
  changeQsOrder: function (): void {
    throw new Error("Function not implemented.");
  },
  addOptionToQs: function (): void {
    throw new Error("Function not implemented.");
  },
  changeOptionToQs: function (): void {
    throw new Error("Function not implemented.");
  },
});

const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentForm, setCurrentForm] = useState<Form>({
    id: 1,
    title: "",
    questions: [],
  });

  const changeTitle = ({ newTitle }: { newTitle: string }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      title: newTitle,
    }));
  };

  const addQuestion = ({ type }: { type: Question["type"] }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: [
        ...prevForm.questions,
        {
          id: prevForm.questions.length,
          type,
          title: "",
          helpText: "",
          required: false,
          options: type === "select" ? [] : undefined,
        },
      ],
    }));
  };

  const changeQsTitle = ({ qsId, title }: { qsId: number; title: string }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId ? { ...q, title } : q
      ),
    }));
  };

  const changeQsHelperText = ({
    qsId,
    helperText,
  }: {
    qsId: number;
    helperText: string;
  }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId ? { ...q, helpText: helperText } : q
      ),
    }));
  };

  const changeQsAnswer = ({
    qsId,
    answer,
  }: {
    qsId: number;
    answer: string;
  }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId ? { ...q, answer } : q
      ),
    }));
  };

  const changeQsType = ({
    qsId,
    type,
  }: {
    qsId: number;
    type: Question["type"];
  }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId
          ? {
              ...q,
              type,
              options: type === "select" ? [] : undefined,
            }
          : q
      ),
    }));
  };

  const changeQsOrder = ({
    qsId,
    newOrder,
  }: {
    qsId: number;
    newOrder: number;
  }) => {
    setCurrentForm((prevForm) => {
      const questions = [...prevForm.questions];
      const index = questions.findIndex((q) => q.id === qsId);
      if (index !== -1) {
        const [movedQuestion] = questions.splice(index, 1);
        questions.splice(newOrder, 0, movedQuestion);
      }
      return {
        ...prevForm,
        questions,
      };
    });
  };

  const addOptionToQs = ({
    qsId,
    optionText,
    optionId,
  }: {
    qsId: number;
    optionText: string;
    optionId: number;
  }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId
          ? {
              ...q,
              options: [
                ...(q?.options || []),
                { id: optionId, text: optionText },
              ],
            }
          : q
      ),
    }));
  };

  const changeOptionToQs = ({
    qsId,
    updatedOptionText,
    optionId,
  }: {
    qsId: number;
    updatedOptionText: string;
    optionId: number;
  }) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
        q.id === qsId
          ? {
              ...q,
              options: q.options?.map((o) =>
                o.id === optionId ? { ...o, text: updatedOptionText } : o
              ),
            }
          : q
      ),
    }));
  };

  return (
    <FormContext.Provider
      value={{
        form: currentForm,
        changeOptionToQs,
        changeQsAnswer,
        changeQsOrder,
        changeQsType,
        changeTitle,
        addQuestion,
        changeQsHelperText,
        changeQsTitle,
        addOptionToQs,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const value = useContext(FormContext);
  return value;
};

export default FormContextProvider;
