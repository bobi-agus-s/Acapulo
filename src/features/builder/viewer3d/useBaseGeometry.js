import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { AUTO_ORIENT, BASE_HEIGHT, EXTRA_ROTATION, FALLBACK_DIMS } from './config'

// Rapikan geometri STL: putar tegak, taruh di tengah, skala ke BASE_HEIGHT.
function prepare(geo) {
  const size = new Vector3()
  geo.computeBoundingBox()
  geo.boundingBox.getSize(size)

  if (AUTO_ORIENT) {
    // sisi terpanjang -> sumbu Y (tinggi)
    if (size.z >= size.x && size.z >= size.y) geo.rotateX(-Math.PI / 2)
    else if (size.x >= size.y && size.x >= size.z) geo.rotateZ(Math.PI / 2)
    geo.computeBoundingBox()
    geo.boundingBox.getSize(size)
    // sisi paling tipis -> sumbu Z (tebal / menghadap kamera)
    if (size.x < size.z) geo.rotateY(Math.PI / 2)
  }

  geo.rotateX(EXTRA_ROTATION[0])
  geo.rotateY(EXTRA_ROTATION[1])
  geo.rotateZ(EXTRA_ROTATION[2])

  geo.center()
  geo.computeBoundingBox()
  geo.boundingBox.getSize(size)
  const s = BASE_HEIGHT / size.y
  geo.scale(s, s, s)
  geo.computeVertexNormals()

  return { geometry: geo, dims: { w: size.x * s, h: size.y * s, d: size.z * s } }
}

// Muat file STL. status: loading | ready | missing (kalau file tidak ada -> pakai base contoh)
export function useBaseGeometry(url) {
  const [state, setState] = useState({ status: 'loading', geometry: null, dims: FALLBACK_DIMS })

  useEffect(() => {
    let cancelled = false
    const missing = () => !cancelled && setState({ status: 'missing', geometry: null, dims: FALLBACK_DIMS })

    new STLLoader().load(
      url,
      (geo) => {
        if (cancelled) return
        if (!geo.attributes.position || geo.attributes.position.count < 9) return missing()
        setState({ status: 'ready', ...prepare(geo) })
      },
      undefined,
      missing,
    )
    return () => {
      cancelled = true
    }
  }, [url])

  return state
}
