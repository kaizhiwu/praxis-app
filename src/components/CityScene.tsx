import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type BType = 'box' | 'tapered' | 'memorial' | 'park' | 'wing' | 'cylinder'

interface BData {
  pos: [number, number, number]
  size: [number, number, number]
  type: BType
  mapped: boolean
  mapAt: number
  label?: string
  color: string
  fill: string
  name?: string
}

// ---------------------------------------------------------------------------
// Lower Manhattan layout — WTC area
// ---------------------------------------------------------------------------

function generateLowerManhattan(): BData[] {
  const b: BData[] = []
  const labels = ['outlets ✓', 'quiet ✓', 'open now', 'wifi ✓', '$$ deals', 'pet ok', 'late hrs', 'cozy ✓']
  let li = 0
  const mapped = (i: number) => i < labels.length
  const mp = (i: number) => 0.1 + i * 0.08

  const cyan = '#38BDF8'
  const cyanFill = '#0C4A6E'
  const gold = '#FBBF24'
  const goldFill = '#78350F'
  const green = '#34D399'
  const greenFill = '#065F46'
  const white = '#E2E8F0'
  const whiteFill = '#334155'

  // === One WTC (Freedom Tower) — tallest, center anchor ===
  // Tapered tower: wide base narrowing upward, antenna spire
  b.push({ pos: [0, 3.5, 0], size: [1.1, 7, 1.1], type: 'tapered', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill, name: 'One WTC' })
  li++

  // === Two WTC — shorter, slightly SE ===
  b.push({ pos: [1.8, 2, 1.2], size: [0.8, 4, 0.8], type: 'box', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill })
  li++

  // === Three WTC — medium, SW ===
  b.push({ pos: [-1.5, 1.75, 1.5], size: [0.7, 3.5, 0.7], type: 'box', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill })
  li++

  // === Four WTC — shorter, SE ===
  b.push({ pos: [1.5, 1.25, -0.8], size: [0.6, 2.5, 0.6], type: 'box', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill })
  li++

  // === 9/11 Memorial — two square pools (voids) ===
  b.push({ pos: [-0.8, 0.02, 1.8], size: [1.2, 0.04, 1.2], type: 'memorial', mapped: false, mapAt: 1, color: '#94A3B8', fill: '#1E293B' })
  b.push({ pos: [0.8, 0.02, 2.2], size: [1.2, 0.04, 1.2], type: 'memorial', mapped: false, mapAt: 1, color: '#94A3B8', fill: '#1E293B' })

  // === Oculus — winged transit hub ===
  b.push({ pos: [0, 0.4, 3.2], size: [2.0, 0.8, 0.6], type: 'wing', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: white, fill: whiteFill })
  li++

  // === Brookfield Place — cluster of 3 mid-rise ===
  b.push({ pos: [-3.0, 1.25, 0], size: [0.7, 2.5, 0.6], type: 'box', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill })
  li++
  b.push({ pos: [-3.5, 1, -0.8], size: [0.6, 2, 0.5], type: 'box', mapped: false, mapAt: 1, color: cyan, fill: cyanFill })
  b.push({ pos: [-2.6, 0.9, -1.0], size: [0.5, 1.8, 0.5], type: 'box', mapped: false, mapAt: 1, color: cyan, fill: cyanFill })

  // === One Liberty Plaza ===
  b.push({ pos: [2.8, 1.5, 2.5], size: [0.8, 3, 0.6], type: 'box', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: cyan, fill: cyanFill })
  li++

  // === Battery Park — green area at southern tip ===
  b.push({ pos: [-1.5, 0.03, 4.5], size: [3, 0.06, 2], type: 'park', mapped: mapped(li), mapAt: mp(li), label: labels[li], color: green, fill: greenFill })
  if (li < labels.length) li++

  // === Wall Street area — cluster of old financial buildings ===
  b.push({ pos: [3.5, 1, -2], size: [0.5, 2, 0.5], type: 'box', mapped: false, mapAt: 1, color: gold, fill: goldFill })
  b.push({ pos: [4.2, 0.7, -1.5], size: [0.4, 1.4, 0.6], type: 'box', mapped: false, mapAt: 1, color: gold, fill: goldFill })
  b.push({ pos: [3.8, 0.5, -0.5], size: [0.5, 1, 0.4], type: 'box', mapped: false, mapAt: 1, color: gold, fill: goldFill })

  // === Filler buildings — generic smaller structures ===
  const fillers: [number, number, number, number][] = [
    [-2, 0.6, 3, 1.2], [1, 0.4, 4, 0.8], [3, 0.5, 0.5, 1],
    [-3.5, 0.8, 2.5, 1.6], [2.5, 0.6, -2, 1.2], [-1, 0.5, -1.5, 1],
    [-4, 0.7, -1.5, 1.4], [0.5, 0.45, -2.5, 0.9], [-2.5, 0.55, -2, 1.1],
    [4, 0.4, 1.5, 0.8], [-4.2, 0.5, 1, 1], [1.5, 0.35, -3, 0.7],
  ]
  for (const [fx, fh, fz, fht] of fillers) {
    b.push({ pos: [fx, fht / 2, fz], size: [0.4 + fh * 0.3, fht, 0.4 + fh * 0.2], type: 'box', mapped: false, mapAt: 1, color: cyan, fill: cyanFill })
  }

  return b
}

// ---------------------------------------------------------------------------
// Building component
// ---------------------------------------------------------------------------

function Building({ data, scrollRef }: { data: BData; scrollRef: React.MutableRefObject<number> }) {
  const edgesRef = useRef<THREE.LineSegments>(null)
  const mapRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const mainGeo = useMemo(() => {
    const [w, h, d] = data.size
    if (data.type === 'cylinder') return new THREE.CylinderGeometry(w / 2, w / 2, h, 16)
    if (data.type === 'tapered') return new THREE.CylinderGeometry(w * 0.35, w * 0.5, h, 4)
    return new THREE.BoxGeometry(w, h, d)
  }, [data.size, data.type])

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(mainGeo, 15), [mainGeo])

  useFrame(() => {
    if (!data.mapped) return
    const t = Math.max(0, Math.min(1, (scrollRef.current - data.mapAt) / 0.15))
    if (mapRef.current) (mapRef.current.material as THREE.MeshBasicMaterial).opacity = t * 0.3
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + t * 0.12)
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = t * 0.1
    }
    if (edgesRef.current) (edgesRef.current.material as THREE.LineBasicMaterial).opacity = 0.7 + t * 0.3
  })

  return (
    <group position={data.pos} rotation={data.type === 'tapered' ? [0, Math.PI / 4, 0] : undefined}>
      {/* Solid fill */}
      <mesh geometry={mainGeo}>
        <meshBasicMaterial color={data.fill} transparent opacity={data.type === 'memorial' ? 0.15 : 0.08} />
      </mesh>

      {/* Edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeo}>
        <lineBasicMaterial color={data.color} transparent opacity={0.7} />
      </lineSegments>

      {/* Memorial inner void lines */}
      {data.type === 'memorial' && (
        <lineSegments geometry={new THREE.EdgesGeometry(new THREE.BoxGeometry(data.size[0] * 0.8, 0.02, data.size[2] * 0.8))}>
          <lineBasicMaterial color="#60A5FA" transparent opacity={0.4} />
        </lineSegments>
      )}

      {/* Oculus wing spines */}
      {data.type === 'wing' && (
        <>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.8, 0.3, 0]} rotation={[0, 0, side * 0.4]}>
              <Line points={[[0, 0, 0], [side * 0.6, 0.5, 0]]} color={data.color} lineWidth={1.5} transparent opacity={0.6} />
              <Line points={[[0, 0, -0.15], [side * 0.5, 0.4, -0.15]]} color={data.color} lineWidth={1} transparent opacity={0.4} />
              <Line points={[[0, 0, 0.15], [side * 0.5, 0.4, 0.15]]} color={data.color} lineWidth={1} transparent opacity={0.4} />
            </group>
          ))}
        </>
      )}

      {/* Antenna spire for One WTC */}
      {data.type === 'tapered' && (
        <group position={[0, data.size[1] / 2, 0]}>
          <Line points={[[0, 0, 0], [0, 1.5, 0]]} color={data.color} lineWidth={1.5} transparent opacity={0.6} />
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
          </mesh>
        </group>
      )}

      {/* Park trees */}
      {data.type === 'park' && (
        <>
          {[[-0.6, 0.03, -0.3], [0.3, 0.03, 0.2], [-0.2, 0.03, 0.5], [0.7, 0.03, -0.4], [1.0, 0.03, 0.3]].map(([tx, ty, tz], i) => (
            <group key={i} position={[tx, ty, tz]}>
              <Line points={[[0, 0, 0], [0, 0.3, 0]]} color="#059669" lineWidth={1} transparent opacity={0.4} />
              <mesh position={[0, 0.55, 0]}>
                <coneGeometry args={[0.15, 0.4, 6]} />
                <meshBasicMaterial color={data.fill} transparent opacity={0.12} />
              </mesh>
              <lineSegments geometry={new THREE.EdgesGeometry(new THREE.ConeGeometry(0.15, 0.4, 6), 15)} position={[0, 0.55, 0]}>
                <lineBasicMaterial color={data.color} transparent opacity={0.5} />
              </lineSegments>
            </group>
          ))}
        </>
      )}

      {/* Mapped overlay */}
      {data.mapped && (
        <>
          <mesh ref={mapRef} geometry={mainGeo}>
            <meshBasicMaterial color="#818CF8" transparent opacity={0} />
          </mesh>
          <mesh ref={glowRef}>
            <boxGeometry args={[data.size[0] + 0.15, data.size[1] + 0.15, data.size[2] + 0.15]} />
            <meshBasicMaterial color="#A5B4FC" transparent opacity={0} />
          </mesh>
        </>
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
    ref.current.position.y = ny + Math.sin(Date.now() * 0.002) * 0.06
  })

  return (
    <group>
      <mesh ref={ref} position={[position[0], ny, position[2]]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshBasicMaterial color="#A5B4FC" transparent opacity={0.9} />
      </mesh>
      <Line points={[position, [position[0], ny - 0.07, position[2]]]} color="#818CF8" lineWidth={0.5} transparent opacity={0.2} />
      <Html position={[position[0], ny + 0.28, position[2]]} center>
        <div className="text-[10px] text-[#A5B4FC] font-mono whitespace-nowrap pointer-events-none select-none"
          style={{ opacity: scrollRef.current > threshold + 0.1 ? 0.9 : 0, transition: 'opacity 0.4s', textShadow: '0 0 6px rgba(99,102,241,0.5)' }}>
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
  const lines = useMemo(() => {
    const r: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = -10; i <= 10; i++) {
      r.push([new THREE.Vector3(i, 0.01, -10), new THREE.Vector3(i, 0.01, 10)])
      r.push([new THREE.Vector3(-10, 0.01, i), new THREE.Vector3(10, 0.01, i)])
    }
    return r
  }, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#09090B" transparent opacity={0.9} />
      </mesh>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#38BDF8" lineWidth={0.5} transparent opacity={0.04} />
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Camera rig
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.3} color="#38BDF8" />
      <directionalLight position={[-3, 8, -3]} intensity={0.15} color="#818CF8" />
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
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}
      camera={{ position: [6, 10, 12], fov: 50 }} style={{ background: 'transparent' }}>
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
