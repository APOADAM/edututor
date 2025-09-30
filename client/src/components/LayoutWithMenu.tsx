import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, Settings } from "lucide-react";

interface LayoutWithMenuProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function LayoutWithMenu({ children, onLogout }: LayoutWithMenuProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="w-full bg-background p-4 flex justify-between items-center shadow-sm">
        {/* Left side: Logo / Title */}
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">EduTutor</h1>
        </div>

        {/* Right side: Menu Buttons */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <LanguageSelector />

          {/* Dark/Light mode toggle */}
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            <ThemeToggle />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          {/* Logout */}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}