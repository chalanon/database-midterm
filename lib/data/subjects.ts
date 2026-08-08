import type { QuizSet, StudySection } from "../types";
import { quizSets } from "./sets";
import { studySections } from "./study";

export interface Subject {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  sections: StudySection[];
  sets: QuizSet[];
}

export const subjects: Subject[] = [
  {
    id: "db",
    name: "Database",
    icon: "🗄️",
    tagline: "ฐานข้อมูล",
    description:
      "สรุปคีย์แนวคิด, ER Diagram / Crow's Foot, Normalization 1NF–4NF, Data Dictionary และ SQL พร้อมแบบฝึกหัดสุ่มข้อ 6 ชุด ตรวจเฉลยได้",
    sections: studySections,
    sets: quizSets,
  },
];
