import LevelSelection from '../LevelSelection';

export default function LevelSelectionExample() {
  const handleLevelSelect = (levelId: string) => {
    console.log('Level selected:', levelId);
  };

  const handleBack = () => {
    console.log('Back clicked');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return <LevelSelection subject="mathematics" onLevelSelect={handleLevelSelect} onBack={handleBack} onLogout={handleLogout} />;
}
