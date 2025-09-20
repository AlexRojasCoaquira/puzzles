import { useState, useEffect, useContext } from 'react'
import { splitImage, shuffleArray } from '../utils/images'
import { DropZoneContext } from '../context/dropZone'
export function usePieces() {
  const { sizeCanvas } = useContext(DropZoneContext)
  const [pieces, setPieces] = useState([])
  const [aspectRatio, setAspectRatio] = useState(1)
  useEffect(() => {
    console.log('actualizamos las piezas')
    splitImage('./dualipa.jpg', sizeCanvas.rows, sizeCanvas.cols).then((result) => {
      const shuffledPieces = shuffleArray(result.pieces)
      setPieces(shuffledPieces)
      setAspectRatio(result.aspectRatio)
    })
  }, [sizeCanvas])

  return { pieces, aspectRatio }
}
