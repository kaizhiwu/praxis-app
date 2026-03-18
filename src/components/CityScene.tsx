import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Seeded RNG
// ---------------------------------------------------------------------------
let _seed = 42
function resetSeed() { _seed = 42 }
function rand() {
  _seed = (_seed * 16807) % 2147483647
  return (_seed - 1) / 2147483646
}

// ---------------------------------------------------------------------------
// Building data
// ---------------------------------------------------------------------------

interface BuildingData {
  position: [number, number, number]
  size: [number, number, number]
  mapped: boolean
  mapProgress: number
  dataLabel?: string
  hasWindows: boolean
  hasAntenna: boolean
  windowRows: number
  windowCols: number
}

function generateCity(): BuildingData[] {
  resetSeed()
  const buildings: BuildingData[] = []

  // City blocks: 4x4 blocks separated by streets
  const blocksX = 4
  const blocksZ = 4
  const blockSize = 2.4
  const streetWidth = 0.8
  const totalSpacing = blockSize + streetWidth
  const offsetX = ((blocksX - 1) * totalSpacing) / 2
  const offsetZ = ((blocksZ - 1) * totalSpacing) / 2

  // Mapped buildings — specific block,building combos
  const mappedKeys = new Set([
    '0,1-0', '1,2-1', '2,0-0', '3,3-0', '1,0-2',
    '2,2-0', '0,3-1', '3,1-0',
  ])
  const labels = [
    'outlets ✓', 'quiet ✓', 'open now', 'wifi ✓',
    '$$ deals', 'pet ok', 'late hrs', 'cozy ✓',
  ]
  let labelIdx = 0

  for (let bx = 0; bx < blocksX; bx++) {
    for (let bz = 0; bz < blocksZ; bz++) {
      const blockCenterX = bx * totalSpacing - offsetX
      const blockCenterZ = bz * totalSpacing - offsetZ
      const numBuildings = 3 + Math.floor(rand() * 3) // 3-5 per block

      for (let b = 0; b < numBuildings; b++) {
        const w = 0.35 + rand() * 0.55
        const d = 0.35 + rand() * 0.55
        // Height variety: mostly mid-rise, some towers, some short
        const heightRoll = rand()
        let h: number
        if (heightRoll > 0.9) h = 3.5 + rand() * 3.0       // tall tower
        else if (heightRoll > 0.5) h = 1.5 + rand() * 2.0   // mid-rise
        else h = 0.5 + rand() * 1.0                          // short shop

        // Position within block — arranged in a rough grid within the block
        const col = b % 3
        const row = Math.floor(b / 3)
        const px = blockCenterX + (col - 1) * 0.85 + (rand() * 0.2 - 0.1)
        const pz = blockCenterZ + (row - 0.5) * 0.85 + (rand() * 0.2 - 0.1)

        const key = `${bx},${bz}-${b}`
        const isMapped = mappedKeys.has(key) && labelIdx < labels.length

        buildings.push({
          position: [px, h / 2, pz],
          size: [w, h, d],
          mapped: isMapped,
          mapProgress: isMapped ? 0.1 + labelIdx * 0.08 : 1,
          dataLabel: isMapped ? labels[labelIdx] : undefined,
          hasWindows: h > 1.5,
          hasAntenna: h > 4.0 && rand() > 0.4,
          windowRows: Math.max(2, Math.floor(h / 0.5)),
          windowCols: Math.max(2, Math.floor(w / 0.2)),
        })
        if (isMapped) labelIdx++
      }
    }
  }
  return buildings
}

// ---------------------------------------------------------------------------
// Window lines geometry — etched horizontal + vertical lines on faces
// ---------------------------------------------------------------------------

function buildWindowLines(size: [number, number, number], rows: number, cols: number): THREE.BufferGeometry {
  const [w, h, d] = size
  const points: number[] = []
  const hw = w / 2
  const hh = h / 2
  const hd = d / 2
  const margin = 0.06

  // Front + back face window grid
  for (const zSign of [1, -1]) {
    const z = hd * zSign
    // Horizontal lines
    for (let r = 1; r < rows; r++) {
      const y = -hh + margin + ((h - margin * 2) * r) / rows
      points.push(-hw + margin, y, z, hw - margin, y, z)
    }
    // Vertical lines
    for (let c = 1; c < cols; c++) {
      const x = -hw + margin + ((w - margin * 2) * c) / cols
      points.push(x, -hh + margin, z, x, hh - margin, z)
    }
  }

  // Left + right face
  for (const xSign of [1, -1]) {
    const x = hw * xSign
    const faceCols = Math.max(2, Math.floor(d / 0.2))
    for (let r = 1; r < rows; r++) {
      const y = -hh + margin + ((h - margin * 2) * r) / rows
      points.push(x, y, -hd + margin, x, y, hd - margin)
    }
    for (let c = 1; c < faceCols; c++) {
      const z = -hd + margin + ((d - margin * 2) * c) / faceCols
      points.push(x, -hh + margin, z, x, hh - margin, z)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  return geo
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
  const windowRef = useRef<THREE.LineSegments>(null)
  const solidRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(...data.size)),
    [data.size],
  )

  const windowGeo = useMemo(
    () => data.hasWindows ? buildWindowLines(data.size, data.windowRows, data.windowCols) : null,
    [data.size, data.hasWindows, data.windowRows, data.windowCols],
  )

  useFrame(() => {
    const progress = scrollRef.current
    if (data.mapped) {
      const t = Math.max(0, Math.min(1, (progress - data.mapProgress) / 0.15))
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
        eMat.opacity = 0.6 + t * 0.4
        eMat.color.set(t > 0.5 ? '#A5B4FC' : '#38BDF8')
      }
      if (windowRef.current) {
        const wMat = windowRef.current.material as THREE.LineBasicMaterial
        wMat.opacity = 0.15 + t * 0.3
      }
    }
  })

  return (
    <group position={data.position}>
      {/* Main wireframe edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeo}>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.55} />
      </lineSegments>

      {/* Window grid lines */}
      {windowGeo && (
        <lineSegments ref={windowRef} geometry={windowGeo}>
          <lineBasicMaterial color="#38BDF8" transparent opacity={0.15} />
        </lineSegments>
      )}

      {/* Faint volume fill */}
      <mesh>
        <boxGeometry args={data.size} />
        <meshBasicMaterial color="#0EA5E9" transparent opacity={0.02} />
      </mesh>

      {/* Antenna spire on tall buildings */}
      {data.hasAntenna && (
        <group position={[0, data.size[1] / 2, 0]}>
          <Line
            points={[[0, 0, 0], [0, 0.8, 0]]}
            color="#38BDF8"
            lineWidth={1}
            transparent
            opacity={0.4}
          />
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {/* Mapped building fill + glow */}
      {data.mapped && (
        <>
          <mesh ref={solidRef}>
            <boxGeometry args={data.size} />
            <meshPhysicalMaterial
              color="#6366F1"
              transparent
              opacity={0}
              roughness={0.2}
              metalness={0.1}
              emissive="#6366F1"
              emissiveIntensity={0}
            />
          </mesh>
          <mesh ref={glowRef}>
            <boxGeometry args={[data.size[0] + 0.12, data.size[1] + 0.12, data.size[2] + 0.12]} />
            <meshBasicMaterial color="#818CF8" transparent opacity={0} />
          </mesh>
        </>
      )}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Data node — floating label above mapped buildings
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
    const t = Math.max(0, Math.min(1, (scrollRef.current - threshold - 0.05) / 0.12))
    ref.current.scale.setScalar(t)
    ref.current.position.y = nodeY + Math.sin(Date.now() * 0.002) * 0.08
  })

  return (
    <group>
      <mesh ref={ref} position={[position[0], nodeY, position[2]]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#A5B4FC" transparent opacity={0.9} />
      </mesh>
      {/* Vertical connection line from building to node */}
      <Line
        points={[[position[0], position[1], position[2]], [position[0], nodeY - 0.1, position[2]]]}
        color="#818CF8"
        lineWidth={0.5}
        transparent
        opacity={0.3}
      />
      <Html position={[position[0], nodeY + 0.35, position[2]]} center>
        <div
          className="text-[10px] text-[#A5B4FC] font-mono whitespace-nowrap pointer-events-none select-none"
          style={{
            opacity: scrollRef.current > threshold + 0.12 ? 0.9 : 0,
            transition: 'opacity 0.5s',
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
// Ground — grid + street lines
// ---------------------------------------------------------------------------

function Ground() {
  const gridLines: [THREE.Vector3, THREE.Vector3][] = useMemo(() => {
    const result: [THREE.Vector3, THREE.Vector3][] = []
    const size = 12
    const step = 0.8
    for (let i = -size; i <= size; i += step) {
      result.push(
        [new THREE.Vector3(i, 0.01, -size), new THREE.Vector3(i, 0.01, size)],
        [new THREE.Vector3(-size, 0.01, i), new THREE.Vector3(size, 0.01, i)],
      )
    }
    return result
  }, [])

  // Street markings — dashed center lines
  const streetLines: [THREE.Vector3, THREE.Vector3][] = useMemo(() => {
    const result: [THREE.Vector3, THREE.Vector3][] = []
    const blocksX = 4
    const blocksZ = 4
    const blockSize = 2.4
    const streetWidth = 0.8
    const totalSpacing = blockSize + streetWidth
    const offsetX = ((blocksX - 1) * totalSpacing) / 2
    const offsetZ = ((blocksZ - 1) * totalSpacing) / 2

    // Horizontal streets (between block rows)
    for (let bz = 0; bz < blocksZ - 1; bz++) {
      const z = bz * totalSpacing - offsetZ + blockSize / 2 + streetWidth / 2
      for (let dash = -8; dash < 8; dash++) {
        result.push(
          [new THREE.Vector3(dash * 1.0, 0.02, z), new THREE.Vector3(dash * 1.0 + 0.5, 0.02, z)],
        )
      }
    }
    // Vertical streets
    for (let bx = 0; bx < blocksX - 1; bx++) {
      const x = bx * totalSpacing - offsetX + blockSize / 2 + streetWidth / 2
      for (let dash = -8; dash < 8; dash++) {
        result.push(
          [new THREE.Vector3(x, 0.02, dash * 1.0), new THREE.Vector3(x, 0.02, dash * 1.0 + 0.5)],
        )
      }
    }
    return result
  }, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshBasicMaterial color="#09090B" transparent opacity={0.9} />
      </mesh>
      {/* Subtle grid */}
      {gridLines.map((pts, i) => (
        <Line key={i} points={pts} color="#38BDF8" lineWidth={0.5} transparent opacity={0.06} />
      ))}
      {/* Street center dashes */}
      {streetLines.map((pts, i) => (
        <Line key={`s${i}`} points={pts} color="#38BDF8" lineWidth={1} transparent opacity={0.2} />
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
// Scene
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
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#38BDF8" />
      <directionalLight position={[-3, 8, -3]} intensity={0.2} color="#818CF8" />
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
// Exported Canvas
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
