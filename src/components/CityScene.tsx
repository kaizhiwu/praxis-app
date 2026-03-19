import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

// ---------------------------------------------------------------------------
// GLTF City Model
// ---------------------------------------------------------------------------

const MODEL_PATH = '/models/city.glb'

function CityModel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const gltf = useGLTF(MODEL_PATH) as GLTF

  // Slowly rotate the city as user scrolls for a cinematic feel
  useFrame(() => {
    if (!groupRef.current) return
    const t = scrollRef.current
    groupRef.current.rotation.y = -0.3 + t * 0.6
  })

  return (
    <group ref={groupRef} dispose={null}>
      <primitive
        object={gltf.scene}
        scale={0.8}
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the model
useGLTF.preload(MODEL_PATH)

// ---------------------------------------------------------------------------
// Data labels — floating above key positions in the city
// ---------------------------------------------------------------------------

const DATA_LABELS: { pos: [number, number, number]; label: string; threshold: number }[] = [
  { pos: [0, 3.5, 0], label: 'outlets ✓', threshold: 0.1 },
  { pos: [1.5, 2.5, 1], label: 'quiet ✓', threshold: 0.18 },
  { pos: [-1.2, 2, -0.8], label: 'open now', threshold: 0.26 },
  { pos: [2, 1.5, -1.5], label: 'wifi ✓', threshold: 0.34 },
  { pos: [-2, 1.8, 1.2], label: '$$ deals', threshold: 0.42 },
  { pos: [0.5, 2.2, -2], label: 'pet ok', threshold: 0.50 },
  { pos: [-1.5, 1.5, 2], label: 'late hrs', threshold: 0.58 },
  { pos: [2.5, 1, 0.5], label: 'cozy ✓', threshold: 0.66 },
]

function DataNode({ position, label, scrollRef, threshold }: {
  position: [number, number, number]; label: string
  scrollRef: React.MutableRefObject<number>; threshold: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const ny = position[1] + 0.4

  useFrame(() => {
    if (!ref.current) return
    const t = Math.max(0, Math.min(1, (scrollRef.current - threshold) / 0.1))
    ref.current.scale.setScalar(t)
    ref.current.position.y = ny + Math.sin(Date.now() * 0.002) * 0.05
  })

  return (
    <group>
      <mesh ref={ref} position={[position[0], ny, position[2]]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial color="#A5B4FC" />
      </mesh>
      <Line
        points={[position, [position[0], ny - 0.05, position[2]]]}
        color="#818CF8" lineWidth={0.5} transparent opacity={0.3}
      />
      <Html position={[position[0], ny + 0.22, position[2]]} center>
        <div
          className="text-[10px] text-[#A5B4FC] font-mono whitespace-nowrap pointer-events-none select-none"
          style={{
            opacity: scrollRef.current > threshold + 0.08 ? 0.9 : 0,
            transition: 'opacity 0.4s',
            textShadow: '0 0 8px rgba(99,102,241,0.6)',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Camera rig
// ---------------------------------------------------------------------------

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const startPos = useMemo(() => new THREE.Vector3(5, 6, 8), [])
  const endPos = useMemo(() => new THREE.Vector3(2, 3, 5), [])

  useFrame(() => {
    camera.position.lerpVectors(startPos, endPos, scrollRef.current)
    camera.lookAt(target)
  })

  return null
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <CameraRig scrollRef={scrollRef} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} color="#F8FAFC" castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 8, -3]} intensity={0.4} color="#818CF8" />
      <hemisphereLight args={['#CBD5E1', '#1E293B', 0.4]} />

      {/* Fog */}
      <fog attach="fog" args={['#09090B', 12, 22]} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#111118" roughness={0.95} />
      </mesh>

      {/* The GLTF city model with fallback */}
      <CityWithFallback scrollRef={scrollRef} />

      {/* Data labels */}
      {DATA_LABELS.map((d, i) => (
        <DataNode key={i} position={d.pos} label={d.label} scrollRef={scrollRef} threshold={d.threshold} />
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Fallback scene — used when GLTF model hasn't loaded yet or fails
// ---------------------------------------------------------------------------

function FallbackCity({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = -0.3 + scrollRef.current * 0.6
  })

  // Simple procedural buildings as fallback
  const buildings = useMemo(() => {
    const arr: { pos: [number, number, number]; size: [number, number, number]; color: string }[] = []
    let seed = 42
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    for (let i = 0; i < 30; i++) {
      const x = (rand() - 0.5) * 8
      const z = (rand() - 0.5) * 8
      const h = 0.5 + rand() * 4
      const w = 0.3 + rand() * 0.5
      arr.push({
        pos: [x, h / 2, z],
        size: [w, h, w],
        color: rand() > 0.7 ? '#1E293B' : '#334155',
      })
    }
    return arr
  }, [])

  return (
    <group ref={groupRef}>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} roughness={0.5} metalness={0.4}
            emissive="#38BDF8" emissiveIntensity={0.15} />
        </mesh>
      ))}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Error boundary wrapper for GLTF loading
// ---------------------------------------------------------------------------

function CityWithFallback({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Suspense fallback={<FallbackCity scrollRef={scrollRef} />}>
      <CityModel scrollRef={scrollRef} />
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export function CitySceneCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
      camera={{ position: [5, 6, 8], fov: 45 }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
