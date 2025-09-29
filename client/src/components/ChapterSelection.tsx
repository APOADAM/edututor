import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, BookOpen, Clock, CheckCircle2, Lock } from "lucide-react";

// Mock data for mathematics beginner chapters
const chapters = [
  {
    id: "numbers",
    name: "Basic Numbers",
    description: "Learn about whole numbers, fractions, and decimals",
    lessons: 5,
    duration: "45 min",
    progress: 100,
    isUnlocked: true,
    isCompleted: true
  },
  {
    id: "addition",
    name: "Addition & Subtraction", 
    description: "Master the fundamentals of adding and subtracting",
    lessons: 7,
    duration: "60 min",
    progress: 80,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: "multiplication",
    name: "Multiplication",
    description: "Learn multiplication tables and techniques",
    lessons: 6,
    duration: "50 min", 
    progress: 0,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: "division",
    name: "Division",
    description: "Understand division and its relationship to multiplication",
    lessons: 6,
    duration: "55 min",
    progress: 0,
    isUnlocked: false,
    isCompleted: false
  }
];

interface ChapterSelectionProps {
  subject: string;
  level: string;
  onChapterSelect: (chapterId: string) => void;
  onBack: () => void;
}

export default function ChapterSelection({ subject, level, onChapterSelect, onBack }: ChapterSelectionProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold capitalize">{subject} - {level}</h1>
            <p className="text-muted-foreground">
              Select a chapter to begin your learning journey
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {chapters.map((chapter, index) => (
            <Card 
              key={chapter.id}
              className={`transition-all ${
                chapter.isUnlocked 
                  ? "hover-elevate cursor-pointer" 
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => chapter.isUnlocked && onChapterSelect(chapter.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{chapter.name}</CardTitle>
                        {chapter.isCompleted && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        {!chapter.isUnlocked && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardDescription>{chapter.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={chapter.isCompleted ? "default" : "secondary"}>
                      {chapter.isCompleted ? "Completed" : chapter.isUnlocked ? "Available" : "Locked"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{chapter.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{chapter.duration}</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {chapter.progress}% complete
                  </span>
                </div>
                <Progress value={chapter.progress} className="mb-4" />
                <Button 
                  variant={chapter.isCompleted ? "secondary" : "default"}
                  disabled={!chapter.isUnlocked}
                  data-testid={`button-chapter-${chapter.id}`}
                  className="w-full md:w-auto"
                >
                  {chapter.isCompleted ? "Review Chapter" : "Start Chapter"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}