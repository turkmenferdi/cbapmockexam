import React, { useState } from "react";
import { useExam } from "@/contexts/ExamContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Award,
  X,
  Check,
  ChevronDown,
  RotateCcw,
  Trophy,
  Target,
  Clock,
} from "lucide-react";
import { calculateScore, EXAM_CONFIG } from "@/lib/examUtils";
import { useNavigate } from "react-router-dom";

export default function ExamResults() {
  const { examState, clearExam } = useExam();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const navigate = useNavigate();

  if (!examState || !examState.isCompleted) {
    navigate("/");
    return null;
  }

  const score = calculateScore(examState);
  const totalQuestions = examState.questions.length;
  const correctAnswers = examState.questions.reduce((count, question) => {
    return examState.answers[question.id] === question.answer
      ? count + 1
      : count;
  }, 0);
  const incorrectAnswers = totalQuestions - correctAnswers;
  const passed = score >= EXAM_CONFIG.PASSING_SCORE;

  const duration = examState.duration * 60 * 1000; // Convert to milliseconds
  const timeSpent = Math.min(Date.now() - examState.startTime, duration);
  const timeSpentMinutes = Math.floor(timeSpent / (1000 * 60));
  const timeSpentSeconds = Math.floor((timeSpent % (1000 * 60)) / 1000);

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleStartNewExam = () => {
    clearExam();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Score Overview */}
        <Card className="mb-8">
          <CardContent className="pt-8 text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <Trophy className={`h-12 w-12 text-green-600`} />
              ) : (
                <Target className={`h-12 w-12 text-red-600`} />
              )}
            </div>

            <h1 className="text-4xl font-bold mb-2">{score}%</h1>
            <p
              className={`text-xl font-semibold mb-4 ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed
                ? "Congratulations! You Passed!"
                : "You Need More Practice"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {incorrectAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {timeSpentMinutes}:
                  {timeSpentSeconds.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={handleStartNewExam} size="lg" className="mr-4">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Exam
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Detailed Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examState.questions.map((question, index) => {
                const userAnswer = examState.answers[question.id];
                const isCorrect = userAnswer === question.answer;
                const isExpanded = expandedQuestions.has(question.id);
                const wasMarkedForReview =
                  examState.markedForReview[question.id];

                return (
                  <Collapsible
                    key={question.id}
                    open={isExpanded}
                    onOpenChange={() => toggleQuestion(question.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {isCorrect ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-600" />
                            )}
                          </div>

                          <div>
                            <div className="font-medium">
                              Question {index + 1}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              {userAnswer ? (
                                <span>Your answer: {userAnswer}</span>
                              ) : (
                                <span className="text-orange-600">
                                  No answer
                                </span>
                              )}
                              {wasMarkedForReview && (
                                <Badge variant="secondary" className="text-xs">
                                  Marked for Review
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Question:</h4>
                          <p className="text-gray-700">{question.question}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Options:</h4>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => {
                              const optionLetter = option.charAt(0);
                              const isUserAnswer = userAnswer === optionLetter;
                              const isCorrectAnswer =
                                question.answer === optionLetter;

                              return (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded border ${
                                    isCorrectAnswer
                                      ? "bg-green-50 border-green-200"
                                      : isUserAnswer && !isCorrectAnswer
                                        ? "bg-red-50 border-red-200"
                                        : "bg-white border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    <div className="flex gap-1">
                                      {isCorrectAnswer && (
                                        <Badge
                                          variant="default"
                                          className="bg-green-600 text-xs"
                                        >
                                          Correct
                                        </Badge>
                                      )}
                                      {isUserAnswer && !isCorrectAnswer && (
                                        <Badge
                                          variant="destructive"
                                          className="text-xs"
                                        >
                                          Your Answer
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Explanation:</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
