import { ThemeProvider } from '../ThemeProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ThemeDemo() {
  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Theme Provider Example</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This demonstrates the theme provider working with both light and dark modes.
          </p>
          <Button>Sample Button</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeDemo />
    </ThemeProvider>
  );
}