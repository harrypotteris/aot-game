import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Leaves() {
  const meshRef = useRef()

  const count = 100

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = Math.random() * 20 + 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = -Math.random() * 0.01 - 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return vel
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const positions = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3] * delta * 60
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60

      // Reset if fallen too low
      if (positions[i * 3 + 1] < -7) {
        positions[i * 3 + 1] = 20
        positions[i * 3] = (Math.random() - 0.5) * 50
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8B4513"
        transparent
        opacity={0.8}
      />
    </points>
  )
}