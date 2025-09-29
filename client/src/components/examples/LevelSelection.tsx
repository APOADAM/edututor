import LevelSelection from '../LevelSelection';

export default function LevelSelectionExample() {
  const handleLevelSelect = (levelId: string) => {
    console.log('Level selected:', levelId);
  };

  const handleBack = () => {
    console.log('Back clicked');
  };

  return <LevelSelection subject="mathematics" onLevelSelect={handleLevelSelect} onBack={handleBack} />;
}