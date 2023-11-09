import { useState } from 'react';
import AtomViewer from './components/AtomViewer';
import AtomDetails from './components/AtomDetails';
import ControlPanel from './components/ControlPanel';

function App() {
  const [protons, setProtons] = useState(0);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(0);

  // Function to update protons, neutrons, and electrons
  const updateParticles = (particle, amount) => {
  if (particle === 'protons') {
    setProtons((prevProtons) => Math.max(0, prevProtons + amount));
  } else if (particle === 'neutrons') {
    setNeutrons((prevNeutrons) => Math.max(0, prevNeutrons + amount));
  } else if (particle === 'electrons') {
    setElectrons((prevElectrons) => Math.max(0, prevElectrons + amount));
  }
};

  return (
    <div>
      <ControlPanel updateParticles={updateParticles} />
      <AtomViewer protons={protons} neutrons={neutrons} electrons={electrons} />
      <AtomDetails protons={protons} neutrons={neutrons} electrons={electrons} />
    </div>
  );
}

export default App;
