import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import TutorNotepad from "./TutorNotepad";
import { LogOut, Home, Settings } from "lucide-react";

// Mock lesson data
const lessonData = {
  "intro": {
    id: "intro",
    title: "Introduction to Numbers",
    type: "theory" as const,
    content: {
      title: "Welcome to Numbers",
      description: "Let's start with the basics of numbers and counting.",
      sections: [
        {
          heading: "What are Numbers?",
          text: "Numbers are symbols we use to represent quantities. They help us count, measure, and compare things in the world around us.",
          examples: ["1, 2, 3, 4, 5 (counting numbers)", "0 (zero - represents nothing)", "10, 100, 1000 (larger numbers)"]
        },
        {
          heading: "Using Numbers Every Day",
          text: "We use numbers constantly in our daily lives - telling time, counting money, measuring ingredients, and much more.",
          examples: ["Age: I am 8 years old", "Time: It's 3:00 PM", "Money: This costs $5"]
        }
      ]
    }
  },
  "fractions": {
    id: "fractions",
    title: "Understanding Fractions",
    type: "theory" as const,
    content: {
      title: "Understanding Fractions",
      description: "Learn the basics of fractions and how they represent parts of a whole.",
      sections: [
        {
          heading: "What is a Fraction?",
          text: "A fraction represents a part of a whole. It consists of two numbers: a numerator (top number) and a denominator (bottom number).",
          examples: ["1/2 (one half)", "3/4 (three quarters)", "2/3 (two thirds)"]
        },
        {
          heading: "Reading Fractions",
          text: "The denominator tells us how many equal parts the whole is divided into, while the numerator tells us how many of those parts we're considering.",
          examples: ["In 3/5: denominator is 5, numerator is 3", "This means 3 out of 5 equal parts"]
        }
      ]
    }
  },
  "exercise-2": {
    id: "exercise-2",
    title: "Fraction Exercises",
    type: "exercise" as const,
    content: {
      title: "Fraction Practice",
      description: "Test your understanding of fractions with these multiple choice questions.",
      estimatedTime: "10 min",
      questions: [
        {
          question: "What fraction represents half of a circle?",
          options: ["1/4", "1/2", "3/4", "1/3"]
        },
        {
          question: "In the fraction 3/8, what is the denominator?",
          options: ["3", "8", "11", "5"]
        },
        {
          question: "Which fraction is larger: 1/2 or 1/4?",
          options: ["1/2", "1/4", "They are equal", "Cannot determine"]
        }
      ]
    }
  }
};

interface LessonInterfaceProps {
  userRole: "tutor" | "student";
  onLogout: () => void;
}

export default function LessonInterface({ userRole, onLogout }: LessonInterfaceProps) {
  const [currentSubchapter, setCurrentSubchapter] = useState("fractions");
  
  const subchapterIds = Object.keys(lessonData);
  const currentIndex = subchapterIds.indexOf(currentSubchapter);
  const currentLesson = lessonData[currentSubchapter as keyof typeof lessonData];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentSubchapter(subchapterIds[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < subchapterIds.length - 1) {
      setCurrentSubchapter(subchapterIds[currentIndex + 1]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" data-testid="button-home">
            <Home className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">EduTutor</h1>
            <p className="text-sm text-muted-foreground">Mathematics • Beginner • Basic Numbers</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground capitalize">{userRole}</span>
          <ThemeToggle />
          <Button variant="ghost" size="icon" data-testid="button-settings">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onLogout} data-testid="button-logout">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Subchapters */}
        <div className="w-80 border-r p-4 overflow-auto">
          <LessonSidebar 
            currentSubchapter={currentSubchapter}
            onSubchapterSelect={setCurrentSubchapter}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <LessonContent
            subchapter={currentLesson}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={currentIndex > 0}
            canGoForward={currentIndex < subchapterIds.length - 1}
          />
        </div>

        {/* Right Sidebar - Tutor Notepad */}
        {userRole === "tutor" && (
          <div className="w-80 border-l p-4 overflow-auto">
            <TutorNotepad isVisible={true} />
          </div>
        )}
      </div>
    </div>
  );
}