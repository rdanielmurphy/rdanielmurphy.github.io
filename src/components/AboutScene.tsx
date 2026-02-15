"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useGLTF } from "@react-three/drei";
import { JSX, Suspense, useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── 3D Objects ─────────────────────────────────────────── */

const BRAND = "#6366f1";
const BRAND_DARK = "#4f46e5";

function Platform() {
  return (
    <mesh rotation={[-Math.PI, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <cylinderGeometry args={[3.5, 3.5, 0.08, 64]} />
      <meshStandardMaterial color="#1e1e2e" />
    </mesh>
  );
}

function Desk() {
  return (
    <group position={[0, 0, 0]}>
      {/* Tabletop */}
      <RoundedBox args={[2.4, 0.08, 1.2]} position={[0, 0.75, 0]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color="#3e2723" />
      </RoundedBox>
      {/* Legs */}
      {[
        [-1.05, 0.37, -0.48],
        [1.05, 0.37, -0.48],
        [-1.05, 0.37, 0.48],
        [1.05, 0.37, 0.48],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
          <meshStandardMaterial color="#2e1c14" />
        </mesh>
      ))}
    </group>
  );
}

function Globe(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/Globe.glb");
  return (
    <group position={[0.5, 0.8, -0.2]} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Globe as THREE.Mesh).geometry}
        material={materials.Material}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Globe.glb");

function Hammer() {
  return (
    <group position={[0.85, 0.82, -0.3]} rotation={[1.5, -0.1, 0.00]}>
      {/* Handle - wooden */}
      <mesh castShadow>
        <cylinderGeometry args={[0.012, 0.014, 0.35, 8]} />
        <meshStandardMaterial color="#a0723a" roughness={0.7} />
      </mesh>
      {/* Handle grip lines */}
      {[-0.1, -0.06, -0.02, 0.02].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.012, 8]} />
          <meshStandardMaterial color="#8b5e30" roughness={0.8} />
        </mesh>
      ))}
      {/* Head - steel */}
      <group position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main striking face */}
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Claw side */}
        <mesh position={[0, -0.06, 0]} castShadow>
          <boxGeometry args={[0.04, 0.03, 0.05]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Claw fork */}
        <mesh position={[0.012, -0.085, 0]}>
          <boxGeometry args={[0.012, 0.03, 0.045]} />
          <meshStandardMaterial color="#777" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.012, -0.085, 0]}>
          <boxGeometry args={[0.012, 0.03, 0.045]} />
          <meshStandardMaterial color="#777" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function Laptop() {
  return (
    <group position={[0, 0.83, -0.05]}>
      {/* Base */}
      <RoundedBox args={[0.7, 0.03, 0.45]} radius={0.01} castShadow>
        <meshStandardMaterial color="#2d2d2d" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      {/* Keyboard area */}
      <mesh position={[0, 0.018, 0.02]}>
        <boxGeometry args={[0.58, 0.005, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Screen */}
      <group position={[0, 0.27, -0.22]} rotation={[0.3, 0, 0]}>
        <RoundedBox args={[0.68, 0.45, 0.02]} radius={0.01} castShadow>
          <meshStandardMaterial color="#2d2d2d" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Screen glow */}
        <mesh position={[0, 0.01, 0.012]}>
          <planeGeometry args={[0.6, 0.37]} />
          <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function CoffeeMug() {
  return (
    <group position={[0.85, 0.87, 0.2]}>
      {/* Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.065, 0]}>
        <cylinderGeometry args={[0.058, 0.058, 0.02, 16]} />
        <meshStandardMaterial color="#3e1c00" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.06, 0, 0]} rotation={[0, Math.PI * 2, -Math.PI / 2]}>
        <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  );
}

function Surfboard() {
  const boardShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Surfboard outline: pointed nose, wide middle, rounded tail
    // Board runs along Y axis, centered at 0
    const length = 1.4;
    const halfLen = length / 2;
    const maxWidth = 0.14;

    // Start at nose (top, pointed)
    shape.moveTo(0, halfLen);
    // Right side: nose curves out to widest point (slightly forward of center), then tapers to tail
    shape.bezierCurveTo(
      0.06, halfLen - 0.1,    // nose control
      maxWidth, halfLen - 0.35, // widening
      maxWidth, 0.05            // max width near center
    );
    shape.bezierCurveTo(
      maxWidth, -0.25,          // keep width
      0.1, -halfLen + 0.1,     // taper toward tail
      0.06, -halfLen            // tail right
    );
    // Tail (slight squash/fish shape)
    shape.bezierCurveTo(
      0.02, -halfLen - 0.03,
      -0.02, -halfLen - 0.03,
      -0.06, -halfLen
    );
    // Left side mirrors
    shape.bezierCurveTo(
      -0.1, -halfLen + 0.1,
      -maxWidth, -0.25,
      -maxWidth, 0.05
    );
    shape.bezierCurveTo(
      -maxWidth, halfLen - 0.35,
      -0.06, halfLen - 0.1,
      0, halfLen
    );
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 3,
    curveSegments: 24,
  }), []);

  return (
    <group position={[1.8, 0.55, -1.0]} rotation={[0, -0.4, 0.15]}>
      {/* Main board - blue */}
      <mesh castShadow rotation={[0, 0, 0]} position={[0, 0, -0.017]}>
        <extrudeGeometry args={[boardShape, extrudeSettings]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* White center stringer */}
      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[0.006, 1.2, 0.003]} />
        <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
      </mesh>

      {/* Grip pad (traction pad) on bottom/tail - black */}
      <mesh position={[0, -0.38, 0.022]}>
        <boxGeometry args={[0.2, 0.28, .03]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>
      {/* Grip pad grooves (horizontal lines) */}
      {[-0.48, -0.44, -0.40, -0.36, -0.32, -0.28].map((y, i) => (
        <mesh key={i} position={[0, y, 0.027]}>
          <boxGeometry args={[0.18, 0.006, 0.03]} />
          <meshStandardMaterial color="#312e2e" roughness={1} />
        </mesh>
      ))}
      {/* Grip pad center split */}
      <mesh position={[0, -0.38, 0.027]}>
        <boxGeometry args={[0.005, 0.26, 0.003]} />
        <meshStandardMaterial color="#2a2a2a" roughness={1} />
      </mesh>
      {/* Grip pad tail kick */}
      <mesh position={[0, -0.53, 0.024]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.16, 0.06, 0.008]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>

      {/* Center fin */}
      <mesh position={[0, -0.45, -0.04]} rotation={[0.15, 0, 0]}>
        <extrudeGeometry args={[(() => {
          const s = new THREE.Shape();
          s.moveTo(0, 0);
          s.bezierCurveTo(0.025, 0.06, 0.015, 0.1, 0, 0.1);
          s.bezierCurveTo(-0.015, 0.1, -0.025, 0.06, 0, 0);
          return s;
        })(), { depth: 0.004, bevelEnabled: false }]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Side fins */}
      <mesh position={[0.04, -0.35, -0.03]} rotation={[0.15, 0.2, 0]}>
        <extrudeGeometry args={[(() => {
          const s = new THREE.Shape();
          s.moveTo(0, 0);
          s.bezierCurveTo(0.018, 0.04, 0.01, 0.07, 0, 0.07);
          s.bezierCurveTo(-0.01, 0.07, -0.018, 0.04, 0, 0);
          return s;
        })(), { depth: 0.003, bevelEnabled: false }]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.04, -0.35, -0.03]} rotation={[0.15, -0.2, 0]}>
        <extrudeGeometry args={[(() => {
          const s = new THREE.Shape();
          s.moveTo(0, 0);
          s.bezierCurveTo(0.018, 0.04, 0.01, 0.07, 0, 0.07);
          s.bezierCurveTo(-0.01, 0.07, -0.018, 0.04, 0, 0);
          return s;
        })(), { depth: 0.003, bevelEnabled: false }]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-0.9, 0.79, 0.3]}>
      {/* Pot */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
        <meshStandardMaterial color="#d4845a" />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.02, 8]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Leaves */}
      {[0, 0.8, 1.6, 2.4, 3.2, 4.0].map((rot, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(rot) * 0.04,
            0.2 + i * 0.02,
            Math.sin(rot) * 0.04,
          ]}
          rotation={[0.3 * Math.cos(rot), rot, 0.3 * Math.sin(rot)]}
        >
          <sphereGeometry args={[0.045, 6, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#2d8a4e" : "#38a169"} />
        </mesh>
      ))}
      {/* Stem */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 4]} />
        <meshStandardMaterial color="#2d6a30" />
      </mesh>
    </group>
  );
}

function Book({ position, rotation, coverColor, pageColor = "#f5f0e8", width = 0.2, height = 0.05, depth = 0.14, spineLabel }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  coverColor: string;
  pageColor?: string;
  width?: number;
  height?: number;
  depth?: number;
  spineLabel?: string;
}) {
  const spineWidth = 0.006;
  const coverThickness = 0.006;
  const pageInset = 0.012;
  const pageHeight = height - coverThickness * 2;

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Top cover */}
      <mesh position={[0, height / 2 - coverThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, coverThickness, depth]} />
        <meshStandardMaterial color={coverColor} roughness={0.6} />
      </mesh>
      {/* Bottom cover */}
      <mesh position={[0, -height / 2 + coverThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, coverThickness, depth]} />
        <meshStandardMaterial color={coverColor} roughness={0.6} />
      </mesh>
      {/* Spine */}
      <mesh position={[-width / 2 + spineWidth / 2, 0, 0]} castShadow>
        <boxGeometry args={[spineWidth, height, depth]} />
        <meshStandardMaterial color={coverColor} roughness={0.5} />
      </mesh>
      {/* Pages block */}
      <mesh position={[pageInset / 2, 0, 0]}>
        <boxGeometry args={[width - spineWidth - pageInset, pageHeight, depth - pageInset * 2]} />
        <meshStandardMaterial color={pageColor} roughness={0.9} />
      </mesh>
      {/* Spine accent stripe */}
      <mesh position={[-width / 2 + 0.001, 0, 0]}>
        <boxGeometry args={[0.002, height * 0.3, depth * 0.6]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Barbell() {
  const barColor = "#c0c0c0";
  const plateColor = "#222";
  const collarColor = "#888";
  return (
    <group position={[-1.5, .25, 1.2]} rotation={[1.58, 0.6, 0]}>
      {/* Bar */}
      <mesh castShadow>
        <cylinderGeometry args={[.015, 0.015, 1.5, 12]} />
        <meshStandardMaterial color={barColor} metalness={1} roughness={0.25} />
      </mesh>
      {/* Knurling (center grip texture) */}
      <mesh>
        <cylinderGeometry args={[0.014, 0.014, 0.3, 8]} />
        <meshStandardMaterial color="#aaa" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Left plates */}
      <mesh position={[0, -0.49, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.25, 0.04, 16]} />
        <meshStandardMaterial color={plateColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.47, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      {/* Left collar */}
      <mesh position={[0, -0.44, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
        <meshStandardMaterial color={collarColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Right plates */}
      <mesh position={[0, 0.49, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.25, 0.04, 16]} />
        <meshStandardMaterial color={plateColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.47, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      {/* Right collar */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
        <meshStandardMaterial color={collarColor} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Books() {
  return (
    <group position={[-0.55, 0.83, -0.25]}>
      <Book position={[0, 0, 0]} coverColor="#c53030" width={0.22} height={0.055} depth={0.15} />
      <Book position={[0.01, 0.055, 0.005]} rotation={[0, 0.08, 0]} coverColor={BRAND} width={0.2} height={0.05} depth={0.14} />
      <Book position={[-0.005, 0.105, -0.003]} rotation={[0, -0.05, 0]} coverColor="#b7791f" width={0.18} height={0.045} depth={0.13} />
    </group>
  );
}

function Mountains() {
  const peaks = useMemo(() => [
    { pos: [0, -0.3, -6] as const, scale: [4, 2.5, 3] as const, color: "#4a5568" },
    { pos: [-3, -0.3, -7] as const, scale: [3.5, 3, 2.5] as const, color: "#556270" },
    { pos: [3.5, -0.3, -7.5] as const, scale: [5, 3.5, 3] as const, color: "#4a5568" },
    { pos: [-6, -0.3, -8] as const, scale: [4, 2, 3] as const, color: "#5a6a7a" },
    { pos: [7, -0.3, -8] as const, scale: [4.5, 2.8, 3.5] as const, color: "#4f5f6f" },
    { pos: [1.5, -0.3, -9] as const, scale: [6, 4, 4] as const, color: "#3d4f5f" },
    { pos: [-4.5, -0.3, -9.5] as const, scale: [5, 3.2, 3] as const, color: "#3d4f5f" },
    { pos: [5.5, -0.3, -10] as const, scale: [5.5, 3.8, 4] as const, color: "#354555" },
  ], []);

  return (
    <group>
      {peaks.map((p, i) => (
        <mesh key={i} position={p.pos} scale={p.scale} castShadow>
          <coneGeometry args={[1, 1.8, 5]} />
          <meshStandardMaterial color={p.color} roughness={0.9} flatShading />
        </mesh>
      ))}
      {/* Snow caps on the taller peaks */}
      {[peaks[2], peaks[5], peaks[7]].map((p, i) => (
        <mesh key={`snow-${i}`} position={[p.pos[0], p.pos[1] + p.scale[1] * 0.75, p.pos[2]]} scale={[p.scale[0] * 0.17, p.scale[1] * 0.3, p.scale[2] * 0.35]}>
          <coneGeometry args={[1, 1, 5]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} flatShading />
        </mesh>
      ))}
      {/* Ground plane behind mountains */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, -7]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#2d3748" roughness={1} />
      </mesh>
      {/* Grass/green area between mountains and beach */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.34, -1.5]} receiveShadow>
        <planeGeometry args={[18, 7]} />
        <meshStandardMaterial color="#2a6e35" roughness={0.9} />
      </mesh>
      {/* Lighter grass transition near beach */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.335, 1.2]} receiveShadow>
        <planeGeometry args={[18, 2]} />
        <meshStandardMaterial color="#4a8a3a" roughness={0.9} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
    </group>
  );
}

function AnimatedWater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);

  // useFrame(({ clock }) => {
  //   if (!geoRef.current) return;
  //   const t = clock.getElapsedTime();
  //   const pos = geoRef.current.attributes.position;
  //   for (let i = 0; i < pos.count; i++) {
  //     const x = pos.getX(i);
  //     const y = pos.getY(i);
  //     // y goes from -4 (far ocean) to +4 (near shore) on the plane
  //     // Fade waves out near shore (positive y) so they're calm at the sand edge
  //     const shoreBlend = THREE.MathUtils.smoothstep(y, 3, -2); // 1 at ocean, 0 at shore
  //     const wave =
  //       (Math.sin(x * 1.2 - t * 1.5) * 0.06 +
  //       Math.sin(y * 0.8 - t * 1.0) * 0.04 +
  //       Math.sin(x * 2.5 + y * 1.5 - t * 2.0) * 0.02) * shoreBlend;
  //     pos.setZ(i, wave);
  //   }
  //   pos.needsUpdate = true;
  //   geoRef.current.computeVertexNormals();
  // });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 7.5]} receiveShadow>
      <planeGeometry ref={geoRef} args={[22, 8, 40, 20]} />
      <meshStandardMaterial
        color="#1a6b8a"
        roughness={0.15}
        metalness={0.3}
        transparent
        opacity={0.85}
        flatShading
      />
    </mesh>
  );
}

function AnimatedFoam({ baseZ, speed, opacity }: { baseZ: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Gentle back-and-forth toward/away from shore
    ref.current.position.z = baseZ + Math.sin(t * speed) * 0.3;
    // Fade in/out with the wave cycle
    (ref.current.material as THREE.MeshStandardMaterial).opacity =
      opacity * (0.6 + 0.4 * Math.sin(t * speed + Math.PI / 2));
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, baseZ]}>
      <planeGeometry args={[18, 0.12]} />
      <meshStandardMaterial color="#e8f0f8" transparent opacity={opacity} roughness={0.3} />
    </mesh>
  );
}

function Beach() {
  return (
    <group>
      {/* Sandy beach */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.34, 2.5]} receiveShadow>
        <planeGeometry args={[18, 4]} />
        <meshStandardMaterial color="#d4a76a" roughness={1} />
      </mesh>
      {/* Wet sand near waterline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.33, 4.2]} receiveShadow>
        <planeGeometry args={[18, 1.2]} />
        <meshStandardMaterial color="#a08050" roughness={0.7} />
      </mesh>
      {/* Animated ocean */}
      <AnimatedWater />
      {/* Animated foam lines */}
      <AnimatedFoam baseZ={4.7} speed={0.6} opacity={0.5} />
      <AnimatedFoam baseZ={5.1} speed={0.45} opacity={0.35} />
      <AnimatedFoam baseZ={6} speed={0.3} opacity={0.2} />
      <AnimatedFoam baseZ={6.5} speed={0.3} opacity={0.2} />
    </group>
  );
}

function PalmTree({ position, scale = 1, lean = 0.3 }: { position: [number, number, number]; scale?: number; lean?: number }) {
  const { nodes, materials } = useGLTF("/Palm Tree.glb");
  return (
    <group position={position} scale={scale} rotation={[lean, 0, 0]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Environment_PalmTree_3 as THREE.Mesh).geometry}
        material={materials.Atlas}
        scale={50}
      />
    </group>
  );
}

useGLTF.preload("/Palm Tree.glb");

function PineTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.6, 6]} />
        <meshStandardMaterial color="#5a3a20" roughness={0.9} />
      </mesh>
      {/* Foliage tiers */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color="#1a5c2a" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <coneGeometry args={[0.24, 0.45, 6]} />
        <meshStandardMaterial color="#1e6830" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <coneGeometry args={[0.17, 0.35, 6]} />
        <meshStandardMaterial color="#22753a" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

function Trees() {
  const trees = useMemo(() => ({
    palms: [
      // Near the beach, both sides
      { pos: [-3.5, -0.35, 2.0] as [number, number, number], scale: 1.1, lean: 0.35 },
      { pos: [-5.0, -0.35, 2.8] as [number, number, number], scale: 0.9, lean: 0.25 },
      { pos: [3.8, -0.35, 1.8] as [number, number, number], scale: 1.0, lean: -0.3 },
      { pos: [5.5, -0.35, 2.5] as [number, number, number], scale: 1.2, lean: 0.2 },
      // { pos: [-2.0, -0.35, 1.5] as [number, number, number], scale: 0.8, lean: 0.4 },
      { pos: [-7.5, -0.35, 2.3] as [number, number, number], scale: 0.95, lean: -0.2 },
    ],
    pines: [
      // Left side
      { pos: [-4.0, -0.35, -1.5] as [number, number, number], scale: 1.0 },
      { pos: [-5.5, -0.35, -2.5] as [number, number, number], scale: 1.3 },
      { pos: [-3.5, -0.35, -3.5] as [number, number, number], scale: 0.9 },
      { pos: [-6.0, -0.35, -0.5] as [number, number, number], scale: 1.1 },
      { pos: [-5.0, -0.35, -4.5] as [number, number, number], scale: 1.4 },
      // Right side
      { pos: [4.5, -0.35, -1.0] as [number, number, number], scale: 1.1 },
      { pos: [5.5, -0.35, -2.8] as [number, number, number], scale: 1.2 },
      { pos: [6.0, -0.35, -0.3] as [number, number, number], scale: 0.85 },
      { pos: [4.0, -0.35, -4.0] as [number, number, number], scale: 1.3 },
      { pos: [6.5, -0.35, -3.5] as [number, number, number], scale: 1.0 },
      // Near mountains
      { pos: [-2.5, -0.35, -4.5] as [number, number, number], scale: 1.5 },
      { pos: [1.5, -0.35, -4.8] as [number, number, number], scale: 1.2 },
      { pos: [-1.0, -0.35, -5.0] as [number, number, number], scale: 1.4 },
      { pos: [3.0, -0.35, -5.2] as [number, number, number], scale: 1.1 },
      { pos: [-4.0, -0.35, -5.5] as [number, number, number], scale: 1.6 },
      { pos: [5.0, -0.35, -5.0] as [number, number, number], scale: 1.3 },
    ],
  }), []);

  return (
    <group>
      {trees.palms.map((t, i) => (
        <PalmTree key={`palm-${i}`} position={t.pos} scale={t.scale} lean={t.lean} />
      ))}
      {trees.pines.map((t, i) => (
        <PineTree key={`pine-${i}`} position={t.pos} scale={t.scale} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#1a2332"]} />
      <fog attach="fog" args={["#1a2332", 8, 18]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-2, 3, 2]} intensity={0.5} color="#a5b4fc" />
      <pointLight position={[3, 4, -2]} intensity={0.4} color="#fbbf24" />
      <hemisphereLight args={["#c9d6e3", "#2d3748", 0.6]} />

      <Mountains />
      <Beach />
      <Trees />

      <group rotation={[0, Math.PI / 2, 0]}>
        <Platform />
        <Desk />
        <Laptop />
        <CoffeeMug />
        <Surfboard />
        <Plant />
        <Hammer />
        <Globe />
        <Barbell />
        <Books />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
}

/* ─── Loading Fallback ───────────────────────────────────── */

function CanvasLoader() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-950/50 rounded-2xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading 3D scene…</span>
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */

export default function AboutScene() {
  return (
    <div className="min-h-screen">
      {/* Hero: 3D Scene + Bio */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* 3D Canvas */}
          <div className="w-full lg:w-1/2 h-[350px] lg:h-[500px] rounded-2xl overflow-hidden border border-gray-800 bg-gray-950/80">
            <Suspense fallback={<CanvasLoader />}>
              <Canvas
                shadows
                camera={{ position: [3, 2.5, 3], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Scene />
              </Canvas>
            </Suspense>
          </div>

          {/* Bio Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              About Me!
            </h1>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                I&apos;m Daniel, a full-stack developer based in the DFW area
                who&apos;s equally comfortable architecting infrastructure,
                designing databases, building backends, and crafting
                frontends—though I&apos;ll admit I have a soft spot for frontend such 
                as React and React Native. There&apos;s something satisfying about
                bringing ideas to life through clean, responsive interfaces that
                people actually enjoy using.
              </p>
              <p>
                When I&apos;m not deep in code, you&apos;ll find me chasing
                waves while surfing, staying active, or working on something
                with my hands. I believe the best developers are the ones who
                step away from the screen regularly—whether that&apos;s to build
                something physical, break a sweat, or just remember what it
                feels like to be a user experiencing the world beyond a browser.
              </p>
              <p className="text-gray-200 font-medium">
                I build things that work, look good, and solve real problems.
                Let&apos;s create something together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
