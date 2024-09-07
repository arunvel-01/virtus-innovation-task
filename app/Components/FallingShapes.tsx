// FallingShapes.tsx
import { RigidBody } from '@react-three/rapier';
import { Box, Sphere, Cone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

const FallingShapes = () => {
  const shapes = [Box, Sphere, Cone];
  const [randomShapes, setRandomShapes] = useState([]);

  // Generate random shapes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const randomSize = Math.random() * 2 + 0.5;
      setRandomShapes((prev) => [
        ...prev,
        {
          shape: randomShape,
          size: randomSize,
          position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5],
        },
      ]);
    }, 1000); // New shape every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {randomShapes.map((shapeData, idx) => (
        <RigidBody key={idx} position={shapeData.position}>
          <shapeData.shape args={[shapeData.size]} />
        </RigidBody>
      ))}
    </>
  );
};

export default FallingShapes;
