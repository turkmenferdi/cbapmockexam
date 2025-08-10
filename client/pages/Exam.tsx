import React, { useEffect, useState } from 'react';
import { useExam } from '@/contexts/ExamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag, 
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';
import { getTimeRemaining, formatTime, calculateScore } from '@/lib/examUtils';
import { useNavigate } from 'react-router-dom';

export default function Exam() {
  const { examState, answerQuestion, toggleMarkForReview, setCurrentQuestion, nextQuestion, previousQuestion, completeExam } = useExam();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!examState) {
      console.log('No exam state found, redirecting to home');
      navigate('/');
      return;
    }

    if (examState.isCompleted) {
      console.log('Exam completed, redirecting to results');
      navigate('/results');
      return;
    }

    console.log('Current exam state:', examState);

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(examState);
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        completeExam();
        navigate('/results');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, navigate, completeExam]);

  if (!examState || examState.isCompleted) {
    return null;
  }

  const currentQuestion = examState.questions[examState.currentQuestionIndex];
  const currentAnswer = examState.answers[currentQuestion.id] || '';
  const isMarkedForReview = examState.markedForReview[currentQuestion.id] || false;
  
  const answeredCount = Object.keys(examState.answers).length;
  const progressPercentage = (answeredCount / examState.questions.length) * 100;

  const handleAnswerChange = (answer: string) => {
    answerQuestion(currentQuestion.id, answer);
  };

  const handleMarkForReview = () => {
    toggleMarkForReview(currentQuestion.id);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleFinishExam = () => {
    if (window.confirm('Are you sure you want to finish the exam? This action cannot be undone.')) {
      completeExam();
      navigate('/results');
    }
  };

  const getQuestionStatus = (questionId: string, index: number) => {
    const isAnswered = !!examState.answers[questionId];
    const isMarked = examState.markedForReview[questionId];
    const isCurrent = index === examState.currentQuestionIndex;

    if (isCurrent) return 'current';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">CBAP Mock Exam</h1>
            <Badge variant="outline" className="text-sm">
              Question {examState.currentQuestionIndex + 1} of {examState.questions.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>{answeredCount} answered</span>
            </div>

            <div className="flex items-center gap-2 text-lg font-mono font-semibold text-red-600">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <Button
              variant="outline"
              onClick={handleFinishExam}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Sınavı Bitir
            </Button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-3">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Question Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-6 gap-2">
                {examState.questions.map((question, index) => {
                  const status = getQuestionStatus(question.id, index);
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionSelect(index)}
                      className={`
                        w-8 h-8 rounded text-xs font-medium transition-colors
                        ${status === 'current' ? 'bg-blue-600 text-white' : ''}
                        ${status === 'answered' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                        ${status === 'marked' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''}
                        ${status === 'unanswered' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : ''}
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Not Answered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Question Area */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
                {isMarkedForReview && (
                  <Badge variant="secondary" className="ml-4 flex-shrink-0">
                    <Flag className="h-3 w-3 mr-1" />
                    Marked
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                {currentQuestion.options.map((option, index) => {
                  const optionValue = option.charAt(0); // A, B, C, D
                  
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={optionValue} id={`option-${index}`} className="mt-1" />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-sm leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleMarkForReview}
                    className={isMarkedForReview ? 'bg-yellow-50 border-yellow-300' : ''}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={examState.currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {examState.currentQuestionIndex === examState.questions.length - 1 ? (
                    <Button onClick={handleFinishExam} className="bg-green-600 hover:bg-green-700">
                      Finish Exam
                    </Button>
                  ) : (
                    <Button onClick={nextQuestion}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
