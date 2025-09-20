import { createContext, useRef, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DropZoneContext = createContext()

export const DropZoneProvider = ({ children }) => {
  const rows = 4
  const cols = 4
  const dropZones = useRef([])
  const [sizeCanvas, setSizeCanvas] = useState({ rows, cols })
  const [zones, setZones] = useState(Array(rows * cols).fill(null))
  console.log('zones', zones)
  useEffect(() => {
    console.log('actualizamos las zonas')
    setZones(Array(sizeCanvas.rows * sizeCanvas.cols).fill(null))
  }, [sizeCanvas])
  return (
    <DropZoneContext.Provider value={{ dropZones, zones, setZones, sizeCanvas, setSizeCanvas }}>
      {children}
    </DropZoneContext.Provider>
  )
}
