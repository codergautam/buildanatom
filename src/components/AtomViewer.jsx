import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
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
        <meshStandardMaterial color="blue" /> {/* Blue for electron */}
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

const constructNucleus = (protons, neutrons) => {
  const particles = [];
  let i = 0;

  // Deterministic placement of protons and neutrons
  while (i < protons) {
    particles.push({ color: 'red', type: 'proton' });
    i++;
  }

  i = 0; // Reset for neutrons
  while (i < neutrons) {
    particles.push({ color: 'black', type: 'neutron' });
    i++;
  }

  return particles;
};

const AtomViewer = ({ protons, neutrons, electrons }) => {
  const [enableSpin, setEnableSpin] = useState(true);
  const nucleusSize = Math.cbrt(protons + neutrons) * 0.5;
  const orbitControlsRef = useRef();
  const nucleusParticles = constructNucleus(protons, neutrons);

  useEffect(() => {
    if (!enableSpin && orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  }, [enableSpin])

  const shells = [];
  let e = electrons;
  for (let n = 1; e > 0; n++) {
    const capacity = 2 * n * n;
    const electronsInShell = Math.min(e, capacity);
    shells.push({ shellIndex: n, electronCount: electronsInShell });
    e -= electronsInShell;
  }

  return (
    <>
      <button onClick={() => setEnableSpin(!enableSpin)}>
        {enableSpin ? 'Disable' : 'Enable'} 3D
      </button>
      <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls ref={orbitControlsRef} enableRotate={enableSpin} />
        <Suspense fallback={null}>
          {/* Nucleus */}
          {nucleusParticles.map((particle, i) => {
            // Adjust for better positioning
            const angle = (Math.PI * 2 / nucleusParticles.length) * i;
            const distance = nucleusSize * 0.5;
            const x = distance * Math.cos(angle);
            const y = distance * Math.sin(angle);
            const z = i % 2 === 0 ? distance : -distance;

            return (
              <NucleusParticle
                key={`nucleus-particle-${i}`}
                position={[x, y, z]}
                color={particle.color}
              />
            );
          })}
          {/* Electron Shells */}
          {shells.map((shell, i) => (
            <ElectronShell key={`shell-${i}`} shellIndex={shell.shellIndex} electronCount={shell.electronCount} />
          ))}
        </Suspense>
      </Canvas>
    </>
  );
};

export default AtomViewer;