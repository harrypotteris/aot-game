import { useState } from "react"
import { Html } from "@react-three/drei"

import Eren from "../components/eren"
import Mikasa from "../components/mikasa"

export default function Game() {

  const [selectedCharacter, setSelectedCharacter] =
    useState(null)

  return (
    <>

      {/* =========================
          CHARACTER UI
      ========================= */}
      <Html fullscreen>

        <div className="character-ui">

          {/* EREN */}
          <div
            className={
              selectedCharacter === "eren"
                ? "card active"
                : "card"
            }

            onClick={() =>
              setSelectedCharacter("eren")
            }
          >

            <h2>Eren Yeager</h2>

            <p>
              Aggressive titan fighter with
              powerful movement and strong attacks.
            </p>

          </div>

          {/* MIKASA */}
          <div
            className={
              selectedCharacter === "mikasa"
                ? "card active"
                : "card"
            }

            onClick={() =>
              setSelectedCharacter("mikasa")
            }
          >

            <h2>Mikasa Ackerman</h2>

            <p>
              Elite soldier with unmatched
              precision and fast combat skills.
            </p>

          </div>

        </div>

      </Html>

      {/* =========================
          CHARACTERS
      ========================= */}

      {/* EREN */}
      <Eren
        position={[-4, -6.5, 0]}
        scale={0.45}
      />

      {/* MIKASA */}
      <Mikasa
        position={[4, -6.5, 0]}
        scale={0.45}
      />

    </>
  )
}