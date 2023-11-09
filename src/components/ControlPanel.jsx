const ControlPanel = ({ updateParticles }) => {
  return (
    <div>
      <button onClick={() => updateParticles('protons', 1)}>Add Proton</button>
      <button onClick={() => updateParticles('protons', -1)}>Remove Proton</button>

      <button onClick={() => updateParticles('neutrons', 1)}>Add Neutron</button>
      <button onClick={() => updateParticles('neutrons', -1)}>Remove Neutron</button>

      <button onClick={() => updateParticles('electrons', 1)}>Add Electron</button>
      <button onClick={() => updateParticles('electrons', -1)}>Remove Electron</button>
    </div>
  );
};

export default ControlPanel;
