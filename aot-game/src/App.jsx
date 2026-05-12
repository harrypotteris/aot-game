import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Game from "./scenes/Game"

export default function App() {

  return (

    <Canvas
      camera={{
        position: [0, 0, 22],
        fov: 40
      }}
    >

      {/* BACKGROUND */}
      <color
        attach="background"
        args={["#d9d9d9"]}
      />

      {/* LIGHTS */}
      <ambientLight intensity={2.5} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
      />

      <directionalLight
        position={[-10, 5, 5]}
        intensity={1}
      />

      {/* GAME */}
      <Game />

      {/* CONTROLS */}
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={30}
      />

    </Canvas>
  )
}