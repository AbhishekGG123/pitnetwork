"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, Cloud, Stars, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// A simple voxel terrain generator placeholder
function Terrain() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  const blocks = useMemo(() => {
    const temp = [];
    for (let x = -20; x < 20; x++) {
      for (let z = -20; z < 20; z++) {
        // Simple noise representation
        const y = Math.floor(Math.sin(x / 5) * Math.cos(z / 5) * 3);
        temp.push({ x, y, z });
      }
    }
    return temp;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      blocks.forEach((pos, i) => {
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" /> {/* Placeholder color */}
    </instancedMesh>
  );
}

function FloatingIsland() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1 + 5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, 5, -15]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[5, 0, 10, 8]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      {/* Simple Tree */}
      <mesh position={[0, 6, 0]} castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 8, 0]} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#059669" />
      </mesh>
    </group>
  );
}

function SceneCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (cameraRef.current) {
      // Gentle floating and subtle mouse response
      const mouseX = (state.pointer.x * 2);
      const mouseY = (state.pointer.y * 2);

      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouseX, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 10 - mouseY, 0.05);
      cameraRef.current.lookAt(0, 5, -15);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 15]} fov={60} />;
}

export default function MinecraftWorld() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <SceneCamera />
        <color attach="background" args={['#0f172a']} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <fog attach="fog" args={['#0f172a', 10, 40]} />

        <group position={[0, -2, 0]}>
          <Terrain />
          <FloatingIsland />
        </group>
      </Canvas>
    </div>
  );
}
