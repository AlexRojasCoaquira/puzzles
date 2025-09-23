import { createContext, useRef, useState, useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'
import { useAudio } from '../hooks/useAudio'
// eslint-disable-next-line react-refresh/only-export-components
export const DropZoneContext = createContext()

export const DropZoneProvider = ({ children, sizeCanvas }) => {
  console.log('provider', sizeCanvas)

  const dropZones = useRef([])
  const [zones, setZones] = useState(null)

  const { playAudio, pauseAudio, hasPlayed, audioRef } = useAudio({ src: '/dualipa.mp3' })

  const isZonesCorrect = useMemo(() => {
    if (!zones) return false
    return zones.every((zone, index) => zone !== null && zone?.order === index)
  }, [zones])

  useEffect(() => {
    if (!sizeCanvas) return
    setZones(Array(sizeCanvas.rows * sizeCanvas.cols).fill(null))
  }, [sizeCanvas])

  useEffect(() => {
    if (isZonesCorrect && !hasPlayed) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      })
      playAudio()
    }
    if (!isZonesCorrect && audioRef) {
      pauseAudio()
    }
  }, [isZonesCorrect, hasPlayed, audioRef])

  return (
    <DropZoneContext.Provider
      value={{
        dropZones,
        zones,
        setZones,
        sizeCanvas,
        isZonesCorrect
      }}
    >
      {children}
    </DropZoneContext.Provider>
  )
}
