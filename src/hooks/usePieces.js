import { useState, useEffect } from 'react'
import { splitImage, shuffleArray } from '../utils/images'

export function usePieces({ rows, cols } = { rows: 4, cols: 4 }) {
  const [pieces, setPieces] = useState([])
  const [aspectRatio, setAspectRatio] = useState(1)
  useEffect(() => {
    console.log('actualizamos las piezas')
    splitImage('./prueba.jpg', rows, cols).then((result) => {
      const shuffledPieces = shuffleArray(result.pieces)
      setPieces(shuffledPieces)
      setAspectRatio(result.aspectRatio)
    })
  }, [rows, cols])

  return { pieces, aspectRatio }
}
