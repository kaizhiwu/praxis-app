import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Building data — procedural city grid
// ---------------------------------------------------------------------------

interface BuildingData {
  position: [number, number, number]
  size: [number, number, number]
  mapped: boolean
  mapProgress: number // scroll threshold (0-1)
  dataLabel?: string
}

function generateCity(): BuildingData[] {
  const buildings: BuildingData[] = []
  const gridSize = 5
  const spacing = 2.2
  const offset = ((gridSize - 1) * spacing) / 2

  const mappedPositions = new Set(['1,1', '2,3', '3,1', '0,4', '4,2'])
  const labels = ['outlets ✓', 'quiet ✓', 'open now', 'wifi ✓', '$$ deals']
  let labelIdx = 0

  // Seeded random for deterministic layout
  let seed = 42
  function rand() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      if ((x === 2 && z !== 2) || (z === 2 && x !== 2)) continue
      const count = 1 + Math.floor(rand() * 2)
      for (let b = 0; b < count; b++) {
        const w = 0.4 + rand() * 0.6
        const h = 0.8 + rand() * 3.5
        const d = 0.4 + rand() * 0.6
        const bx = x * spacing - offset + (b * 0.7 - 0.35)
        const bz = z * spacing - offset + (rand() * 0.4 - 0.2)
        const key = `${x},${z}`
        const isMapped = mappedPositions.has(key) && b === 0

        buildings.push({
          position: [bx, h / 2, bz],
          size: [w, h, d],
          mapped: isMapped,
          mapProgress: isMapped ? 0.15 + labelIdx * 0.12 : 1,
          dataLabel: isMapped ? labels[labelIdx++] : undefined,
        })
      }
    }
  }
  return buildings
}

// ---------------------------------------------------------------------------
// Single building
// ---------------------------------------------------------------------------

function Building({
  data,
  scrollRef,
}: {
  data: BuildingData
  scrollRef: React.MutableRefObject<number>
}) {
  const edgesRef = useRef<THREE.LineSegments>(null)
  const solidRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(...data.size)),
    [data.size],
  )

  useFrame(() => {
    const progress = scrollRef.current
    if (data.mapped) {
      const t = Math.max(0, Math.min(1, (progress - data.mapProgress) / 0.2))
      if (solidRef.current) {
        const mat = solidRef.current.material as THREE.MeshPhysicalMaterial
        mat.opacity = t * 0.85
        mat.emissiveIntensity = t * 0.5
      }
      if (glowRef.current) {
        glowRef.current.scale.setScalar(1 + t * 0.2)
        const gMat = glowRef.current.material as THREE.MeshBasicMaterial
        gMat.opacity = t * 0.25
      }
      if (edgesRef.current) {
        const eMat = edgesRef.current.material as THREE.LineBasicMaterial
        eMat.opacity = 0.5 + t * 0.5
      }
    }
  })

  return (
    <group position={data.position}>
      <lineSegments ref={edgesRef} geometry={edgesGeo}>
        <lineBasicMaterial color="#6366F1" transparent opacity={0.5} />
      </lineSegments>
      {/* Faint fill so buildings have volume */}
      <mesh>
        <boxGeometry args={data.size} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.03} />
      </mesh>

      {data.mapped && (
        <>
          <mesh ref={solidRef}>
            <boxGeometry args={data.size} />
            <meshPhysicalMaterial
              color="#4F46E5"
              transparent
              opacity={0}
              roughness={0.2}
              metalness={0.1}
              emissive="#4F46E5"
              emissiveIntensity={0}
            />
          </mesh>
          <mesh ref={glowRef}>
            <boxGeometry args={[data.size[0] + 0.1, data.size[1] + 0.1, data.size[2] + 0.1]} />
            <meshBasicMaterial color="#818CF8" transparent opacity={0} />
          </mesh>
        </>
      )}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Data node
// ---------------------------------------------------------------------------

function DataNode({
  position,
  label,
  scrollRef,
  threshold,
}: {
  position: [number, number, number]
  label: string
  scrollRef: React.MutableRefObject<number>
  threshold: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const nodeY = position[1] + 0.6

  useFrame(() => {
    if (!ref.current) return
    const t = Math.max(0, Math.min(1, (scrollRef.current - threshold - 0.1) / 0.15))
    ref.current.scale.setScalar(t)
    ref.current.position.y = nodeY + Math.sin(Date.now() * 0.002) * 0.1
  })

  return (
    <group>
      <mesh ref={ref} position={[position[0], nodeY, position[2]]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.9} />
      </mesh>
      <Html position={[position[0], nodeY + 0.4, position[2]]} center>
        <div
          className="text-[10px] text-[#818CF8] font-mono whitespace-nowrap pointer-events-none"
          style={{ opacity: scrollRef.current > threshold + 0.2 ? 0.8 : 0, transition: 'opacity 0.5s' }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Ground + grid
// ---------------------------------------------------------------------------

function Ground() {
  const lines: [THREE.Vector3, THREE.Vector3][] = useMemo(() => {
    const result: [THREE.Vector3, THREE.Vector3][] = []
    const size = 10
    for (let i = -size; i <= size; i++) {
      result.push(
        [new THREE.Vector3(i, 0.01, -size), new THREE.Vector3(i, 0.01, size)],
        [new THREE.Vector3(-size, 0.01, i), new THREE.Vector3(size, 0.01, i)],
      )
    }
    return result
  }, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#0A0A0C" transparent opacity={0.8} />
      </mesh>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#6366F1" lineWidth={0.5} transparent opacity={0.1} />
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Camera rig — driven by external scroll value
// ---------------------------------------------------------------------------

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  const startPos = useMemo(() => new THREE.Vector3(0, 12, 10), [])
  const endPos = useMemo(() => new THREE.Vector3(3, 5, 6), [])

  useFrame(() => {
    const t = scrollRef.current
    camera.position.lerpVectors(startPos, endPos, t)
    camera.lookAt(target)
  })

  return null
}

// ---------------------------------------------------------------------------
// Scene — receives scroll from parent via ref
// ---------------------------------------------------------------------------

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const buildings = useMemo(() => generateCity(), [])
  const mappedNodes = useMemo(
    () =>
      buildings
        .filter((b) => b.mapped)
        .map((b) => ({
          position: [b.position[0], b.position[1] + b.size[1] / 2, b.position[2]] as [number, number, number],
          threshold: b.mapProgress,
          label: b.dataLabel || '',
        })),
    [buildings],
  )

  return (
    <>
      <CameraRig scrollRef={scrollRef} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#818CF8" />
      <directionalLight position={[-3, 8, -3]} intensity={0.2} color="#E2614B" />
      <Ground />
      {buildings.map((b, i) => (
        <Building key={i} data={b} scrollRef={scrollRef} />
      ))}
      {mappedNodes.map((node, i) => (
        <DataNode key={i} position={node.position} label={node.label} scrollRef={scrollRef} threshold={node.threshold} />
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Exported Canvas — scroll driven by parent ref
// ---------------------------------------------------------------------------

export function CitySceneCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 12, 10], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
