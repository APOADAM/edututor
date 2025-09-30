import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Trophy, Clock, BookOpen } from "lucide-react";
import { levelsBySubject } from "@/components/levels";
import LayoutWithMenu from "@/components/LayoutWithMenu";

type SubjectKey = keyof typeof levelsBySubject;

interface Level {
  id: string;
  name: string;
  description: string;
  chapters: number;
  estimatedTime: string;
  progress: number;
  difficulty: string;
}

interface LevelSelectionProps {
  subject: string; // Θα πρέπει να ταιριάζει με τα keys του levelsBySubject
  onLevelSelect: (levelId: string) => void;
  onBack: () => void;
  onLogout: () => void; // <-- προσθέτουμε εδώ
}

export default function LevelSelection({ subject, onLevelSelect, onBack , onLogout }: LevelSelectionProps) {
  // Type-safe access
  const levels: Level[] = levelsBySubject[subject as SubjectKey] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-700";
      case "Medium": return "bg-yellow-500/10 text-yellow-700";
      case "Hard": return "bg-red-500/10 text-red-700";
      default: return "bg-gray-500/10 text-gray-700";
    }
  };

  return (
      <LayoutWithMenu onLogout={onLogout}>
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
          {levels.map((level: Level) => (
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
    </LayoutWithMenu>
  );
}