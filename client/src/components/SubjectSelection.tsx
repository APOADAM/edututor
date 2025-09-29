import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Code, Languages, ChevronRight } from "lucide-react";

const subjects = [
  {
    id: "math",
    name: "Mathematics",
    description: "Algebra, Geometry, Calculus and more",
    icon: Calculator,
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "bg-blue-500/10 text-blue-700"
  },
  {
    id: "programming",
    name: "Computer Programming", 
    description: "Learn coding fundamentals and advanced concepts",
    icon: Code,
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "bg-green-500/10 text-green-700"
  },
  {
    id: "languages",
    name: "Language Learning",
    description: "Master new languages with interactive exercises",
    icon: Languages,
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "bg-purple-500/10 text-purple-700"
  }
];

interface SubjectSelectionProps {
  userRole: "tutor" | "student";
  onSubjectSelect: (subjectId: string) => void;
}

export default function SubjectSelection({ userRole, onSubjectSelect }: SubjectSelectionProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Choose a Subject</h1>
          <p className="text-muted-foreground">
            Select the subject you'd like to {userRole === "tutor" ? "teach" : "learn"} today
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <Card 
                key={subject.id} 
                className="hover-elevate cursor-pointer transition-all group"
                onClick={() => onSubjectSelect(subject.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${subject.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subject.levels.map((level) => (
                      <Badge key={level} variant="secondary" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid={`button-select-${subject.id}`}
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}