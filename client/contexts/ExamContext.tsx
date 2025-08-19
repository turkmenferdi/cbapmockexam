import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { ExamState, CBAPQuestion } from "@shared/types";
import {
  saveExamState,
  loadExamState,
  clearExamState,
  createNewExam,
  loadAllQuestions,
  getRandomQuestions,
  EXAM_CONFIG,
} from "@/lib/examUtils";

interface ExamContextType {
  examState: ExamState | null;
  isLoading: boolean;
  startNewExam: (examType?: string) => Promise<boolean>;
  answerQuestion: (questionId: string, answer: string) => void;
  showFeedback: (questionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  setCurrentQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeExam: () => void;
  clearExam: () => void;
}

type ExamAction =
  | { type: "SET_EXAM_STATE"; payload: ExamState }
  | { type: "ANSWER_QUESTION"; payload: { questionId: string; answer: string } }
  | { type: "SHOW_FEEDBACK"; payload: string }
  | { type: "TOGGLE_MARK_FOR_REVIEW"; payload: string }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "COMPLETE_EXAM" }
  | { type: "CLEAR_EXAM" };

function examReducer(
  state: ExamState | null,
  action: ExamAction,
): ExamState | null {
  if (!state && action.type !== "SET_EXAM_STATE") return null;

  try {
    switch (action.type) {
      case "SET_EXAM_STATE":
        return action.payload;

      case "ANSWER_QUESTION":
        if (!state) return null;
        const newState = {
          ...state,
          answers: {
            ...state.answers,
            [action.payload.questionId]: action.payload.answer,
          },
        };
        try {
          saveExamState(newState);
        } catch (error) {
          console.error("Failed to save exam state:", error);
        }
        return newState;

      case "SHOW_FEEDBACK":
        if (!state) return null;
        const feedbackState = {
          ...state,
          feedbackShown: {
            ...state.feedbackShown,
            [action.payload]: true,
          },
        };
        try {
          saveExamState(feedbackState);
        } catch (error) {
          console.error("Failed to save exam state:", error);
        }
        return feedbackState;

      case "TOGGLE_MARK_FOR_REVIEW":
        if (!state) return null;
        const updatedState = {
          ...state,
          markedForReview: {
            ...state.markedForReview,
            [action.payload]: !state.markedForReview[action.payload],
          },
        };
        try {
          saveExamState(updatedState);
        } catch (error) {
          console.error("Failed to save exam state:", error);
        }
        return updatedState;

      case "SET_CURRENT_QUESTION":
        if (!state) return null;
        const currentState = {
          ...state,
          currentQuestionIndex: action.payload,
        };
        try {
          saveExamState(currentState);
        } catch (error) {
          console.error("Failed to save exam state:", error);
        }
        return currentState;

      case "COMPLETE_EXAM":
        if (!state) return null;
        const completedState = {
          ...state,
          isCompleted: true,
        };
        try {
          saveExamState(completedState);
        } catch (error) {
          console.error("Failed to save exam state:", error);
        }
        return completedState;

      case "CLEAR_EXAM":
        try {
          clearExamState();
        } catch (error) {
          console.error("Failed to clear exam state:", error);
        }
        return null;

      default:
        return state;
    }
  } catch (error) {
    console.error("Reducer error:", error);
    return state;
  }
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [examState, dispatch] = useReducer(examReducer, null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);

    try {
      // Load existing exam state on mount
      const savedState = loadExamState();
      if (savedState) {
        // Migrate old exam states that don't have feedbackShown property
        const migratedState = {
          ...savedState,
          feedbackShown: savedState.feedbackShown || {},
        };
        dispatch({ type: "SET_EXAM_STATE", payload: migratedState });
      }
    } catch (error) {
      console.error("Failed to load exam state:", error);
    } finally {
      setIsLoading(false);
    }

    return () => {
      setIsMounted(false);
    };
  }, []);

  const startNewExam = async (examType?: string): Promise<boolean> => {
    if (!isMounted) return false;

    setIsLoading(true);

    try {
      let examQuestions: CBAPQuestion[] = [];

      if (examType) {
        // Load specific exam questions based on type
        const fileName = getExamFileName(examType);
        console.log(`Loading questions for ${examType} from ${fileName}`);

        try {
          const response = await fetch(`/data/${fileName}`);
          if (!response.ok) {
            throw new Error(
              `Failed to load ${fileName}: ${response.status} ${response.statusText}`,
            );
          }

          const questions = await response.json();

          // Validate questions format
          if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error(`Invalid questions format in ${fileName}`);
          }

          examQuestions = getRandomQuestions(
            questions,
            Math.min(EXAM_CONFIG.TOTAL_QUESTIONS, questions.length),
          );
          console.log(
            `Selected ${examQuestions.length} questions from ${fileName}`,
          );
        } catch (error) {
          console.error(
            `Failed to load ${fileName}, falling back to all questions`,
          );
          // Fallback to all questions if specific exam file fails
          const allQuestions = await loadAllQuestions();
          examQuestions = getRandomQuestions(
            allQuestions,
            Math.min(EXAM_CONFIG.TOTAL_QUESTIONS, allQuestions.length),
          );
        }
      } else {
        // Default behavior - load all questions
        const allQuestions = await loadAllQuestions();
        examQuestions = getRandomQuestions(
          allQuestions,
          Math.min(EXAM_CONFIG.TOTAL_QUESTIONS, allQuestions.length),
        );
      }

      if (examQuestions.length === 0) {
        throw new Error("No questions loaded");
      }

      // Check if component is still mounted before proceeding
      if (!isMounted) {
        console.log("Component unmounted during exam loading, aborting");
        return false;
      }

      console.log("Selected questions for exam:", examQuestions.length);

      const newExam = createNewExam(examQuestions);
      console.log("New exam created:", newExam);

      // Final mount check before state update
      if (isMounted) {
        dispatch({ type: "SET_EXAM_STATE", payload: newExam });
        saveExamState(newExam);
        console.log("New exam saved successfully");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to start new exam:", error);
      if (isMounted) {
        // Handle error gracefully without throwing
        console.error("Exam loading failed:", error);
      }
      return false;
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  // Helper function to get exam file name based on exam type
  const getExamFileName = (examType: string): string => {
    switch (examType) {
      case "mock-exam-1":
        return "mock_exam_1.json";
      case "mock-exam-2":
        return "mock_exam_2.json";
      case "mock-exam-3":
        return "mock_exam_3.json";
      case "mock-exam-4":
        return "mock_exam_4.json";
      case "mock-exam-5":
        return "mock_exam_5.json";
      default:
        return "mock_exam_1.json";
    }
  };

  const answerQuestion = (questionId: string, answer: string) => {
    if (!isMounted) return;
    dispatch({ type: "ANSWER_QUESTION", payload: { questionId, answer } });
  };

  const showFeedback = (questionId: string) => {
    if (!isMounted) return;
    dispatch({ type: "SHOW_FEEDBACK", payload: questionId });
  };

  const toggleMarkForReview = (questionId: string) => {
    if (!isMounted) return;
    dispatch({ type: "TOGGLE_MARK_FOR_REVIEW", payload: questionId });
  };

  const setCurrentQuestion = (index: number) => {
    if (!isMounted) return;
    dispatch({ type: "SET_CURRENT_QUESTION", payload: index });
  };

  const nextQuestion = () => {
    if (!isMounted || !examState) return;
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: examState.currentQuestionIndex + 1,
      });
    }
  };

  const previousQuestion = () => {
    if (!isMounted || !examState) return;
    if (examState.currentQuestionIndex > 0) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: examState.currentQuestionIndex - 1,
      });
    }
  };

  const completeExam = () => {
    if (!isMounted) return;
    dispatch({ type: "COMPLETE_EXAM" });
  };

  const clearExam = () => {
    if (!isMounted) return;
    clearExamState();
    dispatch({ type: "CLEAR_EXAM" });
  };

  const contextValue = React.useMemo(() => ({
    examState,
    isLoading,
    startNewExam,
    answerQuestion,
    showFeedback,
    toggleMarkForReview,
    setCurrentQuestion,
    nextQuestion,
    previousQuestion,
    completeExam,
    clearExam,
  }), [examState, isLoading]);

  return (
    <ExamContext.Provider value={contextValue}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
