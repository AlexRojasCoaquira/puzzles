import { useRef, useEffect } from 'react'
export function useAudio({ src = '/henry.mp3' }) {
  console.log('useAudio')
  const hasPlayed = useRef(false)
  const audioRef = useRef(null)
  useEffect(() => {
    console.log('useEffect', src)
    audioRef.current = new Audio(src)
    return () => {
      audioRef.current = null
    }
  }, [src])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      hasPlayed.current = true
    }
  }
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      hasPlayed.current = false
    }
  }

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      hasPlayed.current = false
    }
  }
  return {
    playAudio,
    pauseAudio,
    hasPlayed: hasPlayed.current,
    audioRef: audioRef.current,
    resetAudio
  }
}
