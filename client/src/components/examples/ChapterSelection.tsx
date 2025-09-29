import ChapterSelection from '../ChapterSelection';

export default function ChapterSelectionExample() {
  const handleChapterSelect = (chapterId: string) => {
    console.log('Chapter selected:', chapterId);
  };

  const handleBack = () => {
    console.log('Back clicked');
  };

  return (
    <ChapterSelection 
      subject="mathematics" 
      level="beginner" 
      onChapterSelect={handleChapterSelect} 
      onBack={handleBack} 
    />
  );
}