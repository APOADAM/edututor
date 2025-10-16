import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Code, Languages, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LayoutWithMenu from "@/components/LayoutWithMenu";
import LeftSidebar, { User } from "@/components/LeftSidebar";
import RightSidebar, { Class } from "@/components/RightSidebar";
import ClassActionsModal from "@/components/ClassActionsModal";

const getSubjects = (t: any) => [
  {
    id: "math",
    name: t('mathematics'),
    description: t('math_description'),
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-700"
  },
  {
    id: "programming",
    name: t('programming'),
    description: t('programming_description'),
    icon: Code,
    color: "bg-green-500/10 text-green-700"
  },
  {
    id: "languages",
    name: t('languages'),
    description: t('languages_description'),
    icon: Languages,
    color: "bg-purple-500/10 text-purple-700"
  }
];

interface SubjectSelectionProps {
  userRole: "tutor" | "student" | "creator";
  onSubjectSelect: (subjectId: string) => void;
  onLogout: () => void;
}

export default function SubjectSelection({ userRole, onSubjectSelect , onLogout }: SubjectSelectionProps) {
  const { t } = useTranslation();
  const subjects = getSubjects(t);
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          minHeight: '937px',
          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fce9f82b5a9f24329aefbdd00cf992381%2F70f0901593b6483992345b178193357b)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">{t('choose_subject')}</h1>
            <p className="text-muted-foreground">
              {userRole === "tutor" ? t('subject_description_tutor') : t('subject_description_student')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Card
                  key={subject.id}
                  className="hover-elevate cursor-pointer transition-all group"
                  onClick={() => onSubjectSelect(subject.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${subject.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      data-testid={`button-select-${subject.id}`}
                    >
                      {t('start_learning')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
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
