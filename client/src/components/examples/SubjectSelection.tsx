import SubjectSelection from '../SubjectSelection';

export default function SubjectSelectionExample() {
  const handleSubjectSelect = (subjectId: string) => {
    console.log('Subject selected:', subjectId);
  };
  const handleLogout = () => {
    console.log('Logout');
  }

  return <SubjectSelection userRole="student" onSubjectSelect={handleSubjectSelect} onLogout={handleLogout} />;
}
