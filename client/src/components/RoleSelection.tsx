import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RoleSelectionProps {
  onRoleSelect: (role: "tutor" | "student") => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">{t('select_role')}</h1>
          <p className="text-muted-foreground">
            {t('role_description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
}