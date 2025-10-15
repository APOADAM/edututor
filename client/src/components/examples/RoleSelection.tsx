import RoleSelection from '../RoleSelection';

export default function RoleSelectionExample() {
  const handleRoleSelect = (role: "tutor" | "student" | "creator") => {
    console.log('Role selected:', role);
  };
  const handleLogout = () => {
    console.log('Logout');
  }

  return <RoleSelection onRoleSelect={handleRoleSelect} onLogout={handleLogout} />;
}
