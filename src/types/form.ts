export type QuestionType = 'short' | 'long' | 'select' | 'url' | 'date'

export interface Option {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  helpText?: string
  options?: Option[]
  required?: boolean
  answer?: string | number;
}

export interface Form {
  id: string
  title: string
  questions: Question[]
}

