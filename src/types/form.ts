export type QuestionType = 'short' | 'long' | 'select' | 'number' | 'url' | 'date'

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
}

export interface Form {
  id: string
  title: string
  questions: Question[]
}

