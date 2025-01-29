"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import type { Mesh } from "three"

function Box() {
  const meshRef = useRef<Mesh>(null!)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width / 5, viewport.height / 5, 1]}>
      <planeGeometry args={[1, 1, 10, 10]} />
      <meshStandardMaterial color="#8844ee" wireframe />
    </mesh>
  )
}

export function ThreeJSBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  )
}

