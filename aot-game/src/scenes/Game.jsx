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
      <Html
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '250px',
          pointerEvents: 'auto'
        }}
      >

        <div className="character-ui" style={{ fontSize: '12px' }}>

          {/* EREN */}
          <div
            className={
              selectedCharacter === "eren"
                ? "card active"
                : "card"
            }
            style={{
              padding: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              background: selectedCharacter === "eren" ? '#4CAF50' : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            onClick={() =>
              setSelectedCharacter("eren")
            }
          >

            <h2 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Eren Yeager</h2>

            <p style={{ margin: '0', fontSize: '10px' }}>
              Aggressive titan fighter with powerful movement.
            </p>

          </div>

          {/* MIKASA */}
          <div
            className={
              selectedCharacter === "mikasa"
                ? "card active"
                : "card"
            }
            style={{
              padding: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              background: selectedCharacter === "mikasa" ? '#4CAF50' : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            onClick={() =>
              setSelectedCharacter("mikasa")
            }
          >

            <h2 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Mikasa Ackerman</h2>

            <p style={{ margin: '0', fontSize: '10px' }}>
              Elite soldier with unmatched precision.
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
        active={selectedCharacter === "eren"}
      />

      {/* MIKASA */}
      <Mikasa
        position={[4, -6.5, 0]}
        scale={0.45}
        active={selectedCharacter === "mikasa"}
      />

    </>
  )
}