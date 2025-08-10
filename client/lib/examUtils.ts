import { CBAPQuestion, ExamState } from "@shared/types";

export const EXAM_CONFIG = {
  TOTAL_QUESTIONS: 120,
  DURATION_MINUTES: 300,
  PASSING_SCORE: 80,
  STORAGE_KEY: "cbap_exam_state",
};

export async function loadAllQuestions(): Promise<CBAPQuestion[]> {
  const allQuestions: CBAPQuestion[] = [];

  // Load from multiple chunk files
  const chunkFiles = [
    "mock_exam_1.json",
    "mock_exam_2.json",
    "mock_exam_3.json",
    "questions_chunk_01.json",
    "questions_chunk_02.json",
    "questions_chunk_03.json",
    "questions_chunk_04.json",
  ];

  for (const file of chunkFiles) {
    try {
      const response = await fetch(`/data/${file}`);
      if (response.ok) {
        const questions = await response.json();
        allQuestions.push(...questions);
      }
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  }

  return allQuestions;
}

export function getRandomQuestions(
  allQuestions: CBAPQuestion[],
  count: number,
): CBAPQuestion[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  const selectedCount = Math.min(count, allQuestions.length);
  return shuffled.slice(0, selectedCount);
}

export function createNewExam(questions: CBAPQuestion[]): ExamState {
  return {
    questions,
    currentQuestionIndex: 0,
    answers: {},
    markedForReview: {},
    startTime: Date.now(),
    duration: EXAM_CONFIG.DURATION_MINUTES,
    isCompleted: false,
  };
}

export function saveExamState(examState: ExamState): void {
  localStorage.setItem(EXAM_CONFIG.STORAGE_KEY, JSON.stringify(examState));
}

export function loadExamState(): ExamState | null {
  const saved = localStorage.getItem(EXAM_CONFIG.STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearExamState(): void {
  localStorage.removeItem(EXAM_CONFIG.STORAGE_KEY);
}

export function calculateScore(examState: ExamState): number {
  const { questions, answers } = examState;
  const correct = questions.reduce((count, question) => {
    return answers[question.id] === question.answer ? count + 1 : count;
  }, 0);

  return Math.round((correct / questions.length) * 100);
}

export function getTimeRemaining(examState: ExamState): number {
  const elapsed = Date.now() - examState.startTime;
  const totalTime = examState.duration * 60 * 1000; // Convert to milliseconds
  return Math.max(0, totalTime - elapsed);
}

export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
