import { createContext, useRef, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DropZoneContext = createContext()

export const DropZoneProvider = ({ children, rows, cols }) => {
  const dropZones = useRef([])
  const [zones, setZones] = useState(Array(rows * cols).fill(null))
  const [sizeCanvas, setSizeCanvas] = useState({ rows, cols })

  useEffect(() => {
    console.log('actualizamos el tamaño del canvas')
    setSizeCanvas({ rows, cols })
  }, [rows, cols])
  useEffect(() => {
    console.log('actualizamos las zonas')
    setZones(Array(rows * cols).fill(null))
  }, [rows, cols])
  return (
    <DropZoneContext.Provider value={{ dropZones, zones, setZones, sizeCanvas, setSizeCanvas }}>
      {children}
    </DropZoneContext.Provider>
  )
}
