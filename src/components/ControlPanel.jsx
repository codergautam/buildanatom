const ControlPanel = ({ updateParticles }) => {
  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700" onClick={() => updateParticles('protons', 1)}>Add Proton</button>
      <button className="bg-red-200 text-white font-bold py-2 px-4 rounded hover:bg-red-500" onClick={() => updateParticles('protons', -1)}>Remove Proton</button>

      <button className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700" onClick={() => updateParticles('neutrons', 1)}>Add Neutron</button>
      <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-black" onClick={() => updateParticles('neutrons', -1)}>Remove Neutron</button>

      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={() => updateParticles('electrons', 1)}>Add Electron</button>
      <button className="bg-blue-200 text-white font-bold py-2 px-4 rounded hover:bg-blue-500" onClick={() => updateParticles('electrons', -1)}>Remove Electron</button>
    </div>
  );
};

export default ControlPanel;