import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExerciseHintProps {
  questionIndex: number;
  hintContent: {
    title: string;
    description: string;
    theory: string[];
    examples?: string[];
  };
}

export default function ExerciseHint({ questionIndex, hintContent }: ExerciseHintProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="ml-auto"
          data-testid={`button-hint-${questionIndex}`}
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          {t('show_hint')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {t('theory_help')}: {hintContent.title}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-hint"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            {hintContent.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {hintContent.theory.map((point, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed">{point}</p>
            </div>
          ))}
          
          {hintContent.examples && hintContent.examples.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">{t('examples')}</h4>
              <div className="space-y-2">
                {hintContent.examples.map((example, index) => (
                  <div key={index} className="p-3 bg-accent/30 rounded border-l-4 border-primary">
                    <code className="text-sm font-mono">{example}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={() => setIsOpen(false)} data-testid="button-got-it">
            {t('close_hint')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}