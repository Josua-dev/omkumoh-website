"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function BridgeStructure() {
  const meshRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ y: 0, x: 0 });
  const time = useRef(0);

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;
    time.current = clock.getElapsedTime();

    // Auto-orbit: slow lazy rotation + mouse influence
    const autoY = Math.sin(time.current * 0.04) * 0.15;
    const autoX = Math.sin(time.current * 0.03) * 0.06;

    targetRotation.current.y = autoY + pointer.x * 0.08;
    targetRotation.current.x = autoX + -pointer.y * 0.04;

    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.015;
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.015;

    // Floating animation on the arch
    const arch = meshRef.current.children[0] as THREE.Mesh;
    if (arch?.position) {
      arch.position.y = Math.sin(time.current * 0.5) * 0.03;
    }
  });

  const bridge = useMemo(() => {
    const group = new THREE.Group();

    // Arch structure — main tube
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const x = (t - 0.5) * 6;
      const y = Math.sin(t * Math.PI) * 2.2;
      points.push(new THREE.Vector3(x, y, 0));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 50, 0.05, 8, false);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#3B6FA0"),
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.7,
      emissive: new THREE.Color("#3B6FA0"),
      emissiveIntensity: 0.08,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    tube.position.y = 0.15;
    group.add(tube);

    // Secondary thinner arch (inner)
    const innerPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const x = (t - 0.5) * 5.2;
      const y = Math.sin(t * Math.PI) * 1.9;
      innerPoints.push(new THREE.Vector3(x, y, 0));
    }
    const innerCurve = new THREE.CatmullRomCurve3(innerPoints);
    const innerTubeGeo = new THREE.TubeGeometry(innerCurve, 40, 0.025, 6, false);
    const innerTubeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#B87333"),
      metalness: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.4,
      emissive: new THREE.Color("#B87333"),
      emissiveIntensity: 0.05,
    });
    const innerTube = new THREE.Mesh(innerTubeGeo, innerTubeMat);
    innerTube.position.y = 0.15;
    group.add(innerTube);

    // I-beam elements (vertical)
    for (let i = -2.8; i <= 2.8; i += 0.5) {
      const beamGeo = new THREE.BoxGeometry(0.025, 0.5, 0.025);
      const beamMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(i % 1 < 0.25 ? "#B87333" : "#3B6FA0"),
        metalness: 0.9,
        roughness: 0.1,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(i, Math.sin((i + 3) / 3 * Math.PI) * 2.1, 0);
      group.add(beam);
    }

    // Cable lines (suspenders)
    const cableMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#7BC4C4"),
      transparent: true,
      opacity: 0.2,
    });
    for (let i = -2.5; i <= 2.5; i += 0.4) {
      const archY = Math.sin((i + 3) / 3 * Math.PI) * 2.1;
      const points = [
        new THREE.Vector3(i, archY, 0),
        new THREE.Vector3(i, -0.3, 0),
      ];
      const cableGeo = new THREE.BufferGeometry().setFromPoints(points);
      const cable = new THREE.Line(cableGeo, cableMat);
      group.add(cable);
    }

    // Deck
    const deckGeo = new THREE.BoxGeometry(6, 0.06, 0.8);
    const deckMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4A4A4A"),
      metalness: 0.7,
      roughness: 0.3,
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, -0.3, 0);
    group.add(deck);

    // Deck edge lights
    const glowMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#3B6FA0"),
      emissive: new THREE.Color("#3B6FA0"),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.3,
    });
    for (let side = -1; side <= 1; side += 2) {
      for (let i = -2.5; i <= 2.5; i += 0.6) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), glowMat);
        dot.position.set(i, -0.27, side * 0.4);
        group.add(dot);
      }
    }

    return group;
  }, []);

  return <primitive ref={meshRef} object={bridge} />;
}

function FloatingCogs() {
  const cogs = useMemo(() => {
    const items: { pos: [number, number, number]; size: number; speed: number; color: string }[] = [];
    for (let i = 0; i < 10; i++) {
      items.push({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6 + 2,
          (Math.random() - 0.5) * 6 - 2,
        ],
        size: Math.random() * 0.35 + 0.08,
        speed: Math.random() * 0.6 + 0.2,
        color: i % 3 === 0 ? "#3B6FA0" : i % 3 === 1 ? "#B87333" : "#7BC4C4",
      });
    }
    return items;
  }, []);

  return (
    <>
      {cogs.map((cog, i) => (
        <Float key={i} speed={cog.speed} rotationIntensity={0.8} floatIntensity={0.6}>
          <mesh position={cog.pos}>
            <torusGeometry args={[cog.size, 0.025, 16, 32]} />
            <meshPhysicalMaterial
              color={new THREE.Color(cog.color)}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.6}
              emissive={new THREE.Color(cog.color)}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ParticleGrid() {
  const count = 1500;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#3B6FA0"),
      new THREE.Color("#7BC4C4"),
      new THREE.Color("#B87333"),
      new THREE.Color("#FFFFFF"),
    ];
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 24;
      pos[idx + 1] = (Math.random() - 0.5) * 12;
      pos[idx + 2] = (Math.random() - 0.5) * 12 - 4;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const ref = useRef<THREE.Points>(null);
  const initialPositions = useRef(new Float32Array(positions));

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsed = clock.getElapsedTime();
    ref.current.rotation.y = elapsed * 0.008;

    // Gentle wave motion on particles
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ix = initialPositions.current[idx];
      pos[idx + 1] = initialPositions.current[idx + 1] + Math.sin(elapsed * 0.5 + ix * 0.5) * 0.15;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GridFloor() {
  return (
    <group position={[0, -2.5, 0]}>
      {/* Main grid */}
      <gridHelper
        args={[20, 40, "#3B6FA0", "#3B6FA0"]}
        rotation-x={Math.PI / 2}
      >
        <meshBasicMaterial transparent opacity={0.1} />
      </gridHelper>

      {/* Second finer grid */}
      <gridHelper
        args={[20, 80, "#7BC4C4", "#7BC4C4"]}
        rotation-x={Math.PI / 2}
        position={[0, 0.01, 0]}
      >
        <meshBasicMaterial transparent opacity={0.04} />
      </gridHelper>
    </group>
  );
}

function DynamicLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.15) * 4;
      light1.current.position.z = Math.cos(t * 0.2) * 4;
      light1.current.intensity = 0.4 + Math.sin(t * 0.3) * 0.15;
    }
    if (light2.current) {
      light2.current.position.x = Math.sin(t * 0.2 + 2) * 4;
      light2.current.position.z = Math.cos(t * 0.15 + 2) * 4;
      light2.current.intensity = 0.3 + Math.sin(t * 0.25 + 1) * 0.1;
    }
  });

  return (
    <>
      <pointLight ref={light1} position={[3, 2, 3]} intensity={0.5} color="#3B6FA0" />
      <pointLight ref={light2} position={[-3, 1, -3]} intensity={0.4} color="#7BC4C4" />
    </>
  );
}

export function InfrastructureScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#7BC4C4" />
        <DynamicLights />
        <BridgeStructure />
        <FloatingCogs />
        <ParticleGrid />
        <GridFloor />
      </Canvas>
    </div>
  );
}
