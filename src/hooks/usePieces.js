import { useState, useEffect } from 'react'
import { splitImage, shuffleArray } from '../utils/images'

export function usePieces() {
  const [pieces, setPieces] = useState([])
  const [aspectRatio, setAspectRatio] = useState(1)
  useEffect(() => {
    splitImage('./prueba.jpg', 3, 3).then((result) => {
      const shuffledPieces = shuffleArray(result.pieces)
      setPieces(shuffledPieces)
      setAspectRatio(result.aspectRatio)
    })
  }, [])
  return { pieces, aspectRatio }
}
