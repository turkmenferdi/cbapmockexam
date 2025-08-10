import React from "react";
import { useExam } from "@/contexts/ExamContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  FileText,
  Award,
  Users,
  BookOpen,
  Target,
  Zap,
  Star,
  Trophy,
} from "lucide-react";
import { EXAM_CONFIG } from "@/lib/examUtils";
import { useNavigate } from "react-router-dom";

const EXAM_OPTIONS = [
  {
    id: "mock-exam-1",
    title: "Mock Exam 1",
    icon: BookOpen,
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
  },
  {
    id: "mock-exam-2",
    title: "Mock Exam 2",
    icon: FileText,
    color: "bg-green-500",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
  {
    id: "mock-exam-3",
    title: "Mock Exam 3",
    icon: Users,
    color: "bg-purple-500",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
  },
  {
    id: "mock-exam-4",
    title: "Mock Exam 4",
    icon: Zap,
    color: "bg-orange-500",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
  },
  {
    id: "mock-exam-5",
    title: "Mock Exam 5",
    icon: Target,
    color: "bg-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
  },
];

export default function ExamStart() {
  const { startNewExam, isLoading, examState, clearExam } = useExam();
  const navigate = useNavigate();

  const handleStartExam = async (examType: string) => {
    try {
      // Force clear localStorage first
      localStorage.removeItem("cbap_exam_state");

      // Clear exam state
      clearExam();

      console.log(`Starting new exam: ${examType}...`);
      const success = await startNewExam(examType);

      if (success) {
        console.log("Exam started successfully, navigating...");
        // Navigate to exam page using React Router
        navigate("/exam");
      } else {
        console.warn("Failed to start exam");
        alert("Sınav başlatılamadı. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Error starting exam:", error);
      alert("Sınav başlatılırken hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // Always show main page - remove the continue exam check for now
  // if (examState && !examState.isCompleted) {
  //   return continue exam screen
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-blue-900">CBAP Mock Exam</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CBAP sertifikasyon sınavına hazırlanmanız için 5 farklı odak
            alanında kapsamlı pratik sınavları. Her sınav 120 özenle seçilmiş
            sorudan oluşmaktadır.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {EXAM_OPTIONS.map((exam) => {
            const IconComponent = exam.icon;
            return (
              <Card
                key={exam.id}
                className={`${exam.borderColor} ${exam.bgColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${exam.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {exam.title}
                  </CardTitle>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      120 Soru
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    onClick={() => handleStartExam(exam.id)}
                    disabled={isLoading}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    {isLoading ? "Sorular Yükleniyor..." : "Sınavı Başlat"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-blue-900">
              <Award className="h-6 w-6" />
              Sınav Özellikleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sınav Detayları
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Soru:</span>
                    <span className="font-semibold">
                      {EXAM_CONFIG.TOTAL_QUESTIONS}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Süre:</span>
                    <span className="font-semibold">
                      {EXAM_CONFIG.DURATION_MINUTES} dakika
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Geçme Puanı:</span>
                    <span className="font-semibold">
                      {EXAM_CONFIG.PASSING_SCORE}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Soru Tipi:</span>
                    <span className="font-semibold">Çoktan Seçmeli</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">Özellikler</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      Canlı zamanlayıcı ve geri sayım
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      Soruları gözden geçirme için işaretleme
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      İlerleme takip yan çubuğu
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">Detaylı sonuç analizi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                <strong>Not:</strong> Sınav ilerlemesi otomatik olarak
                kaydedilir. İstediğiniz zaman sınavı bırakıp daha sonra devam
                edebilirsiniz.
              </p>
              <div className="mt-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.clear();
                    clearExam();
                    window.location.reload();
                  }}
                  className="text-xs"
                >
                  Tüm Verileri Temizle (Debug)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
