export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; lang: string; text: string }
  | { type: "callout"; tone: "tip" | "warn" | "info"; title: string; text: string }
  | { type: "er"; code: string; caption?: string }
  | { type: "h3"; text: string };

export type QType = "mc" | "fill" | "fix" | "long";

export interface Question {
  id: string;
  type: QType;
  title: string;
  prompt: string;
  points: number;
  hint?: string;
  options?: string[];
  correct?: number;
  accept?: string[];
  answer?: string;
  explanation?: string;
  model?: Block[];
}

export interface QuizVariant {
  label: string;
  intro?: Block[];
  questions: Question[];
}

export interface QuizSet {
  id: string;
  no: number;
  title: string;
  subtitle: string;
  total: number;
  pick?: number;
  variants: QuizVariant[];
}

export interface StudySection {
  id: string;
  title: string;
  icon: string;
  intro: string;
  blocks: Block[];
  /** id ของ QuizSet ที่เป็นแบบฝึกหัดท้ายบทของหัวข้อนี้ */
  practice?: string[];
}
