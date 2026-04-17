"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ── Yard lines ───────────────────────────────────────── */
function YardLines() {
  const lines = useMemo(() => {
    const arr: { z: number; major: boolean }[] = [];
    for (let i = -5; i <= 5; i++) {
      arr.push({ z: i * 4.572, major: true }); // every 10 yards
    }
    for (let i = -50; i <= 50; i++) {
      if (i % 10 !== 0) arr.push({ z: i * 0.4572, major: false });
    }
    return arr;
  }, []);

  return (
    <group>
      {lines
        .filter((l) => l.major)
        .map((line, i) => (
          <mesh key={i} position={[0, 0.02, line.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[26.5, 0.08]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
          </mesh>
        ))}
      {/* Hash marks */}
      {lines
        .filter((l) => !l.major)
        .map((line, i) => (
          <group key={`h${i}`}>
            <mesh position={[-3, 0.02, line.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.6, 0.04]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </mesh>
            <mesh position={[3, 0.02, line.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.6, 0.04]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </mesh>
          </group>
        ))}
    </group>
  );
}

/* ── End zones ────────────────────────────────────────── */
function EndZones() {
  return (
    <group>
      <mesh position={[0, 0.01, -27.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26.5, 8.5]} />
        <meshStandardMaterial color="#b8860b" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, 0.01, 27.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26.5, 8.5]} />
        <meshStandardMaterial color="#b8860b" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ── Sidelines ────────────────────────────────────────── */
function Sidelines() {
  return (
    <group>
      <mesh position={[-13.25, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 60]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh position={[13.25, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 60]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ── Goal posts ───────────────────────────────────────── */
function GoalPost({ z }: { z: number }) {
  const postColor = "#F5A623";
  return (
    <group position={[0, 0, z]}>
      {/* Main upright */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
        <meshStandardMaterial color={postColor} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 5.6, 8]} />
        <meshStandardMaterial color={postColor} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Fork uprights */}
      <mesh position={[-2.8, 6.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color={postColor} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.8, 6.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color={postColor} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ── Floating football ────────────────────────────────── */
function FloatingFootball() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref} position={[0, 4, 0]}>
        <sphereGeometry args={[0.5, 16, 12]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.6}
          metalness={0.1}
          emissive="#F5A623"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

/* ── Stadium lights ───────────────────────────────────── */
function StadiumLights() {
  return (
    <group>
      <pointLight position={[-15, 15, -20]} intensity={30} color="#F5A623" distance={60} />
      <pointLight position={[15, 15, 20]} intensity={30} color="#00E5FF" distance={60} />
      <pointLight position={[0, 20, 0]} intensity={15} color="#ffffff" distance={50} />
      <spotLight
        position={[0, 25, -10]}
        angle={0.6}
        penumbra={0.8}
        intensity={40}
        color="#F5A623"
        castShadow={false}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

/* ── Camera rig ───────────────────────────────────────── */
function CameraRig() {
  const camRef = useRef<THREE.PerspectiveCamera>(null!);
  useFrame((state) => {
    if (!camRef.current) return;
    const t = state.clock.elapsedTime * 0.08;
    camRef.current.position.x = Math.sin(t) * 18;
    camRef.current.position.z = Math.cos(t) * 25;
    camRef.current.position.y = 8 + Math.sin(t * 2) * 1.5;
    camRef.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={camRef} makeDefault fov={50} position={[0, 8, 25]} />;
}

/* ── Turf grid glow effect ────────────────────────────── */
function TurfGlow() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[30, 64]} />
      <meshStandardMaterial
        color="#0d3b1e"
        emissive="#2EC4B6"
        emissiveIntensity={0.03}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

/* ── Main Scene ───────────────────────────────────────── */
function Scene() {
  return (
    <>
      <CameraRig />
      <fog attach="fog" args={["#0A0A0F", 15, 55]} />
      <ambientLight intensity={0.15} />
      <StadiumLights />
      <TurfGlow />
      <YardLines />
      <EndZones />
      <Sidelines />
      <GoalPost z={-31} />
      <GoalPost z={31} />
      <FloatingFootball />
    </>
  );
}

/* ── Exported component ───────────────────────────────── */
export function FootballField3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
