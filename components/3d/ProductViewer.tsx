'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';

// Geometry component to render different shapes based on type
const ModelGeometry = ({ type }: { type: string }) => {
    // Normalize type to handle plural/singular differences if necessary
    const normalizedType = type.toLowerCase();

    if (normalizedType.includes('headlight')) {
        return <boxGeometry args={[2, 1, 0.5]} />;
    } else if (normalizedType.includes('splitter') || normalizedType.includes('lip')) {
        return <planeGeometry args={[3, 1]} />;
    } else if (normalizedType.includes('spoiler')) {
        return <boxGeometry args={[3, 0.1, 0.5]} />;
    } else {
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
    }
};

function ProductModel({ type }: { type: string }) {
    const isLighting = type.includes('headlight') || type.includes('tail');

    return (
        <mesh castShadow receiveShadow>
            <ModelGeometry type={type} />
            <meshStandardMaterial
                color="#111"
                roughness={0.2}
                metalness={0.8}
                envMapIntensity={1}
            />
            {isLighting && (
                <mesh position={[0, 0, 0.26]}>
                    <planeGeometry args={[1.8, 0.8]} />
                    <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} toneMapped={false} />
                </mesh>
            )}
        </mesh>
    );
}

export function ProductViewer({ modelType }: { modelType: string }) {
    return (
        <div className="w-full h-[500px] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden relative cursor-move">
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs text-orange-600 border border-orange-200 font-bold shadow-sm">
                3D INTERACTIVE
            </div>

            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <ProductModel type={modelType} />
                    </Stage>
                    <OrbitControls autoRotate autoRotateSpeed={2} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                </Suspense>
            </Canvas>
        </div>
    );
}
