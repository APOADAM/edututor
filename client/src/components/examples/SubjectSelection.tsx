import SubjectSelection from '../SubjectSelection';

export default function SubjectSelectionExample() {
  const handleSubjectSelect = (subjectId: string) => {
    console.log('Subject selected:', subjectId);
  };

  return <SubjectSelection userRole="student" onSubjectSelect={handleSubjectSelect} />;
}