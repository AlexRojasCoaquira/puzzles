import { useState, useEffect, useCallback } from 'react'
import { splitImage, shuffleArray } from '../utils/images'
export function usePieces({ sizeCanvas }) {
  console.log('usePieces')
  const [pieces, setPieces] = useState([])
  const [aspectRatio, setAspectRatio] = useState(1)

  const loadPieces = useCallback(() => {
    if (!sizeCanvas) return
    console.log('loadPieces')
    splitImage('./dualipa.jpg', sizeCanvas.rows, sizeCanvas.cols).then((result) => {
      const shuffledPieces = shuffleArray(result.pieces)
      setPieces(shuffledPieces)
      setAspectRatio(result.aspectRatio)
    })
  }, [sizeCanvas])

  useEffect(() => {
    console.log('useEffect')
    loadPieces()
  }, [loadPieces])

  return { pieces, aspectRatio }
}
