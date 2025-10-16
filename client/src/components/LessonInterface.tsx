import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import TutorNotepad from "./TutorNotepad";
import ResizableLayout from "./ResizableLayout";
import LeftSidebar, { User } from "./LeftSidebar";
import RightSidebar, { Class } from "./RightSidebar";
import { LogOut, Home, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  userRole: "tutor" | "student" | "creator";
  onLogout: () => void;
  onHome: () => void;
}

export default function LessonInterface({ userRole, onLogout, onHome }: LessonInterfaceProps) {
  const [currentSubchapter, setCurrentSubchapter] = useState("fractions");
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(userRole === "tutor" || userRole === "creator");
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const { t } = useTranslation();
  
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

  const handleAddUser = (name: string, role: "teacher" | "student") => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      role,
      status: "online"
    };
    setUsers([...users, newUser]);
  };

  const handleAddClass = (name: string) => {
    const newClass: Class = {
      id: Date.now().toString(),
      name,
      studentsCount: 0,
      createdAt: new Date().toLocaleDateString()
    };
    setClasses([...classes, newClass]);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            data-testid="button-toggle-sidebar"
          >
            {showLeftPanel ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onHome}     // ✅ τώρα γυρνάει πίσω
            data-testid="button-home"
          >
            <Home className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">EduTutor</h1>
            <p className="text-sm text-muted-foreground">
              {t('mathematics')} • {t('beginner')} • {t('basic_numbers')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground capitalize">{userRole}</span>
          <LanguageSelector />
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
      <div className="flex-1 overflow-hidden flex">
        <LeftSidebar users={users} onAddUser={handleAddUser} />
        <div className="flex-1 overflow-hidden">
          <ResizableLayout
            leftPanel={
              <LessonSidebar
                currentSubchapter={currentSubchapter}
                onSubchapterSelect={setCurrentSubchapter}
              />
            }
            centerPanel={
              <LessonContent
                subchapter={currentLesson}
                onPrevious={handlePrevious}
                onNext={handleNext}
                canGoBack={currentIndex > 0}
                canGoForward={currentIndex < subchapterIds.length - 1}
              />
            }
            rightPanel={
              userRole === "tutor" || userRole === "creator" ? (
                <TutorNotepad isVisible={true} />
              ) : undefined
            }
            showLeftPanel={showLeftPanel}
            showRightPanel={showRightPanel}
            leftPanelDefaultSize={20}
            rightPanelDefaultSize={25}
            leftPanelMinSize={15}
            rightPanelMinSize={20}
          />
        </div>
        <RightSidebar classes={classes} onAddClass={handleAddClass} />
      </div>
    </div>
  );
}
