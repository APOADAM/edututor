import React from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, Settings } from "lucide-react";

interface LayoutWithMenuProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function LayoutWithMenu({ children, onLogout }: LayoutWithMenuProps) {

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
          <ThemeToggle />

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
      <main
        className="flex-1 p-4"
        style={{
          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fce9f82b5a9f24329aefbdd00cf992381%2F70f0901593b6483992345b178193357b)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {children}
      </main>
    </div>
  );
}
