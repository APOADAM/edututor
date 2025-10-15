import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import LayoutWithMenu from "@/components/LayoutWithMenu";

interface RoleSelectionProps {
  onRoleSelect: (role: "tutor" | "student" | "creator") => void;
  onLogout: () => void;
}

export default function RoleSelection({ onRoleSelect ,onLogout }: RoleSelectionProps) {
  const { t } = useTranslation();
  return (
    <LayoutWithMenu onLogout={onLogout}>
    <div
      className="min-h-screen flex items-center justify-center bg-background p-4"
      style={{
        backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fce9f82b5a9f24329aefbdd00cf992381%2F70f0901593b6483992345b178193357b)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">{t('select_role')}</h1>
          <p className="text-muted-foreground">
            {t('role_description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover-elevate cursor-pointer transition-all" onClick={() => onRoleSelect("tutor")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>{t('im_tutor')}</CardTitle>
              <CardDescription>
                {t('tutor_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                data-testid="button-select-tutor"
              >
                {t('continue_as_tutor')}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer transition-all" onClick={() => onRoleSelect("student")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle>{t('im_student')}</CardTitle>
              <CardDescription>
                {t('student_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                data-testid="button-select-student"
              >
                {t('continue_as_student')}
              </Button>
            </CardContent>
          </Card>
          <Card className="hover-elevate cursor-pointer transition-all" onClick={() => onRoleSelect("creator")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-accent/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-accent-foreground"><path d="M12 3a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V4a1 1 0 0 1 1-1z"/></svg>
              </div>
              <CardTitle>Course Creator</CardTitle>
              <CardDescription>Design and build new courses and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                data-testid="button-select-course-creator"
              >
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </LayoutWithMenu>
  );
}
