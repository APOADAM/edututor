import RoleSelection from '../RoleSelection';

export default function RoleSelectionExample() {
  const handleRoleSelect = (role: "tutor" | "student") => {
    console.log('Role selected:', role);
  };

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
}