import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Trophy, Clock, BookOpen } from "lucide-react";
import { levelsBySubject } from "@/components/levels";
import LayoutWithMenu from "@/components/LayoutWithMenu";
import LeftSidebar, { User } from "@/components/LeftSidebar";
import RightSidebar, { Class } from "@/components/RightSidebar";
import ClassActionsModal from "@/components/ClassActionsModal";

type SubjectKey = keyof typeof levelsBySubject;

interface Level {
  id: string;
  name: string;
  description: string;
  chapters: number;
  estimatedTime: string;
  progress: number;
  difficulty: string;
}

interface LevelSelectionProps {
  subject: string; // Θα πρέπει να ταιριάζει με τα keys του levelsBySubject
  onLevelSelect: (levelId: string) => void;
  onBack: () => void;
  onLogout: () => void; // <-- προσθέτουμε εδώ
}

export default function LevelSelection({ subject, onLevelSelect, onBack , onLogout }: LevelSelectionProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Type-safe access
  const levels: Level[] = levelsBySubject[subject as SubjectKey] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-700";
      case "Medium": return "bg-yellow-500/10 text-yellow-700";
      case "Hard": return "bg-red-500/10 text-red-700";
      default: return "bg-gray-500/10 text-gray-700";
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
      <LayoutWithMenu onLogout={onLogout}>
    <div className="flex h-full">
      <LeftSidebar users={users} onAddUser={handleAddUser} />
      <div
        className="flex-1 min-h-screen bg-background p-6"
        style={{
          minHeight: '989px',
          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fce9f82b5a9f24329aefbdd00cf992381%2F70f0901593b6483992345b178193357b)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold capitalize">{subject} - Select Level</h1>
              <p className="text-muted-foreground">
                Choose your skill level to get started with personalized content
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {levels.map((level: Level) => (
              <Card
                key={level.id}
                className="hover-elevate cursor-pointer transition-all"
                onClick={() => onLevelSelect(level.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{level.name}</CardTitle>
                        <CardDescription>{level.description}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getDifficultyColor(level.difficulty)}
                    >
                      {level.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{level.chapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{level.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Progress: {level.progress}%</span>
                    </div>
                  </div>
                  <Progress value={level.progress} className="mb-4" />
                  <Button
                    className="w-full md:w-auto"
                    data-testid={`button-select-${level.id}`}
                  >
                    Start {level.name} Level
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
