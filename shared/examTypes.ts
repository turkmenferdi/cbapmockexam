export interface ExamType {
  id: string;
  title: string;
  description: string;
  focus: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Mixed";
  icon: string;
  color: string;
  questionCount: number;
}

export const EXAM_TYPES: ExamType[] = [
  {
    id: "general-cbap",
    title: "General CBAP Practice",
    description:
      "Comprehensive practice covering all CBAP knowledge areas with balanced question distribution.",
    focus: "All CBAP Knowledge Areas",
    difficulty: "Mixed",
    icon: "📚",
    color: "blue",
    questionCount: 120,
  },
  {
    id: "requirements-focus",
    title: "Requirements Management Focus",
    description:
      "Deep dive into requirements elicitation, analysis, specification, and validation techniques.",
    focus: "Requirements Engineering",
    difficulty: "Intermediate",
    icon: "📋",
    color: "green",
    questionCount: 120,
  },
  {
    id: "stakeholder-focus",
    title: "Stakeholder Engagement Focus",
    description:
      "Specialized practice on stakeholder analysis, communication, and relationship management.",
    focus: "Stakeholder Management",
    difficulty: "Advanced",
    icon: "👥",
    color: "purple",
    questionCount: 120,
  },
  {
    id: "solution-focus",
    title: "Solution Evaluation Focus",
    description:
      "Advanced practice on solution assessment, validation, and performance measurement.",
    focus: "Solution Evaluation",
    difficulty: "Expert",
    icon: "⚡",
    color: "orange",
    questionCount: 120,
  },
  {
    id: "strategy-focus",
    title: "Business Analysis Strategy",
    description:
      "Strategic thinking practice covering business analysis planning and governance.",
    focus: "Strategy & Planning",
    difficulty: "Advanced",
    icon: "🎯",
    color: "red",
    questionCount: 120,
  },
];
