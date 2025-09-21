import { createContext, useRef, useState, useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'
// eslint-disable-next-line react-refresh/only-export-components
export const DropZoneContext = createContext()

export const DropZoneProvider = ({ children }) => {
  const rows = 4
  const cols = 4
  const dropZones = useRef([])
  const [sizeCanvas, setSizeCanvas] = useState({ rows, cols })
  const [zones, setZones] = useState(Array(rows * cols).fill(null))
  const hasPlayed = useRef(false)
  const audioRef = useRef(null)
  const isZonesCorrect = useMemo(() => {
    return zones.every((zone, index) => zone !== null && zone?.order === index)
  }, [zones])
  useEffect(() => {
    setZones(Array(sizeCanvas.rows * sizeCanvas.cols).fill(null))
  }, [sizeCanvas])

  useEffect(() => {
    if (isZonesCorrect && !hasPlayed.current) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      })
      audioRef.current = new Audio('/henry.mp3')
      audioRef.current.play()
      hasPlayed.current = true
    }
    if (!isZonesCorrect && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      hasPlayed.current = false
    }
  }, [isZonesCorrect])

  return (
    <DropZoneContext.Provider
      value={{ dropZones, zones, setZones, sizeCanvas, setSizeCanvas, isZonesCorrect }}
    >
      {children}
    </DropZoneContext.Provider>
  )
}
