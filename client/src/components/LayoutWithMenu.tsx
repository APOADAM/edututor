import React from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, Settings, Home } from "lucide-react";
import { useTheme } from "next-themes";  // <-- έρχεται με το shadcn setup

interface LayoutWithMenuProps {
  children: React.ReactNode;
  onLogout: () => void;
  pageName?: string;
  showProgress?: boolean;
  progressValue?: number;
  homeButtonOnClick?: () => void;
}

export default function LayoutWithMenu({
  children,
  onLogout,
  pageName,
  showProgress = false,
  progressValue = 0,
  homeButtonOnClick,
}: LayoutWithMenuProps) {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="w-full bg-background p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          {homeButtonOnClick && (
            <Button variant="ghost" size="icon" onClick={homeButtonOnClick}>
              <Home className="w-5 h-5" />
            </Button>
          )}
          <h1 className="font-bold text-lg">{pageName || "EduTutor"}</h1>
        </div>

        {/* Right menu */}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            <ThemeToggle />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Optional Progress */}
      {showProgress && (
        <div className="px-6 py-2 border-b">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
