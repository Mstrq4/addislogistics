"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface LogisticsSceneProps {
  scrollProgress: number;
  activeStage: number | null;
  isDark: boolean;
  isRtl: boolean;
  reducedMotion: boolean;
}

const MODEL_PATHS = {
  plane: "/models/cargo-plane.glb",
  shipMain: "/models/cargo-ship.glb",
  shipSecondary: "/models/cargo-ship-secondary.glb",
  tugboat: "/models/port-tugboat.glb",
  container: "/models/shipping-container.glb",
  containerStack: "/models/container-stack.glb",
  crane: "/models/port-crane.glb",
  truckSemi: "/models/freight-truck.glb",
  truckDelivery: "/models/delivery-truck.glb",
  truckFlatbed: "/models/flatbed-truck.glb",
} as const;

interface CameraKeyframe {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
}

// Continuous camera flight path across the full 0 -> 1 page scroll
const SCROLL_KEYFRAMES: CameraKeyframe[] = [
  // 0.00 - Hero panorama: open harbour view with ship foreground, plane banking above, quay crane
  { t: 0.0, pos: [13.5, 6.6, 15.5], look: [0.0, 1.8, 0.5] },
  // 0.22 - Fleet & Air Freight chapter: climb alongside the banking C-130 cargo aircraft
  { t: 0.22, pos: [8.5, 8.8, 9.2], look: [-1.0, 5.4, -1.8] },
  // 0.45 - Sea Freight & Container Ships chapter: low cinematic sweep beside flagship container vessel
  { t: 0.45, pos: [11.2, 3.8, 10.8], look: [-2.0, 1.2, 3.4] },
  // 0.68 - Port Crane & Project Cargo chapter: gantry terminal, stacked containers & crane
  { t: 0.68, pos: [8.4, 5.0, 6.8], look: [1.5, 1.8, -1.0] },
  // 0.85 - Overland Road Fleet & 4 Strategic Branches chapter: highway truck convoy & branch pylons
  { t: 0.85, pos: [10.8, 4.4, -8.8], look: [0.5, 1.0, -4.4] },
  // 1.00 - Quote Desk & Tools finale: high elevated supply-chain command view
  { t: 1.0, pos: [15.8, 9.8, 12.2], look: [0.0, 1.4, -0.5] },
];

// Manual stage focus targets when user clicks a pill/card
const STAGE_TARGETS: Array<{
  pos: [number, number, number];
  look: [number, number, number];
}> = [
  { pos: [13.5, 6.6, 15.5], look: [0.0, 1.8, 0.5] }, // 0: All corridor
  { pos: [8.2, 8.6, 8.6], look: [-1.0, 5.5, -1.6] }, // 1: Air freighter
  { pos: [11.0, 3.8, 10.4], look: [-2.2, 1.2, 3.5] }, // 2: Ocean container ship
  { pos: [8.2, 4.8, 6.4], look: [1.6, 1.8, -1.0] }, // 3: Port crane & containers
  { pos: [10.4, 4.2, -8.8], look: [0.6, 1.0, -4.4] }, // 4: Road truck convoy
];

function NormalizedGLBModel({
  url,
  targetSize,
  groundAtZero = true,
  rotationY = 0,
}: {
  url: string;
  targetSize: number;
  groundAtZero?: boolean;
  rotationY?: number;
}) {
  const { scene } = useGLTF(url);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const processMat = (mat: THREE.Material): THREE.Material => {
          const name = (mat.name || "").toLowerCase();
          if (name.includes("mapbox_logo")) {
            const branded = (mat as THREE.MeshStandardMaterial).clone();
            branded.map = null;
            branded.color = new THREE.Color(
              name.includes("white") ? "#009fe3" : "#0f213d"
            );
            branded.needsUpdate = true;
            return branded;
          }
          if (url.includes("freight-truck") && name === "truck") {
            const fleetPaint = (mat as THREE.MeshStandardMaterial).clone();
            fleetPaint.map = null;
            fleetPaint.color = new THREE.Color("#e2e8f0");
            fleetPaint.metalness = 0.28;
            fleetPaint.roughness = 0.42;
            fleetPaint.needsUpdate = true;
            return fleetPaint;
          }
          return mat;
        };

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(processMat);
        } else if (mesh.material) {
          mesh.material = processMat(mesh.material);
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const scale = targetSize / maxDim;

    const offsetX = -center.x * scale;
    const offsetY = groundAtZero ? -box.min.y * scale : -center.y * scale;
    const offsetZ = -center.z * scale;

    return {
      object: clone,
      scale,
      offset: [offsetX, offsetY, offsetZ] as [number, number, number],
    };
  }, [scene, targetSize, groundAtZero, url]);

  return (
    <group rotation={[0, rotationY, 0]}>
      <primitive
        object={normalized.object}
        scale={normalized.scale}
        position={normalized.offset}
      />
    </group>
  );
}

function FlightCorridor({
  scrollProgress,
  isDark,
  reducedMotion,
  highlighted,
}: {
  scrollProgress: number;
  isDark: boolean;
  reducedMotion: boolean;
  highlighted: boolean;
}) {
  const planeRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.MeshStandardMaterial>(null);

  const flightArcPoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 5.4, 2.0),
      new THREE.Vector3(-6, 6.4, -1.0),
      new THREE.Vector3(1, 7.0, -2.8),
      new THREE.Vector3(9, 6.2, -1.6),
      new THREE.Vector3(16, 5.3, 1.5),
    ]);
    return curve.getPoints(48).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planeRef.current) {
      if (reducedMotion) {
        planeRef.current.position.set(-1.0, 6.2, -1.8);
        planeRef.current.rotation.set(0, Math.PI * 0.35, 0);
      } else {
        // Scroll drives longitudinal travel across the screen; time adds gentle realistic banking
        const scrollShift = (scrollProgress - 0.18) * 16;
        const cycle = Math.sin(t * 0.34) * 3.6;
        const x = THREE.MathUtils.clamp(-2.5 + scrollShift + cycle, -11, 11);
        const z = -2.2 + Math.cos(t * 0.34 + scrollProgress * 2.5) * 1.4;
        const y = 6.1 + Math.sin(t * 0.7) * 0.28 + Math.sin(scrollProgress * Math.PI) * 0.8;
        planeRef.current.position.set(x, y, z);

        // Model nose points -X; +Math.PI/2 rotates -X nose to +Z, then align along X flight heading
        planeRef.current.rotation.y = Math.PI + Math.cos(t * 0.34) * 0.14;
        planeRef.current.rotation.z = Math.cos(t * 0.34) * 0.11;
        planeRef.current.rotation.x = Math.sin(t * 0.7) * 0.04;
      }
    }

    if (beaconRef.current) {
      beaconRef.current.emissiveIntensity =
        0.9 + Math.abs(Math.sin(t * 4.5)) * (highlighted ? 2.4 : 1.4);
    }
  });

  return (
    <group>
      <Line
        points={flightArcPoints}
        color={highlighted ? "#38bdf8" : isDark ? "#00a8f0" : "#0284c7"}
        lineWidth={highlighted ? 2.6 : 1.5}
        transparent
        opacity={highlighted ? 0.85 : 0.45}
      />

      <group ref={planeRef} position={[-1.0, 5.4, -1.8]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.plane}
          targetSize={6.8}
          groundAtZero={false}
          rotationY={0}
        />
        {/* Anti-collision aviation strobe */}
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial
            ref={beaconRef}
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.6}
          />
        </mesh>
      </group>
    </group>
  );
}

function MaritimeFleet({
  scrollProgress,
  reducedMotion,
  highlighted,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
  highlighted: boolean;
}) {
  const mainShipRef = useRef<THREE.Group>(null);
  const secondaryShipRef = useRef<THREE.Group>(null);
  const tugRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mainShipRef.current) {
      const surge = reducedMotion
        ? 0
        : Math.sin(t * 0.22) * 1.1 + (scrollProgress - 0.35) * 7.5;
      mainShipRef.current.position.set(
        THREE.MathUtils.clamp(-2.8 + surge, -8.5, 7.5),
        0.04 + (reducedMotion ? 0 : Math.sin(t * 1.05) * 0.06),
        4.2
      );
      mainShipRef.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.8) * 0.025;
      mainShipRef.current.rotation.x = reducedMotion ? 0 : Math.cos(t * 0.9) * 0.015;
    }

    if (secondaryShipRef.current) {
      const surge2 = reducedMotion
        ? 0
        : -Math.sin(t * 0.19) * 1.3 - (scrollProgress - 0.4) * 5.2;
      secondaryShipRef.current.position.set(
        THREE.MathUtils.clamp(-9.5 + surge2, -14, -1.5),
        0.02 + (reducedMotion ? 0 : Math.cos(t * 1.1) * 0.05),
        8.6
      );
      secondaryShipRef.current.rotation.z = reducedMotion ? 0 : Math.cos(t * 0.9) * 0.02;
    }

    if (tugRef.current) {
      const escortX = reducedMotion
        ? 3.2
        : 2.6 + Math.sin(t * 0.22) * 1.1 + (scrollProgress - 0.35) * 6.0;
      tugRef.current.position.set(
        THREE.MathUtils.clamp(escortX, -3, 10),
        0.02 + (reducedMotion ? 0 : Math.sin(t * 1.8) * 0.05),
        2.15
      );
    }
  });

  return (
    <group>
      {/* Flagship Ocean Container Ship (cargo-ship.glb — length along Z, rotate +90deg so length runs X) */}
      <group ref={mainShipRef} position={[-2.8, 0.04, 4.2]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.shipMain}
          targetSize={highlighted ? 10.6 : 9.6}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>

      {/* Secondary Feeder Vessel */}
      <group ref={secondaryShipRef} position={[-9.5, 0.02, 8.6]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.shipSecondary}
          targetSize={8.2}
          groundAtZero
          rotationY={-Math.PI / 2}
        />
      </group>

      {/* Port Tugboat escorting berth */}
      <group ref={tugRef} position={[3.2, 0.02, 2.15]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.tugboat}
          targetSize={2.9}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>
    </group>
  );
}

function PortTerminalAndCranes({
  scrollProgress,
  isDark,
  reducedMotion,
  highlighted,
}: {
  scrollProgress: number;
  isDark: boolean;
  reducedMotion: boolean;
  highlighted: boolean;
}) {
  const craneARef = useRef<THREE.Group>(null);
  const craneBRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!reducedMotion) {
      if (craneARef.current) {
        craneARef.current.rotation.y =
          Math.sin(t * 0.45 + scrollProgress * 4.0) * 0.28 + 0.15;
      }
      if (craneBRef.current) {
        craneBRef.current.rotation.y =
          Math.cos(t * 0.4 + scrollProgress * 4.0) * 0.25 - 0.18;
      }
    }
  });

  return (
    <group>
      {/* Quay Berth Concrete Pier */}
      <mesh position={[0, 0.16, -2.5]} receiveShadow>
        <boxGeometry args={[28, 0.34, 6.6]} />
        <meshStandardMaterial
          color={isDark ? "#132642" : "#dbe7f4"}
          roughness={0.85}
          metalness={0.12}
        />
      </mesh>

      {/* Quay Cyan Coping Edge Stripe */}
      <mesh position={[0, 0.35, 0.78]}>
        <boxGeometry args={[28, 0.05, 0.14]} />
        <meshStandardMaterial
          color="#009fe3"
          emissive="#009fe3"
          emissiveIntensity={highlighted ? 1.5 : 0.7}
        />
      </mesh>

      {/* Twin Heavy Port Cranes (real GLB) */}
      <group ref={craneARef} position={[-1.4, 0.34, -0.3]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.crane}
          targetSize={4.8}
          groundAtZero
          rotationY={0}
        />
      </group>
      <group ref={craneBRef} position={[4.8, 0.34, -0.3]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.crane}
          targetSize={4.6}
          groundAtZero
          rotationY={0}
        />
      </group>

      {/* Real ISO Container Stacks (GLB) */}
      <group position={[-6.5, 0.34, -1.6]}>
        <NormalizedGLBModel url={MODEL_PATHS.containerStack} targetSize={3.8} groundAtZero />
      </group>
      <group position={[1.5, 0.34, -1.7]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.containerStack}
          targetSize={4.0}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>
      <group position={[8.6, 0.34, -1.6]}>
        <NormalizedGLBModel url={MODEL_PATHS.containerStack} targetSize={3.6} groundAtZero />
      </group>

      {/* Single Foreground ISO Containers ready for inspection / truck loading */}
      <group position={[-2.9, 0.34, -2.3]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.container}
          targetSize={2.4}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>
      <group position={[5.9, 0.34, -2.3]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.container}
          targetSize={2.4}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>
    </group>
  );
}

function RoadFleetAndHubCorridor({
  scrollProgress,
  isDark,
  reducedMotion,
  highlighted,
}: {
  scrollProgress: number;
  isDark: boolean;
  reducedMotion: boolean;
  highlighted: boolean;
}) {
  const semiTruckRef = useRef<THREE.Group>(null);
  const deliveryTruckRef = useRef<THREE.Group>(null);
  const flatbedTruckRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (reducedMotion) return;

    const highwayOffset = scrollProgress * 18;

    if (semiTruckRef.current) {
      const loopX = ((t * 1.45 + highwayOffset + 12) % 24) - 12;
      semiTruckRef.current.position.x = loopX;
    }
    if (deliveryTruckRef.current) {
      const loopX2 = ((t * 1.2 + highwayOffset + 20) % 24) - 12;
      deliveryTruckRef.current.position.x = -loopX2;
    }
    if (flatbedTruckRef.current) {
      const loopX3 = ((t * 1.35 + highwayOffset + 4) % 24) - 12;
      flatbedTruckRef.current.position.x = loopX3;
    }
  });

  // 4 Strategic Hubs Pylons along the coastal logistics corridor: Aden, Hodeidah, Sana'a, Istanbul
  const hubMarkers: Array<{ code: string; pos: [number, number, number] }> = [
    { code: "SAH", pos: [-8.5, 0.34, -6.2] },
    { code: "HOD", pos: [-2.8, 0.34, -6.2] },
    { code: "ADE", pos: [2.8, 0.34, -6.2] },
    { code: "IST", pos: [8.5, 0.34, -6.2] },
  ];

  const laneLine: Array<[number, number, number]> = [
    [-13.5, 0.38, -4.45],
    [13.5, 0.38, -4.45],
  ];

  return (
    <group>
      {/* Overland Logistics Highway Deck */}
      <mesh position={[0, 0.16, -4.5]} receiveShadow>
        <boxGeometry args={[28, 0.32, 2.2]} />
        <meshStandardMaterial
          color={isDark ? "#0e1b30" : "#cbd5e1"}
          roughness={0.9}
        />
      </mesh>

      <Line
        points={laneLine}
        color={highlighted ? "#38bdf8" : "#009fe3"}
        lineWidth={1.6}
        dashed
        dashSize={0.5}
        gapSize={0.35}
      />

      {/* Real GLB Road Fleet Convoy */}
      <group ref={semiTruckRef} position={[-2.0, 0.33, -4.05]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.truckSemi}
          targetSize={2.7}
          groundAtZero
          rotationY={0}
        />
      </group>

      <group ref={deliveryTruckRef} position={[3.8, 0.33, -4.95]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.truckDelivery}
          targetSize={2.4}
          groundAtZero
          rotationY={-Math.PI / 2}
        />
      </group>

      <group ref={flatbedTruckRef} position={[-7.5, 0.33, -4.05]}>
        <NormalizedGLBModel
          url={MODEL_PATHS.truckFlatbed}
          targetSize={2.4}
          groundAtZero
          rotationY={Math.PI / 2}
        />
      </group>

      {/* 4 Strategic Branch Beacon Pylons */}
      {hubMarkers.map((hub) => (
        <group key={hub.code} position={hub.pos}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.14, 0.22, 0.7, 16]} />
            <meshStandardMaterial
              color={isDark ? "#1e3a5f" : "#64748b"}
              metalness={0.45}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color="#00a8f0"
              emissive="#00a8f0"
              emissiveIntensity={highlighted ? 2.2 : 1.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function OceanWater({ isDark }: { isDark: boolean }) {
  const waterRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!waterRef.current) return;
    const t = state.clock.getElapsedTime();
    waterRef.current.position.y = -0.02 + Math.sin(t * 0.8) * 0.02;
  });

  return (
    <mesh
      ref={waterRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, 7.5]}
      receiveShadow
    >
      <planeGeometry args={[120, 64]} />
      <meshStandardMaterial
        color={isDark ? "#051933" : "#b8dcf2"}
        roughness={0.28}
        metalness={0.42}
      />
    </mesh>
  );
}

function CameraChoreographer({
  scrollProgress,
  activeStage,
  isRtl,
}: {
  scrollProgress: number;
  activeStage: number | null;
  isRtl: boolean;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(12.5, 6.2, 14.5));
  const targetLook = useRef(new THREE.Vector3(0, 1.8, 0.5));
  const currentLook = useRef(new THREE.Vector3(0, 1.8, 0.5));

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);

    if (activeStage !== null && STAGE_TARGETS[activeStage]) {
      const stageTarget = STAGE_TARGETS[activeStage];
      targetPos.current.set(...stageTarget.pos);
      targetLook.current.set(...stageTarget.look);
    } else {
      // Piecewise linear interpolation along SCROLL_KEYFRAMES (0.0 -> 1.0)
      const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
      let prev = SCROLL_KEYFRAMES[0];
      let next = SCROLL_KEYFRAMES[SCROLL_KEYFRAMES.length - 1];

      for (let i = 0; i < SCROLL_KEYFRAMES.length - 1; i++) {
        if (p >= SCROLL_KEYFRAMES[i].t && p <= SCROLL_KEYFRAMES[i + 1].t) {
          prev = SCROLL_KEYFRAMES[i];
          next = SCROLL_KEYFRAMES[i + 1];
          break;
        }
      }

      const span = Math.max(0.0001, next.t - prev.t);
      const localT = THREE.MathUtils.smoothstep((p - prev.t) / span, 0, 1);

      targetPos.current.set(
        THREE.MathUtils.lerp(prev.pos[0], next.pos[0], localT),
        THREE.MathUtils.lerp(prev.pos[1], next.pos[1], localT),
        THREE.MathUtils.lerp(prev.pos[2], next.pos[2], localT)
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(prev.look[0], next.look[0], localT),
        THREE.MathUtils.lerp(prev.look[1], next.look[1], localT),
        THREE.MathUtils.lerp(prev.look[2], next.look[2], localT)
      );
    }

    // Offset look target slightly away from inline-start text column so vehicles sit cleanly in open viewport
    const rtlOffset = isRtl ? 1.5 : -1.5;
    targetLook.current.x += rtlOffset;

    const lerpRate = 1 - Math.exp(-safeDelta * 4.2);
    camera.position.lerp(targetPos.current, lerpRate);
    currentLook.current.lerp(targetLook.current, lerpRate);
    camera.lookAt(currentLook.current);
  });

  return null;
}

export default function LogisticsScene({
  scrollProgress,
  activeStage,
  isDark,
  isRtl,
  reducedMotion,
}: LogisticsSceneProps) {
  const effectiveStage =
    activeStage !== null
      ? activeStage
      : scrollProgress < 0.16
      ? 0
      : scrollProgress < 0.36
      ? 1
      : scrollProgress < 0.6
      ? 2
      : scrollProgress < 0.78
      ? 3
      : 4;

  const bgColor = isDark ? "#050e1d" : "#e8f2fb";

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [12.5, 6.2, 14.5], fov: 42, near: 0.1, far: 160 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
    >
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 20, 62]} />

      <ambientLight intensity={isDark ? 0.65 : 1.05} />
      <directionalLight
        position={[14, 22, 12]}
        intensity={isDark ? 1.55 : 2.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={2}
        shadow-camera-far={55}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      <directionalLight
        position={[-12, 8, -10]}
        intensity={isDark ? 0.55 : 0.75}
        color="#38bdf8"
      />
      <hemisphereLight
        args={[isDark ? "#38bdf8" : "#e0f2fe", isDark ? "#050e1d" : "#94a3b8", 0.6]}
      />

      <CameraChoreographer
        scrollProgress={scrollProgress}
        activeStage={activeStage}
        isRtl={isRtl}
      />

      <OceanWater isDark={isDark} />

      <Suspense fallback={null}>
        <FlightCorridor
          scrollProgress={scrollProgress}
          isDark={isDark}
          reducedMotion={reducedMotion}
          highlighted={effectiveStage === 1}
        />
        <MaritimeFleet
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          highlighted={effectiveStage === 2}
        />
        <PortTerminalAndCranes
          scrollProgress={scrollProgress}
          isDark={isDark}
          reducedMotion={reducedMotion}
          highlighted={effectiveStage === 3}
        />
        <RoadFleetAndHubCorridor
          scrollProgress={scrollProgress}
          isDark={isDark}
          reducedMotion={reducedMotion}
          highlighted={effectiveStage === 4}
        />
      </Suspense>
    </Canvas>
  );
}

// Preload all 10 binary GLB models immediately
Object.values(MODEL_PATHS).forEach((url) => {
  useGLTF.preload(url);
});
