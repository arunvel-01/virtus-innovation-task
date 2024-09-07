"use client"; // Ensures the component is a Client Component for Next.js

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Sphere, Cylinder, Box } from '@react-three/drei';
import { RigidBody, useRapier } from '@react-three/rapier';

const Car = () => {
  const carBodyRef = useRef(null);
  const wheelFrontRef = useRef(null);
  const wheelBackLeftRef = useRef(null);
  const wheelBackRightRef = useRef(null);

  const [direction, setDirection] = useState(new Vector3());
  const [isGameOver, setIsGameOver] = useState(false);
  const [keyState, setKeyState] = useState({ w: false, s: false });

  // Key down/up event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'w') setKeyState((prev) => ({ ...prev, w: true }));
      if (event.key === 's') setKeyState((prev) => ({ ...prev, s: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'w') setKeyState((prev) => ({ ...prev, w: false }));
      if (event.key === 's') setKeyState((prev) => ({ ...prev, s: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle mouse movement for direction
  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setDirection(new Vector3(mouseX, mouseY, 0).normalize()); // Normalize direction vector
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Movement logic: W to move forward, S to move backward
  useFrame(() => {
    if (!carBodyRef.current) return;

    const car = carBodyRef.current;
    let speed = 0;

    if (keyState.w) speed = 0.05;
    if (keyState.s) speed = -0.05;

    // Move the car along the calculated direction
    const translation = car.translation();
    translation.addScaledVector(direction, speed);
    car?.setTranslation(translation, true);
  });

  // Collision detection using Rapier's collision system
  useEffect(() => {
    if (!carBodyRef.current) return;

    const carBody = carBodyRef.current;

    const handleCollisionEnter = (event: any) => {
      setIsGameOver(true); // Game over on collision
    };

    carBody.addEventListener('collisionEnter', handleCollisionEnter);

    return () => {
      carBody.removeEventListener('collisionEnter', handleCollisionEnter);
    };
  }, []);

  return (
    <>
      {/* Car Body */}
      <RigidBody ref={carBodyRef}>
        <Box args={[2, 1, 4]} position={[0, 1, 0]} />
      </RigidBody>

      {/* Front Wheel */}
      <RigidBody ref={wheelFrontRef}>
        <Sphere args={[0.5, 32, 32]} position={[0, 0.5, -2]} />
      </RigidBody>

      {/* Back Wheels */}
      <RigidBody ref={wheelBackLeftRef}>
        <Cylinder args={[0.5, 0.5, 1]} position={[-1, 0.5, 2]} />
      </RigidBody>
      <RigidBody ref={wheelBackRightRef}>
        <Cylinder args={[0.5, 0.5, 1]} position={[1, 0.5, 2]} />
      </RigidBody>

      {/* Show "Game Over" when a collision occurs */}
      {isGameOver && (
        <div className="game-over-overlay">
          <h1>Game Over!</h1>
        </div>
      )}
    </>
  );
};

export default Car;
