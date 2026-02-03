export enum Category {
  Derivatives = 'DERIVATIVES',
  Antiderivatives = 'ANTIDERIVATIVES'
}

export enum Mode {
  Learning = 'LEARNING',
  Testing = 'TESTING'
}

export interface Formula {
  id: string;
  question: string;
  answer: string;
}

export type ViewState = 
  | { type: 'HOME' }
  | { type: 'MODE_SELECT', category: Category }
  | { type: 'QUIZ', category: Category, mode: Mode };
