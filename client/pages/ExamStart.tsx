import React from 'react';
import { useExam } from '@/contexts/ExamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileText, Award, Users } from 'lucide-react';
import { EXAM_CONFIG } from '@/lib/examUtils';

export default function ExamStart() {
  const { startNewExam, isLoading, examState } = useExam();

  const handleStartExam = () => {
    startNewExam();
  };

  if (examState && !examState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">Resume Your Exam</CardTitle>
            <CardDescription>
              You have an exam in progress. Continue where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Question {examState.currentQuestionIndex + 1} of {examState.questions.length}
            </p>
            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/exam'}
            >
              Continue Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            CBAP Mock Exam
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our comprehensive CBAP certification practice exam. 
            120 carefully selected questions to help you prepare for success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <FileText className="h-5 w-5" />
                Exam Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-semibold">{EXAM_CONFIG.TOTAL_QUESTIONS}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{EXAM_CONFIG.DURATION_MINUTES} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passing Score:</span>
                <span className="font-semibold">{EXAM_CONFIG.PASSING_SCORE}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Question Type:</span>
                <span className="font-semibold">Multiple Choice</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Award className="h-5 w-5" />
                Exam Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">Live timer with countdown</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">Mark questions for review</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">Progress tracking sidebar</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">Detailed result analysis</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">Ready to Begin?</CardTitle>
            <CardDescription>
              Click the button below to start your CBAP mock exam. 
              Make sure you have {EXAM_CONFIG.DURATION_MINUTES} minutes available.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleStartExam}
              disabled={isLoading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? 'Loading Questions...' : 'Start New Exam'}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Your progress will be automatically saved
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
