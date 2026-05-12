import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky, Cloud } from "@react-three/drei"

import Game from "./scenes/Game"
import Leaves from "./components/Leaves"

export default function App() {

  return (

    <Canvas
      camera={{
        position: [0, 0, 22],
        fov: 40
      }}
      fog={{ color: '#e6f7ff', near: 20, far: 100 }}
    >

      {/* SKY */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      {/* CLOUDS */}
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={10}
        depth={1.5}
        segments={20}
        position={[0, 10, -20]}
      />

      {/* LIGHTS */}
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[-10, 5, 5]}
        intensity={0.5}
      />

      {/* GROUND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial color="#4a7c59" />
      </mesh>

      {/* TREES */}
      <group>
        {/* Tree 1 */}
        <mesh position={[-15, -5, -10]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 4]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-15, -2, -10]} castShadow>
          <sphereGeometry args={[2]} />
          <meshLambertMaterial color="#228B22" />
        </mesh>

        {/* Tree 2 */}
        <mesh position={[15, -5, -15]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 4]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
        <mesh position={[15, -2, -15]} castShadow>
          <sphereGeometry args={[2]} />
          <meshLambertMaterial color="#228B22" />
        </mesh>

        {/* Tree 3 */}
        <mesh position={[0, -5, -25]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 4]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, -2, -25]} castShadow>
          <sphereGeometry args={[2]} />
          <meshLambertMaterial color="#228B22" />
        </mesh>
      </group>

      {/* GAME */}
      <Game />

      {/* LEAVES */}
      <Leaves />

      {/* CONTROLS */}
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={30}
      />

    </Canvas>
  )
}