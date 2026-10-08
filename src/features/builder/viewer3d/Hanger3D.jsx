// Gantungan versi 3D. Titik (0,0,0) = titik sambung dengan base, model tumbuh ke atas (+Y).
const METAL = { color: '#d6d6e0', metalness: 0.35, roughness: 0.3 }

export default function Hanger3D({ type }) {
  if (type === 'chain') {
    return (
      <group>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 0.3 + i * 0.38, 0]} rotation={[0, i % 2 ? Math.PI / 2 : 0, 0]} scale={[1, 1.5, 1]}>
            <torusGeometry args={[0.2, 0.055, 16, 32]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
        ))}
      </group>
    )
  }

  if (type === 'strap') {
    return (
      <group>
        {/* lengkungan tali */}
        <mesh position={[0, 0.6, 0]}>
          <torusGeometry args={[0.35, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#FF2E93" roughness={0.6} />
        </mesh>
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, 0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
            <meshStandardMaterial color="#FF2E93" roughness={0.6} />
          </mesh>
        ))}
        {/* pengait */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.95, 0.16, 0.2]} />
          <meshStandardMaterial color="#FFD93D" metalness={0.2} roughness={0.4} />
        </mesh>
      </group>
    )
  }

  // ring
  return (
    <mesh position={[0, 0.5, 0]}>
      <torusGeometry args={[0.42, 0.09, 20, 40]} />
      <meshStandardMaterial {...METAL} />
    </mesh>
  )
}
