import LessonSidebar from '../LessonSidebar';

export default function LessonSidebarExample() {
  const handleSubchapterSelect = (id: string) => {
    console.log('Subchapter selected:', id);
  };

  return (
    <div className="h-screen p-4 w-80">
      <LessonSidebar 
        currentSubchapter="fractions" 
        onSubchapterSelect={handleSubchapterSelect} 
      />
    </div>
  );
}