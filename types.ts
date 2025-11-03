export interface Style {
  id: string;
  name: string;
  description: string;
  prompt: string;
  image: string;
}

export type AppPhase =
  | 'upload'
  | 'select-style'
  | 'generating-image'
  | 'result';

// FIX: Add and export the UserInput interface to resolve the import error in EditBackForm.tsx.
export interface UserInput {
  name: string;
  birthdate: string;
  mbti: string;
}
