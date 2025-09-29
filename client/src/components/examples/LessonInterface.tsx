import { ThemeProvider } from '../ThemeProvider';
import LessonInterface from '../LessonInterface';

export default function LessonInterfaceExample() {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <ThemeProvider defaultTheme="light">
      <LessonInterface userRole="tutor" onLogout={handleLogout} />
    </ThemeProvider>
  );
}