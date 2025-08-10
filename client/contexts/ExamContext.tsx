import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ExamState, CBAPQuestion } from '@shared/types';
import { 
  saveExamState, 
  loadExamState, 
  clearExamState, 
  createNewExam,
  loadAllQuestions,
  getRandomQuestions,
  EXAM_CONFIG
} from '@/lib/examUtils';

interface ExamContextType {
  examState: ExamState | null;
  isLoading: boolean;
  startNewExam: () => Promise<void>;
  answerQuestion: (questionId: string, answer: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  setCurrentQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeExam: () => void;
  clearExam: () => void;
}

type ExamAction = 
  | { type: 'SET_EXAM_STATE'; payload: ExamState }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: string } }
  | { type: 'TOGGLE_MARK_FOR_REVIEW'; payload: string }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'COMPLETE_EXAM' }
  | { type: 'CLEAR_EXAM' };

function examReducer(state: ExamState | null, action: ExamAction): ExamState | null {
  if (!state && action.type !== 'SET_EXAM_STATE') return null;

  switch (action.type) {
    case 'SET_EXAM_STATE':
      return action.payload;
    
    case 'ANSWER_QUESTION':
      const newState = {
        ...state!,
        answers: {
          ...state!.answers,
          [action.payload.questionId]: action.payload.answer
        }
      };
      saveExamState(newState);
      return newState;
    
    case 'TOGGLE_MARK_FOR_REVIEW':
      const updatedState = {
        ...state!,
        markedForReview: {
          ...state!.markedForReview,
          [action.payload]: !state!.markedForReview[action.payload]
        }
      };
      saveExamState(updatedState);
      return updatedState;
    
    case 'SET_CURRENT_QUESTION':
      const currentState = {
        ...state!,
        currentQuestionIndex: action.payload
      };
      saveExamState(currentState);
      return currentState;
    
    case 'COMPLETE_EXAM':
      const completedState = {
        ...state!,
        isCompleted: true
      };
      saveExamState(completedState);
      return completedState;
    
    case 'CLEAR_EXAM':
      clearExamState();
      return null;
    
    default:
      return state;
  }
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [examState, dispatch] = useReducer(examReducer, null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Load existing exam state on mount
    const savedState = loadExamState();
    if (savedState) {
      dispatch({ type: 'SET_EXAM_STATE', payload: savedState });
    }
    setIsLoading(false);
  }, []);

  const startNewExam = async () => {
    setIsLoading(true);
    try {
      const allQuestions = await loadAllQuestions();
      console.log('Loaded questions:', allQuestions.length);

      if (allQuestions.length === 0) {
        throw new Error('No questions loaded');
      }

      const examQuestions = getRandomQuestions(allQuestions, Math.min(EXAM_CONFIG.TOTAL_QUESTIONS, allQuestions.length));
      console.log('Selected questions for exam:', examQuestions.length);

      const newExam = createNewExam(examQuestions);
      console.log('New exam created:', newExam);

      dispatch({ type: 'SET_EXAM_STATE', payload: newExam });
      saveExamState(newExam);

      console.log('New exam saved successfully');
      return true;
    } catch (error) {
      console.error('Failed to start new exam:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuestion = (questionId: string, answer: string) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } });
  };

  const toggleMarkForReview = (questionId: string) => {
    dispatch({ type: 'TOGGLE_MARK_FOR_REVIEW', payload: questionId });
  };

  const setCurrentQuestion = (index: number) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: index });
  };

  const nextQuestion = () => {
    if (examState && examState.currentQuestionIndex < examState.questions.length - 1) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: examState.currentQuestionIndex + 1 });
    }
  };

  const previousQuestion = () => {
    if (examState && examState.currentQuestionIndex > 0) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: examState.currentQuestionIndex - 1 });
    }
  };

  const completeExam = () => {
    dispatch({ type: 'COMPLETE_EXAM' });
  };

  const clearExam = () => {
    clearExamState();
    dispatch({ type: 'CLEAR_EXAM' });
  };

  return (
    <ExamContext.Provider value={{
      examState,
      isLoading,
      startNewExam,
      answerQuestion,
      toggleMarkForReview,
      setCurrentQuestion,
      nextQuestion,
      previousQuestion,
      completeExam,
      clearExam
    }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
