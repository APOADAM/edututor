import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import LayoutWithMenu from "@/components/LayoutWithMenu"; // ✅ σωστό import

// Mock data
const chapters = [
  { id: "numbers", name: "Basic Numbers", description: "Learn about whole numbers, fractions, and decimals", lessons: 5, duration: "45 min", progress: 100, isUnlocked: true, isCompleted: true },
  { id: "addition", name: "Addition & Subtraction", description: "Master the fundamentals of adding and subtracting", lessons: 7, duration: "60 min", progress: 80, isUnlocked: true, isCompleted: false },
  { id: "multiplication", name: "Multiplication", description: "Learn multiplication tables and techniques", lessons: 6, duration: "50 min", progress: 0, isUnlocked: true, isCompleted: false },
  { id: "division", name: "Division", description: "Understand division and its relationship to multiplication", lessons: 6, duration: "55 min", progress: 0, isUnlocked: false, isCompleted: false }
];

interface ChapterSelectionProps {
  subject: string;
  level: string;
  onChapterSelect: (chapterId: string) => void;
  onBack: () => void;
  onLogout: () => void; // για να περάσουμε στο LayoutWithMenu
}

export default function ChapterSelection({ subject, level, onChapterSelect, onBack, onLogout }: ChapterSelectionProps) {
  // Υπολογίζουμε συνολικό progress των chapters
  const totalProgress = chapters.reduce((sum, ch) => sum + ch.progress, 0) / chapters.length;

  return (
    <LayoutWithMenu
      onLogout={onLogout}
      pageName={`${subject} - ${level}`}
      showProgress={true}
      progressValue={totalProgress}
      homeButtonOnClick={onBack} // ή router.push("/dashboard")
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold capitalize">{subject} - {level}</h2>
          <p className="text-muted-foreground">Select a chapter to begin your learning journey</p>
        </div>

        <div className="grid gap-4">
          {chapters.map((chapter, index) => (
            <Card 
              key={chapter.id}
              className={`transition-all ${chapter.isUnlocked ? "hover-elevate cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
              onClick={() => chapter.isUnlocked && onChapterSelect(chapter.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{chapter.name}</CardTitle>
                      <CardDescription>{chapter.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={chapter.isCompleted ? "default" : "secondary"}>
                    {chapter.isCompleted ? "Completed" : chapter.isUnlocked ? "Available" : "Locked"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                  <span>{chapter.lessons} lessons • {chapter.duration}</span>
                  <span>{chapter.progress}% complete</span>
                </div>
                <Progress value={chapter.progress} className="mb-4" />
                <Button 
                  variant={chapter.isCompleted ? "secondary" : "default"}
                  disabled={!chapter.isUnlocked}
                  className="w-full md:w-auto"
                >
                  {chapter.isCompleted ? "Review Chapter" : "Start Chapter"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LayoutWithMenu>
  );
}
