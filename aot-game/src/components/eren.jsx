import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Eren({ active, ...props }) {

  const { scene } = useGLTF("/models/eren.glb")

  const model = useRef()

  // BONES
  const leftLeg = useRef()
  const rightLeg = useRef()

  const leftArm = useRef()
  const rightArm = useRef()

  // KEYS
  const keys = useRef({})

  // ORIGINAL ROTATIONS
  const initialRotations = useRef({})

  // =========================
  // KEYBOARD
  // =========================
  useEffect(() => {

    const down = (e) => {
      keys.current[e.code] = true
    }

    const up = (e) => {
      keys.current[e.code] = false
    }

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }

  }, [])

  // =========================
  // FIND BONES
  // =========================
  useEffect(() => {

    scene.traverse((obj) => {

      if (obj.isBone) {

        // SAVE ORIGINAL ROTATION
        initialRotations.current[obj.name] = {
          x: obj.rotation.x,
          y: obj.rotation.y,
          z: obj.rotation.z,
        }

        // LEGS
        if (obj.name === "Left_leg_04") {
          leftLeg.current = obj
        }

        if (obj.name === "Right_leg_09") {
          rightLeg.current = obj
        }

        // ARMS
        if (obj.name === "Left_arm_076") {
          leftArm.current = obj
        }

        if (obj.name === "Right_arm_096") {
          rightArm.current = obj
        }

      }

    })

  }, [scene])

  // =========================
  // FRAME LOOP
  // =========================
  useFrame((state, delta) => {

    if (!model.current) return

    // ONLY MOVE IF ACTIVE
    if (!active) return

    const speed = 3 * delta
    const rotSpeed = 2 * delta

    let moving = false

    // =========================
    // ROTATION
    // =========================
    if (keys.current["ArrowLeft"]) {
      model.current.rotation.y += rotSpeed
    }

    if (keys.current["ArrowRight"]) {
      model.current.rotation.y -= rotSpeed
    }

    // =========================
    // MOVEMENT
    // =========================
    if (keys.current["ArrowUp"]) {

      model.current.position.x -=
        Math.sin(model.current.rotation.y) * speed

      model.current.position.z -=
        Math.cos(model.current.rotation.y) * speed

      moving = true
    }

    if (keys.current["ArrowDown"]) {

      model.current.position.x +=
        Math.sin(model.current.rotation.y) * speed

      model.current.position.z +=
        Math.cos(model.current.rotation.y) * speed

      moving = true
    }

    // =========================
    // WALK ANIMATION
    // =========================
    const t = state.clock.elapsedTime * 7

    if (moving) {

      // LEFT LEG
      if (leftLeg.current) {

        const base =
          initialRotations.current[leftLeg.current.name]

        leftLeg.current.rotation.x =
          base.x - Math.sin(t) * 0.7
      }

      // RIGHT LEG
      if (rightLeg.current) {

        const base =
          initialRotations.current[rightLeg.current.name]

        rightLeg.current.rotation.x =
          base.x + Math.sin(t) * 0.7
      }

      // LEFT ARM
      if (leftArm.current) {

        const base =
          initialRotations.current[leftArm.current.name]

        leftArm.current.rotation.x =
          base.x + Math.sin(t) * 0.5
      }

      // RIGHT ARM
      if (rightArm.current) {

        const base =
          initialRotations.current[rightArm.current.name]

        rightArm.current.rotation.x =
          base.x - Math.sin(t) * 0.5
      }

    } else {

      // RESET LEFT LEG
      if (leftLeg.current) {

        const base =
          initialRotations.current[leftLeg.current.name]

        leftLeg.current.rotation.x +=
          (base.x - leftLeg.current.rotation.x) * 0.1
      }

      // RESET RIGHT LEG
      if (rightLeg.current) {

        const base =
          initialRotations.current[rightLeg.current.name]

        rightLeg.current.rotation.x +=
          (base.x - rightLeg.current.rotation.x) * 0.1
      }

      // RESET LEFT ARM
      if (leftArm.current) {

        const base =
          initialRotations.current[leftArm.current.name]

        leftArm.current.rotation.x +=
          (base.x - leftArm.current.rotation.x) * 0.1
      }

      // RESET RIGHT ARM
      if (rightArm.current) {

        const base =
          initialRotations.current[rightArm.current.name]

        rightArm.current.rotation.x +=
          (base.x - rightArm.current.rotation.x) * 0.1
      }

    }

  })

  return (
    <primitive
      ref={model}
      object={scene}
      scale={1}
      position={[0, -1, 0]}
      {...props}
    />
  )
}

useGLTF.preload("/models/eren.glb")