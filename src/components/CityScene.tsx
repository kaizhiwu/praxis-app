import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type BType = 'box' | 'tapered' | 'memorial' | 'park' | 'cylinder'

interface BData {
  pos: [number, number, number]
  size: [number, number, number]
  type: BType
  mapped: boolean
  mapAt: number
  label?: string
  baseColor: string
  emissiveColor: string
}

// ---------------------------------------------------------------------------
// Lower Manhattan — higher fidelity
// ---------------------------------------------------------------------------

function generateLowerManhattan(): BData[] {
  const b: BData[] = []
  const labels = ['outlets ✓', 'quiet ✓', 'open now', 'wifi ✓', '$$ deals', 'pet ok', 'late hrs', 'cozy ✓']
  let li = 0
  const mapped = () => li < labels.length
  const mp = () => 0.1 + li * 0.08

  const steel = '#334155'
  const steelGlow = '#38BDF8'
  const glass = '#1E293B'
  const glassGlow = '#818CF8'
  const warm = '#44403C'
  const warmGlow = '#F59E0B'
  const green = '#166534'
  const greenGlow = '#34D399'

  // === ONE WTC (Freedom Tower) — tallest landmark ===
  b.push({ pos: [0, 4, 0], size: [1.0, 8, 1.0], type: 'tapered', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: glass, emissiveColor: glassGlow })
  li++

  // === 7 WTC — north ===
  b.push({ pos: [0.3, 2.2, -2], size: [0.7, 4.4, 0.7], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: glass, emissiveColor: glassGlow })
  li++

  // === Two WTC (unbuilt but planned) ===
  b.push({ pos: [1.6, 2.5, 0.8], size: [0.8, 5, 0.8], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: glass, emissiveColor: glassGlow })
  li++

  // === Three WTC ===
  b.push({ pos: [-1.4, 1.9, 1.2], size: [0.65, 3.8, 0.65], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: steel, emissiveColor: steelGlow })
  li++

  // === Four WTC ===
  b.push({ pos: [1.4, 1.4, -0.6], size: [0.55, 2.8, 0.55], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: steel, emissiveColor: steelGlow })
  li++

  // === 9/11 Memorial pools ===
  b.push({ pos: [-0.7, 0.015, 1.8], size: [1.1, 0.03, 1.1], type: 'memorial', mapped: false, mapAt: 1, baseColor: '#0C4A6E', emissiveColor: '#38BDF8' })
  b.push({ pos: [0.7, 0.015, 2.1], size: [1.1, 0.03, 1.1], type: 'memorial', mapped: false, mapAt: 1, baseColor: '#0C4A6E', emissiveColor: '#38BDF8' })

  // === Brookfield Place ===
  b.push({ pos: [-3, 1.5, 0.2], size: [0.7, 3, 0.6], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: steel, emissiveColor: steelGlow })
  li++
  b.push({ pos: [-3.5, 1.1, -0.7], size: [0.55, 2.2, 0.5], type: 'box', mapped: false, mapAt: 1, baseColor: steel, emissiveColor: steelGlow })
  b.push({ pos: [-2.5, 0.95, -0.9], size: [0.5, 1.9, 0.45], type: 'box', mapped: false, mapAt: 1, baseColor: steel, emissiveColor: steelGlow })
  b.push({ pos: [-3.2, 0.7, 1.1], size: [0.45, 1.4, 0.4], type: 'box', mapped: false, mapAt: 1, baseColor: steel, emissiveColor: steelGlow })

  // === One Liberty Plaza ===
  b.push({ pos: [2.6, 1.7, 2.2], size: [0.7, 3.4, 0.6], type: 'box', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: steel, emissiveColor: steelGlow })
  li++

  // === 30 Hudson Yards style tower ===
  b.push({ pos: [-1.8, 1.3, -1.8], size: [0.6, 2.6, 0.5], type: 'box', mapped: false, mapAt: 1, baseColor: glass, emissiveColor: glassGlow })

  // === Battery Park ===
  b.push({ pos: [-1.2, 0.02, 4.8], size: [3, 0.04, 1.8], type: 'park', mapped: mapped(), mapAt: mp(), label: labels[li], baseColor: green, emissiveColor: greenGlow })
  if (li < labels.length) li++

  // === Wall Street cluster ===
  const wallSt: [number, number, number, number][] = [
    [3.2, 2.4, -1.8, 0.5], [3.8, 1.6, -1.2, 0.45], [4.2, 1.0, -0.4, 0.4],
    [3.5, 0.8, 0.2, 0.35], [4.0, 1.3, -2.5, 0.4], [2.8, 0.6, -2.8, 0.35],
  ]
  for (const [wx, wh, wz, ww] of wallSt) {
    b.push({ pos: [wx, wh / 2, wz], size: [ww, wh, ww * 0.9], type: 'box', mapped: false, mapAt: 1, baseColor: warm, emissiveColor: warmGlow })
  }

  // === Filler buildings — denser urban fabric ===
  const fillers: [number, number, number, number, number][] = [
    [-2, 1.4, 3, 0.4, 2.8], [0.8, 0.8, 4, 0.35, 1.6], [2.8, 0.5, 0.5, 0.3, 1],
    [-3.8, 1.0, 2.5, 0.4, 2], [2.2, 0.7, -2.2, 0.35, 1.4], [-0.8, 0.6, -1.8, 0.35, 1.2],
    [-4.2, 0.8, -1.2, 0.4, 1.6], [0.3, 0.5, -2.8, 0.3, 1], [-2.8, 0.6, -2.2, 0.35, 1.2],
    [3.8, 0.5, 1.8, 0.3, 1], [-4.0, 0.6, 1.2, 0.35, 1.2], [1.2, 0.4, -3.2, 0.3, 0.8],
    [-1, 0.9, -3, 0.4, 1.8], [1.8, 0.5, 3.5, 0.3, 1], [-0.3, 0.45, 3.8, 0.3, 0.9],
    [3, 0.6, 3.2, 0.35, 1.2], [-3, 0.5, 3.5, 0.3, 1], [0, 0.4, -3.5, 0.3, 0.8],
    [-4.5, 0.5, 0, 0.3, 1], [4.5, 0.4, 0.5, 0.25, 0.8],
  ]
  for (const [fx, _fh, fz, fw, fht] of fillers) {
    b.push({ pos: [fx, fht / 2, fz], size: [fw, fht, fw * 0.85], type: 'box', mapped: false, mapAt: 1, baseColor: steel, emissiveColor: steelGlow })
  }

  return b
}

// ---------------------------------------------------------------------------
// Building — solid mesh with subtle edge highlight
// ---------------------------------------------------------------------------

function Building({ data, scrollRef }: { data: BData; scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const edgeRef = useRef<THREE.LineSegments>(null)

  const geo = useMemo(() => {
    const [w, h, d] = data.size
    if (data.type === 'tapered') return new THREE.CylinderGeometry(w * 0.38, w * 0.52, h, 4)
    if (data.type === 'cylinder') return new THREE.CylinderGeometry(w / 2, w / 2, h, 16)
    return new THREE.BoxGeometry(w, h, d)
  }, [data.size, data.type])

  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geo, 20), [geo])

  useFrame(() => {
    if (!data.mapped) return
    const t = Math.max(0, Math.min(1, (scrollRef.current - data.mapAt) / 0.15))
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.3 + t * 0.8
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + t * 0.08)
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = t * 0.15
    }
    if (edgeRef.current) {
      ;(edgeRef.current.material as THREE.LineBasicMaterial).opacity = 0.15 + t * 0.4
    }
  })

  const isMem = data.type === 'memorial'

  return (
    <group position={data.pos} rotation={data.type === 'tapered' ? [0, Math.PI / 4, 0] : undefined}>
      {/* Main solid mesh */}
      <mesh ref={meshRef} geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial
          color={data.baseColor}
          roughness={isMem ? 0.9 : 0.4}
          metalness={isMem ? 0 : 0.6}
          emissive={data.emissiveColor}
          emissiveIntensity={data.mapped ? 0 : isMem ? 0.5 : 0.3}
          transparent={isMem}
          opacity={isMem ? 0.6 : 1}
        />
      </mesh>

      {/* Subtle edge lines for definition */}
      <lineSegments ref={edgeRef} geometry={edgeGeo}>
        <lineBasicMaterial color={data.emissiveColor} transparent opacity={0.15} />
      </lineSegments>

      {/* Antenna for One WTC */}
      {data.type === 'tapered' && (
        <group position={[0, data.size[1] / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.03, 1.8, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          {/* Beacon light */}
          <pointLight position={[0, 1, 0]} color="#38BDF8" intensity={0.5} distance={3} />
        </group>
      )}

      {/* Memorial inner pool glow */}
      {isMem && (
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[data.size[0] * 0.85, 0.01, data.size[2] * 0.85]} />
          <meshBasicMaterial color="#1E40AF" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Park trees */}
      {data.type === 'park' && (
        <>
          {[[-0.5, -0.3], [0.4, 0.3], [-0.1, 0.6], [0.7, -0.4], [1.0, 0.2], [-0.8, 0.1], [0.2, -0.6]].map(([tx, tz], i) => (
            <group key={i} position={[tx, 0.02, tz]}>
              <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.02, 0.03, 0.35, 6]} />
                <meshStandardMaterial color="#3F2D17" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.14, 0.45, 6]} />
                <meshStandardMaterial color="#166534" roughness={0.7} emissive="#22C55E" emissiveIntensity={0.08} />
              </mesh>
            </group>
          ))}
        </>
      )}

      {/* Mapped glow shell */}
      {data.mapped && (
        <mesh ref={glowRef}>
          <boxGeometry args={[data.size[0] + 0.1, data.size[1] + 0.1, data.size[2] + 0.1]} />
          <meshBasicMaterial color={data.emissiveColor} transparent opacity={0} />
        </mesh>
      )}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Data node
// ---------------------------------------------------------------------------

function DataNode({ position, label, scrollRef, threshold }: {
  position: [number, number, number]; label: string
  scrollRef: React.MutableRefObject<number>; threshold: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const ny = position[1] + 0.5

  useFrame(() => {
    if (!ref.current) return
    const t = Math.max(0, Math.min(1, (scrollRef.current - threshold - 0.05) / 0.12))
    ref.current.scale.setScalar(t)
    ref.current.position.y = ny + Math.sin(Date.now() * 0.002) * 0.05
  })

  return (
    <group>
      <mesh ref={ref} position={[position[0], ny, position[2]]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial color="#A5B4FC" />
      </mesh>
      <Line points={[position, [position[0], ny - 0.06, position[2]]]} color="#818CF8" lineWidth={0.5} transparent opacity={0.3} />
      <Html position={[position[0], ny + 0.25, position[2]]} center>
        <div className="text-[10px] text-[#A5B4FC] font-mono whitespace-nowrap pointer-events-none select-none"
          style={{ opacity: scrollRef.current > threshold + 0.1 ? 0.9 : 0, transition: 'opacity 0.4s', textShadow: '0 0 8px rgba(99,102,241,0.6)' }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Ground
// ---------------------------------------------------------------------------

function Ground() {
  const grid = useMemo(() => {
    const r: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = -10; i <= 10; i++) {
      r.push([new THREE.Vector3(i, 0.005, -10), new THREE.Vector3(i, 0.005, 10)])
      r.push([new THREE.Vector3(-10, 0.005, i), new THREE.Vector3(10, 0.005, i)])
    }
    return r
  }, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#111118" roughness={0.95} metalness={0} emissive="#0F172A" emissiveIntensity={0.2} />
      </mesh>
      {grid.map((pts, i) => (
        <Line key={i} points={pts} color="#1E293B" lineWidth={0.5} transparent opacity={0.3} />
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 1, 1), [])
  const startPos = useMemo(() => new THREE.Vector3(6, 10, 12), [])
  const endPos = useMemo(() => new THREE.Vector3(3, 4, 7), [])

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
  const buildings = useMemo(() => generateLowerManhattan(), [])
  const nodes = useMemo(() =>
    buildings.filter(b => b.mapped).map(b => ({
      position: [b.pos[0], b.pos[1] + b.size[1] / 2, b.pos[2]] as [number, number, number],
      threshold: b.mapAt, label: b.label || '',
    })), [buildings])

  return (
    <>
      <CameraRig scrollRef={scrollRef} />

      {/* Lighting — strong enough to see solid geometry */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 15, 6]} intensity={1.5} color="#CBD5E1" castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        shadow-camera-far={30} shadow-camera-left={-10} shadow-camera-right={10}
        shadow-camera-top={10} shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 8, -4]} intensity={0.6} color="#818CF8" />
      <pointLight position={[0, 8, 0]} intensity={1} color="#38BDF8" distance={15} />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#6366F1" distance={10} />

      {/* Subtle fog for depth — start far enough to not obscure buildings */}
      <fog attach="fog" args={['#09090B', 15, 28]} />

      <Ground />
      {buildings.map((b, i) => <Building key={i} data={b} scrollRef={scrollRef} />)}
      {nodes.map((n, i) => <DataNode key={i} position={n.position} label={n.label} scrollRef={scrollRef} threshold={n.threshold} />)}
    </>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export function CitySceneCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      camera={{ position: [6, 10, 12], fov: 50 }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
