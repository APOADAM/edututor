import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Trophy, Clock, BookOpen } from "lucide-react";

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Start with the fundamentals",
    chapters: 8,
    estimatedTime: "2-3 hours",
    progress: 0,
    difficulty: "Easy"
  },
  {
    id: "intermediate", 
    name: "Intermediate",
    description: "Build upon your knowledge",
    chapters: 12,
    estimatedTime: "4-5 hours", 
    progress: 0,
    difficulty: "Medium"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Master complex concepts",
    chapters: 15,
    estimatedTime: "6-8 hours",
    progress: 0,
    difficulty: "Hard"
  }
];

interface LevelSelectionProps {
  subject: string;
  onLevelSelect: (levelId: string) => void;
  onBack: () => void;
}

export default function LevelSelection({ subject, onLevelSelect, onBack }: LevelSelectionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-700";
      case "Medium": return "bg-yellow-500/10 text-yellow-700";
      case "Hard": return "bg-red-500/10 text-red-700";
      default: return "bg-gray-500/10 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold capitalize">{subject} - Select Level</h1>
            <p className="text-muted-foreground">
              Choose your skill level to get started with personalized content
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => onLevelSelect(level.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{level.name}</CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={getDifficultyColor(level.difficulty)}
                  >
                    {level.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{level.chapters} chapters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{level.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Progress: {level.progress}%</span>
                  </div>
                </div>
                <Progress value={level.progress} className="mb-4" />
                <Button 
                  className="w-full md:w-auto"
                  data-testid={`button-select-${level.id}`}
                >
                  Start {level.name} Level
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}