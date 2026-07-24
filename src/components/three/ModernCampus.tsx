"use client";

import { useRef, useMemo, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Camera Controller ──────────────────────────────────────────────
function CameraController({ progressRef }: { progressRef: RefObject<number> }) {
  const { camera } = useThree();

  const cameraPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(22, 14, 24),   // Wide establishing shot
        new THREE.Vector3(16, 10, 18),   // Moving closer
        new THREE.Vector3(10, 6, 12),    // Approaching campus
        new THREE.Vector3(5, 3.5, 7),    // Near plaza
        new THREE.Vector3(1.5, 2.2, 4.5), // Entrance close-up
      ]),
    []
  );

  const lookAtPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),     // Full building perspective
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 1.2, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 3.2, 0),   // Entrance level
      ]),
    []
  );

  useFrame(() => {
    const raw = progressRef.current;
    // Clamp and ease for a smoother landing
    const t = Math.min(Math.max(raw, 0), 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const pos = cameraPath.getPoint(eased);
    const target = lookAtPath.getPoint(eased);
    camera.position.copy(pos);
    camera.lookAt(target);
  });

  return null;
}

// ─── Glass Headquarters Building ────────────────────────────────────
function GlassBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  const glowIntensity = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Subtle sway
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.01;
  });

  const scene = useMemo(() => {
    const group = new THREE.Group();

    // Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: "#7ec8e3",
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 0.5,
      ior: 1.45,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 0.88,
      clearcoat: 0.08,
    });

    const steelMat = new THREE.MeshPhysicalMaterial({
      color: "#8a9bb5",
      metalness: 0.95,
      roughness: 0.2,
      envMapIntensity: 0.8,
    });

    const darkSteelMat = new THREE.MeshPhysicalMaterial({
      color: "#2a3a5a",
      metalness: 0.85,
      roughness: 0.3,
      envMapIntensity: 0.5,
    });

    const warmGlowMat = new THREE.MeshPhysicalMaterial({
      color: "#f0d8a0",
      emissive: "#f0d8a0",
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });

    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: "#3B6FA0",
      metalness: 0.7,
      roughness: 0.25,
      envMapIntensity: 0.6,
    });

    // ── Main glass volume ──
    const mainVol = new THREE.Mesh(new THREE.BoxGeometry(3.0, 6.0, 2.0), glassMat);
    mainVol.position.y = 3.0;
    group.add(mainVol);

    // ── Floor plates (visible through glass) ──
    for (let i = 0; i <= 6; i++) {
      const yPos = i * 0.85 + 0.4;
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(3.3, 0.06, 2.3),
        i % 2 === 0 ? steelMat : darkSteelMat
      );
      plate.position.y = yPos;
      group.add(plate);

      // Front edge
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(3.35, 0.04, 0.04),
        steelMat
      );
      edge.position.set(0, yPos, 1.18);
      group.add(edge);

      // Back edge
      const edgeB = edge.clone();
      edgeB.position.set(0, yPos, -1.18);
      group.add(edgeB);
    }

    // ── Vertical mullions ──
    for (let x = -1.4; x <= 1.4; x += 0.28) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.015, 6.0, 0.015),
        steelMat
      );
      mullion.position.set(x, 3.0, 1.005);
      group.add(mullion);

      const mullionB = mullion.clone();
      mullionB.position.set(x, 3.0, -1.005);
      group.add(mullionB);
    }

    // ── Roof edge detail ──
    const roofEdge = new THREE.Mesh(
      new THREE.BoxGeometry(3.35, 0.08, 2.15),
      darkSteelMat
    );
    roofEdge.position.set(0, 6.2, 0);
    group.add(roofEdge);

    // ── Entrance canopy ──
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.08, 1.4),
      canopyMat
    );
    canopy.position.set(0, 1.1, 1.7);
    group.add(canopy);

    // Canopy supports
    for (let x of [-0.9, 0.9]) {
      const support = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.4, 0.04),
        steelMat
      );
      support.position.set(x, 0.9, 1.7);
      group.add(support);
    }

    // ── Entrance glass doors ──
    const doorMat = new THREE.MeshPhysicalMaterial({
      color: "#a0d4f0",
      metalness: 0.0,
      roughness: 0.02,
      transmission: 0.85,
      thickness: 0.15,
      ior: 1.52,
      transparent: true,
      opacity: 0.65,
    });
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 2.0, 0.03),
      doorMat
    );
    door.position.set(0, 1.0, 1.015);
    group.add(door);

    // Door frames
    for (let x of [-0.8, 0.8]) {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 2.0, 0.03),
        steelMat
      );
      frame.position.set(x, 1.0, 1.015);
      group.add(frame);
    }

    // ── Warm lobby glow (emissive plane inside) ──
    const lobbyGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 2.0),
      warmGlowMat
    );
    lobbyGlow.position.set(0, 1.0, 0.95);
    group.add(lobbyGlow);

    // ── Side wings (lower glass elements) ──
    for (let side of [-1, 1]) {
      const wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 2.0, 2.0),
        glassMat
      );
      wing.position.set(side * 1.9, 1.0, 0);
      group.add(wing);

      // Wing floor
      const wingFloor = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.05, 1.9),
        steelMat
      );
      wingFloor.position.set(side * 1.9, 0.05, 0);
      group.add(wingFloor);
    }

    return group;
  }, []);

  return <primitive ref={groupRef} object={scene} />;
}

// ─── Trees & Landscaping ───────────────────────────────────────────
function Trees({ layer = "mid" }: { layer: "fore" | "mid" | "back" }) {
  const scaleMap = { fore: 1, mid: 0.7, back: 0.4 };
  const s = scaleMap[layer];

  const treeData = useMemo(() => {
    if (layer === "fore")
      return [
        { x: -5.5, z: 6, size: 1.2 },
        { x: 6, z: 7, size: 1.4 },
        { x: -4, z: 10, size: 1.0 },
        { x: 5, z: 9, size: 1.1 },
        { x: -7, z: 4, size: 1.3 },
        { x: 7.5, z: 5, size: 1.0 },
      ];
    if (layer === "mid")
      return [
        { x: -8, z: 0, size: 0.8 },
        { x: 8, z: 0, size: 0.9 },
        { x: -6, z: -2, size: 0.7 },
        { x: 6.5, z: -1.5, size: 0.75 },
        { x: -9, z: 3, size: 0.6 },
        { x: 9, z: 2.5, size: 0.7 },
        { x: 0, z: -3, size: 0.5 },
      ];
    // back layer
    return [
      { x: -12, z: 2, size: 0.5 },
      { x: 12, z: 1, size: 0.5 },
      { x: -14, z: -2, size: 0.4 },
      { x: 13, z: -1, size: 0.45 },
      { x: -11, z: -4, size: 0.35 },
      { x: 11, z: -3, size: 0.4 },
    ];
  }, [layer]);

  return (
    <group scale={s}>
      {treeData.map((t, i) => {
        const trunkMat = new THREE.MeshPhysicalMaterial({
          color: "#5a4a3a",
          roughness: 0.9,
        });
        const foliageMat = new THREE.MeshPhysicalMaterial({
          color: ["#2d5a27", "#3a7a33", "#4a8a3a", "#1d4a17"][i % 4],
          roughness: 0.8,
          metalness: 0.0,
        });

        return (
          <group key={i} position={[t.x, 0, t.z]}>
            {/* Trunk */}
            <mesh position={[0, t.size * 0.5, 0]}>
              <cylinderGeometry args={[0.04, 0.06, t.size, 6]} />
              <meshPhysicalMaterial {...trunkMat} />
            </mesh>
            {/* Foliage spheres (clustered) */}
            <mesh position={[0, t.size * 1.0, 0]}>
              <sphereGeometry args={[t.size * 0.3, 8, 8]} />
              <meshPhysicalMaterial {...foliageMat} />
            </mesh>
            <mesh position={[t.size * 0.15, t.size * 0.85, t.size * 0.1]}>
              <sphereGeometry args={[t.size * 0.22, 8, 8]} />
              <meshPhysicalMaterial {...foliageMat} />
            </mesh>
            <mesh position={[t.size * -0.12, t.size * 0.9, t.size * -0.08]}>
              <sphereGeometry args={[t.size * 0.2, 8, 8]} />
              <meshPhysicalMaterial {...foliageMat} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ─── Reflecting Pool ────────────────────────────────────────────────
function ReflectingPool() {
  const poolMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#2a4a5a",
        metalness: 0.0,
        roughness: 0.02,
        transparent: true,
        opacity: 0.6,
        envMapIntensity: 0.8,
        ior: 1.33,
      }),
    []
  );

  return (
    <mesh position={[0, -0.05, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.0, 2.5]} />
      <meshPhysicalMaterial {...poolMat} />
    </mesh>
  );
}

// ─── Ground Plane ──────────────────────────────────────────────────
function Ground() {
  const groundMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d4d0c8",
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshPhysicalMaterial {...groundMat} />
    </mesh>
  );
}

// ─── Pathway ────────────────────────────────────────────────────────
function Pathway() {
  const pathMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#b8b0a0",
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 2.0]}>
      <planeGeometry args={[1.8, 4.0]} />
      <meshPhysicalMaterial {...pathMat} />
    </mesh>
  );
}

// ─── Background Atmosphere ──────────────────────────────────────────
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[60, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y;
            vec3 top = vec3(0.05, 0.1, 0.25);
            vec3 bottom = vec3(0.5, 0.6, 0.7);
            gl_FragColor = vec4(mix(bottom, top, max(h, 0.0)), 1.0);
          }
        `}
      />
    </mesh>
  );
}

// ─── Floating Particles (ambient dust / light motes) ───────────────
function AmbientParticles() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = Math.random() * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
      s[i] = Math.random() * 2 + 1;
    }
    return [p, s];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsed = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(elapsed * 0.1 + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#88c8e8"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main Scene ─────────────────────────────────────────────────────
function CampusScene({ progressRef }: { progressRef: RefObject<number> }) {
  return (
    <>
      <CameraController progressRef={progressRef} />
      <Atmosphere />
      <Ground />
      <Pathway />
      <ReflectingPool />
      <GlassBuilding />
      <Trees layer="back" />
      <Trees layer="mid" />
      <Trees layer="fore" />
      <AmbientParticles />
    </>
  );
}

// ─── Canvas Wrapper ─────────────────────────────────────────────────
export function ModernCampus({ progressRef }: { progressRef: RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 45, near: 0.1, far: 100 }}
      style={{ background: "#0a1628" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.4}
        castShadow={false}
        color="#ffe8c8"
      />
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.3}
        color="#88bbff"
      />
      <hemisphereLight
        args={["#b0d0ff", "#8a7a6a", 0.5]}
      />

      {/* Warm fill from building */}
      <pointLight position={[0, 2, 3]} intensity={0.3} color="#f0d8a0" />

      {/* Environment for reflections */}
      <Environment preset="city" />
      <fog attach="fog" args={["#0a1628", 15, 40]} />

      <CampusScene progressRef={progressRef} />
    </Canvas>
  );
}
