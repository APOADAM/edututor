import { ThemeProvider } from '../ThemeProvider';
import { ThemeToggle } from '../ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ThemeDemo() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Theme Toggle Example</CardTitle>
          <ThemeToggle />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Click the theme toggle button to switch between light and dark modes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ThemeToggleExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeDemo />
    </ThemeProvider>
  );
}