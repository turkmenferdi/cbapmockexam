export interface CBAPQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ExamState {
  questions: CBAPQuestion[];
  currentQuestionIndex: number;
  answers: { [questionId: string]: string };
  markedForReview: { [questionId: string]: boolean };
  feedbackShown: { [questionId: string]: boolean };
  startTime: number;
  duration: number; // in minutes
  isCompleted: boolean;
  score?: number;
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passed: boolean;
  questions: CBAPQuestion[];
  userAnswers: { [questionId: string]: string };
}
