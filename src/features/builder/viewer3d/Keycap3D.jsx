import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Huruf digambar ke canvas lalu dipasang sebagai tekstur di atas keycap.
function useLetterTexture(char, color) {
  const [fontReady, setFontReady] = useState(0)

  useEffect(() => {
    document.fonts?.load('190px "Lilita One"').then(() => setFontReady((n) => n + 1)).catch(() => {})
  }, [])

  const texture = useMemo(() => {
    if (!char) return null
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.font = '190px "Lilita One", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.fillText(char, 128, 140)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return tex
  }, [char, color, fontReady])

  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

// Satu keycap 3D yang bisa ditekan (turun sebentar lalu naik lagi).
export default function Keycap3D({ letter, index, position, size, selected, onPress }) {
  const inner = useRef()
  const pressed = useRef(false)
  const depth = size * 0.45
  const texture = useLetterTexture(letter.char, letter.textColor)

  useFrame((_, dt) => {
    const target = pressed.current ? -depth * 0.5 : 0
    inner.current.position.z = THREE.MathUtils.damp(inner.current.position.z, target, 20, dt)
  })

  const click = (e) => {
    if (e.delta > 4) return // itu drag untuk memutar, bukan klik
    e.stopPropagation()
    pressed.current = true
    setTimeout(() => (pressed.current = false), 140)
    onPress(index)
  }

  return (
    <group position={position}>
      <group
        ref={inner}
        onClick={click}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        {/* sorot pink untuk keycap yang sedang dipilih */}
        {selected && (
          <RoundedBox args={[size * 1.14, size * 1.14, depth * 0.9]} radius={size * 0.22} smoothness={4} position={[0, 0, -0.03]}>
            <meshBasicMaterial color="#FF2E93" />
          </RoundedBox>
        )}
        <RoundedBox args={[size, size, depth]} radius={size * 0.18} smoothness={4}>
          <meshStandardMaterial color={letter.keyColor} roughness={0.35} />
        </RoundedBox>
        {texture && (
          <mesh position={[0, 0, depth / 2 + 0.003]}>
            <planeGeometry args={[size * 0.85, size * 0.85]} />
            <meshBasicMaterial map={texture} transparent toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  )
}
