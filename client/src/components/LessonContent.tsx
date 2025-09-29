import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, BookOpen, Clock } from "lucide-react";

interface LessonContentProps {
  subchapter: {
    id: string;
    title: string;
    type: "theory" | "exercise";
    content: any;
  };
  onPrevious: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export default function LessonContent({ 
  subchapter, 
  onPrevious, 
  onNext, 
  canGoBack, 
  canGoForward 
}: LessonContentProps) {
  const renderTheoryContent = (content: any) => (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
        <div className="text-muted-foreground mb-6">{content.description}</div>
        
        {content.sections.map((section: any, index: number) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-medium mb-3">{section.heading}</h3>
            <p className="mb-4">{section.text}</p>
            {section.examples && (
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {section.examples.map((example: string, i: number) => (
                    <li key={i} className="text-sm font-mono">{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderExerciseContent = (content: any) => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="outline">
            {content.questions.length} Questions
          </Badge>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {content.estimatedTime}
          </Badge>
        </div>
      </div>

      {content.questions.map((question: any, index: number) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="font-medium mb-4">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option: string, optionIndex: number) => (
                  <label 
                    key={optionIndex}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <input 
                      type="radio" 
                      name={`question-${index}`}
                      value={optionIndex}
                      className="w-4 h-4"
                      data-testid={`radio-q${index}-option${optionIndex}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center">
        <Button className="px-8" data-testid="button-submit-exercise">
          Submit Answers
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <Badge variant={subchapter.type === "theory" ? "secondary" : "outline"}>
            {subchapter.type === "theory" ? (
              <BookOpen className="w-3 h-3 mr-1" />
            ) : null}
            {subchapter.type}
          </Badge>
          <h1 className="text-xl font-semibold">{subchapter.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Progress: 3/6 lessons completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-3 border-b">
        <Progress value={50} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {subchapter.type === "theory" 
          ? renderTheoryContent(subchapter.content)
          : renderExerciseContent(subchapter.content)
        }
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={!canGoBack}
          data-testid="button-previous"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canGoForward}
          data-testid="button-next"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}