import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle } from "lucide-react";

const subchapters = [
  {
    id: "intro",
    title: "Introduction to Numbers",
    type: "theory",
    isCompleted: true
  },
  {
    id: "counting",
    title: "Counting & Place Value",
    type: "theory", 
    isCompleted: true
  },
  {
    id: "exercise-1",
    title: "Practice Exercise 1",
    type: "exercise",
    isCompleted: true
  },
  {
    id: "fractions",
    title: "Understanding Fractions",
    type: "theory",
    isCompleted: false
  },
  {
    id: "exercise-2", 
    title: "Fraction Exercises",
    type: "exercise",
    isCompleted: false
  },
  {
    id: "decimals",
    title: "Decimal Numbers",
    type: "theory",
    isCompleted: false
  }
];

interface LessonSidebarProps {
  currentSubchapter: string;
  onSubchapterSelect: (id: string) => void;
}

export default function LessonSidebar({ currentSubchapter, onSubchapterSelect }: LessonSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Basic Numbers</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="button-toggle-sidebar"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Mathematics • Beginner
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-2">
          {subchapters.map((subchapter) => (
            <div
              key={subchapter.id}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors hover:bg-accent/50 ${
                currentSubchapter === subchapter.id ? "bg-accent" : ""
              }`}
              onClick={() => onSubchapterSelect(subchapter.id)}
              data-testid={`button-subchapter-${subchapter.id}`}
            >
              <div className="flex-shrink-0">
                {subchapter.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm ${
                    currentSubchapter === subchapter.id ? "font-medium" : ""
                  } truncate`}>
                    {subchapter.title}
                  </span>
                  <Badge 
                    variant={subchapter.type === "theory" ? "secondary" : "outline"}
                    className="text-xs flex-shrink-0"
                  >
                    {subchapter.type === "theory" ? (
                      <BookOpen className="w-3 h-3 mr-1" />
                    ) : null}
                    {subchapter.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}