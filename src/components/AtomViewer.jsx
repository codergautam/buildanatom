import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Sphere, Torus } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

const NucleusParticle = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.2, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

const ElectronShell = ({ shellIndex, electronCount }) => {
  const radius = shellIndex * 1.5; // Increased radius for better visibility
  const angleStep = electronCount > 0 ? (Math.PI * 2) / electronCount : 0;
  const electrons = [];

  for (let i = 0; i < electronCount; i++) {
    const angle = i * angleStep;
    electrons.push(
      <Sphere
        key={`electron-${shellIndex}-${i}`}
        position={[radius * Math.cos(angle), radius * Math.sin(angle), 0]}
        args={[0.15, 32, 32]} // Increased electron size for better visibility
      >
        <meshStandardMaterial color="#0000FF" /> {/* Vibrant blue for electron */}
      </Sphere>
    );
  }

  return (
    <>
      <Torus args={[radius, 0.05, 16, 100]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="lightblue" transparent={true} opacity={0.5} />
      </Torus>
      {electrons}
    </>
  );
};


const AtomViewer = ({ protons, neutrons, electrons }) => {
  const nucleusSize = Math.cbrt(protons + neutrons) * 0.5;

  const shells = [];
  let e = electrons;
  for (let n = 1; e > 0; n++) {
    const capacity = 2 * n * n;
    const electronsInShell = Math.min(e, capacity);
    shells.push({ shellIndex: n, electronCount: electronsInShell });
    e -= electronsInShell;
  }

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <OrbitControls />
      <Suspense fallback={null}>
        {/* Nucleus */}
        {[...Array(protons + neutrons)].map((_, i) => {
          // Ensure that random values do not result in positions outside the nucleusSize
          const getPosition = () => (Math.random() - 0.5) * nucleusSize * 2;
          return (
            <NucleusParticle
  key={`nucleus-particle-${i}`}
  position={[getPosition(), getPosition(), getPosition()]}
  color={i < protons ? 'red' : 'grey'} // Use 'red' for protons and 'grey' for neutrons
/>
          );
        })}
        {/* Electron Shells */}
        {shells.map((shell, i) => (
          <ElectronShell key={`shell-${i}`} shellIndex={shell.shellIndex} electronCount={shell.electronCount} />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default AtomViewer;
