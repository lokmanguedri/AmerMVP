'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function RotatingPart() {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5}>
                {/* Placeholder for a complex car part (e.g. abstract bumper/form) */}
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#1a1a1a"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.9}
                    roughness={0.1}
                    distort={0.2}
                    speed={1.5}
                />
            </mesh>
        </Float>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={500} color="#00f0ff" />
                    <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={500} color="white" />

                    <RotatingPart />

                    <Environment preset="city" />

                    {/* Fog for depth */}
                    <fog attach="fog" args={['#050505', 5, 15]} />

                </Suspense>
            </Canvas>

            {/* Overlay Gradient for seamless integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--carbon-black)] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
