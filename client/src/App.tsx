import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

// Import all page components
import LoginForm from "@/components/LoginForm";
import RoleSelection from "@/components/RoleSelection";
import SubjectSelection from "@/components/SubjectSelection";
import LevelSelection from "@/components/LevelSelection";
import ChapterSelection from "@/components/ChapterSelection";
import LessonInterface from "@/components/LessonInterface";
import NotFound from "@/pages/not-found";

type AppState = {
  user: { username: string; role: "tutor" | "student" } | null;
  selectedSubject: string | null;
  selectedLevel: string | null;
  selectedChapter: string | null;
};

function Router() {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    selectedSubject: null,
    selectedLevel: null,
    selectedChapter: null
  });

  // --- Handlers ---
  const handleLogin = (username: string, password: string) => {
    console.log("Login attempt:", { username, password });
    // Dummy login
    setAppState(prev => ({ 
      ...prev, 
      user: { username, role: "student" } 
    }));
  };

  const handleRoleSelect = (role: "tutor" | "student") => {
    setAppState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, role } : null
    }));
  };

  const handleSubjectSelect = (subjectId: string) => {
    setAppState(prev => ({ ...prev, selectedSubject: subjectId }));
  };

  const handleLevelSelect = (levelId: string) => {
    setAppState(prev => ({ ...prev, selectedLevel: levelId }));
  };

  const handleChapterSelect = (chapterId: string) => {
    setAppState(prev => ({ ...prev, selectedChapter: chapterId }));
  };

  const handleLogout = () => {
    setAppState({
      user: null,
      selectedSubject: null,
      selectedLevel: null,
      selectedChapter: null
    });
  };

  const handleBack = () => {
    if (appState.selectedChapter) {
      setAppState(prev => ({ ...prev, selectedChapter: null }));
    } else if (appState.selectedLevel) {
      setAppState(prev => ({ ...prev, selectedLevel: null }));
    } else if (appState.selectedSubject) {
      setAppState(prev => ({ ...prev, selectedSubject: null }));
    } else if (appState.user) {
      setAppState(prev => ({ ...prev, user: null }));
    }
  };

  const handleHome = () => {
    // 👈 αυτό θα σε πηγαίνει πίσω στο ChapterSelection
    setAppState(prev => ({ ...prev, selectedChapter: null }));
  };

  // --- Render based on current state ---
  if (!appState.user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!appState.user.role || appState.user.role === "student") {
    if (!appState.selectedSubject) {
      if (appState.user.username && !appState.selectedSubject) {
        const needsRoleSelection = !appState.user.role || appState.user.role === "student";
        if (needsRoleSelection && !appState.selectedSubject) {
          return <RoleSelection onRoleSelect={handleRoleSelect} onLogout={handleLogout} />;
        }
      }
      return (
        <SubjectSelection 
          userRole={appState.user.role} 
          onSubjectSelect={handleSubjectSelect} 
          onLogout={handleLogout} 
        />
      );
    }
  }

  if (appState.user.role && !appState.selectedSubject) {
    return (
      <SubjectSelection 
        userRole={appState.user.role} 
        onSubjectSelect={handleSubjectSelect} 
        onLogout={handleLogout} 
      />
    );
  }

  if (appState.selectedSubject && !appState.selectedLevel) {
    return (
      <LevelSelection 
        subject={appState.selectedSubject}
        onLevelSelect={handleLevelSelect}
        onBack={handleBack}
        onLogout={handleLogout}
      />
    );
  }

  if (appState.selectedLevel && !appState.selectedChapter) {
    return (
      <ChapterSelection
        subject={appState.selectedSubject!}
        level={appState.selectedLevel}
        onChapterSelect={handleChapterSelect}
        onBack={handleBack}
        onLogout={handleLogout}
      />
    );
  }

  if (appState.selectedChapter) {
    return (
      <LessonInterface
        userRole={appState.user.role}
        onLogout={handleLogout}
        onHome={handleHome}   // 👈 περνάμε το Home handler
      />
    );
  }

  return <NotFound />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;