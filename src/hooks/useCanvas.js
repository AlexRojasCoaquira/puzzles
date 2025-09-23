import { useState } from 'react'
export function useCanvas() {
  console.log('useCanvas')
  const [sizeCanvas, setSizeCanvas] = useState(null)

  const handleReset = () => {
    console.log('handleReset')
    setSizeCanvas(null)
  }

  const handleSelect = ({ rows, cols }) => {
    setSizeCanvas({ rows, cols })
  }
  return { sizeCanvas, setSizeCanvas, handleReset, handleSelect }
}
