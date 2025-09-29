import LessonContent from '../LessonContent';

const mockTheoryContent = {
  title: "Understanding Fractions",
  description: "Learn the basics of fractions and how they represent parts of a whole.",
  sections: [
    {
      heading: "What is a Fraction?",
      text: "A fraction represents a part of a whole. It consists of two numbers: a numerator (top number) and a denominator (bottom number).",
      examples: ["1/2 (one half)", "3/4 (three quarters)", "2/3 (two thirds)"]
    },
    {
      heading: "Reading Fractions",
      text: "The denominator tells us how many equal parts the whole is divided into, while the numerator tells us how many of those parts we're considering.",
      examples: ["In 3/5: denominator is 5, numerator is 3", "This means 3 out of 5 equal parts"]
    }
  ]
};

const mockExerciseContent = {
  title: "Fraction Practice",
  description: "Test your understanding of fractions with these multiple choice questions.",
  estimatedTime: "10 min",
  questions: [
    {
      question: "What fraction represents half of a circle?",
      options: ["1/4", "1/2", "3/4", "1/3"]
    },
    {
      question: "In the fraction 3/8, what is the denominator?",
      options: ["3", "8", "11", "5"]
    }
  ]
};

export default function LessonContentExample() {
  const theorySubchapter = {
    id: "fractions",
    title: "Understanding Fractions",
    type: "theory" as const,
    content: mockTheoryContent
  };

  const exerciseSubchapter = {
    id: "exercise-2",
    title: "Fraction Exercises", 
    type: "exercise" as const,
    content: mockExerciseContent
  };

  const handlePrevious = () => console.log('Previous clicked');
  const handleNext = () => console.log('Next clicked');

  return (
    <div className="h-screen">
      <LessonContent
        subchapter={theorySubchapter}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoBack={true}
        canGoForward={true}
      />
    </div>
  );
}