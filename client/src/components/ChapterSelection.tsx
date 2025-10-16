import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import LayoutWithMenu from "@/components/LayoutWithMenu";
import LeftSidebar, { User } from "@/components/LeftSidebar";
import RightSidebar, { Class } from "@/components/RightSidebar";
import ClassActionsModal from "@/components/ClassActionsModal";

// Mock data
const chapters = [
  { id: "numbers", name: "Basic Numbers", description: "Learn about whole numbers, fractions, and decimals", lessons: 5, duration: "45 min", progress: 100, isUnlocked: true, isCompleted: true },
  { id: "addition", name: "Addition & Subtraction", description: "Master the fundamentals of adding and subtracting", lessons: 7, duration: "60 min", progress: 80, isUnlocked: true, isCompleted: false },
  { id: "multiplication", name: "Multiplication", description: "Learn multiplication tables and techniques", lessons: 6, duration: "50 min", progress: 0, isUnlocked: true, isCompleted: false },
  { id: "division", name: "Division", description: "Understand division and its relationship to multiplication", lessons: 6, duration: "55 min", progress: 0, isUnlocked: false, isCompleted: false }
];

interface ChapterSelectionProps {
  subject: string;
  level: string;
  onChapterSelect: (chapterId: string) => void;
  onBack: () => void;
  onLogout: () => void; // για να περάσουμε στο LayoutWithMenu
}

export default function ChapterSelection({ subject, level, onChapterSelect, onBack, onLogout }: ChapterSelectionProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Υπολογίζουμε συνολικό progress των chapters
  const totalProgress = chapters.reduce((sum, ch) => sum + ch.progress, 0) / chapters.length;

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

  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleGoLive = () => {
    console.log("Going live on class:", selectedClass?.name);
  };

  const handleShowMembers = () => {
    console.log("Showing members for class:", selectedClass?.name);
  };

  const handleAddConnectionToClass = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user && selectedClass) {
      console.log(`Added ${user.name} to class ${selectedClass.name}`);
      setClasses(classes.map(c =>
        c.id === selectedClass.id
          ? { ...c, studentsCount: c.studentsCount + 1 }
          : c
      ));
    }
  };

  const handleDeleteClass = () => {
    if (selectedClass) {
      setClasses(classes.filter(c => c.id !== selectedClass.id));
      setIsModalOpen(false);
    }
  };

  return (
    <LayoutWithMenu
      onLogout={onLogout}
      pageName={`${subject} - ${level}`}
      showProgress={true}
      progressValue={totalProgress}
      homeButtonOnClick={onBack}
    >
      <div className="flex h-full">
        <LeftSidebar users={users} onAddUser={handleAddUser} />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold capitalize">{subject} - {level}</h2>
              <p className="text-muted-foreground">Select a chapter to begin your learning journey</p>
            </div>

            <div className="grid gap-4">
              {chapters.map((chapter, index) => (
                <Card
                  key={chapter.id}
                  className={`transition-all ${chapter.isUnlocked ? "hover-elevate cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                  onClick={() => chapter.isUnlocked && onChapterSelect(chapter.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{chapter.name}</CardTitle>
                          <CardDescription>{chapter.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={chapter.isCompleted ? "default" : "secondary"}>
                        {chapter.isCompleted ? "Completed" : chapter.isUnlocked ? "Available" : "Locked"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                      <span>{chapter.lessons} lessons • {chapter.duration}</span>
                      <span>{chapter.progress}% complete</span>
                    </div>
                    <Progress value={chapter.progress} className="mb-4" />
                    <Button
                      variant={chapter.isCompleted ? "secondary" : "default"}
                      disabled={!chapter.isUnlocked}
                      className="w-full md:w-auto"
                    >
                      {chapter.isCompleted ? "Review Chapter" : "Start Chapter"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <RightSidebar classes={classes} onAddClass={handleAddClass} onClassClick={handleClassClick} />
        <ClassActionsModal
          classItem={selectedClass}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGoLive={handleGoLive}
          onShowMembers={handleShowMembers}
          onAddConnection={handleAddConnectionToClass}
          onDeleteClass={handleDeleteClass}
          availableUsers={users}
        />
      </div>
    </LayoutWithMenu>
  );
}
