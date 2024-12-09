export type QuestionType = 'short' | 'long' | 'select' | 'url' | 'date'

export interface Option {
  id: number
  text: string
}

export interface Question {
  id: number
  type: QuestionType
  title: string
  helpText?: string
  options?: Option[]
  answer?: any;
}

export interface Form {
  id: number
  title: string
  questions: Question[]
  published: boolean
}

