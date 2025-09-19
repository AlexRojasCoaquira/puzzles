import { createContext, useRef, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DropZoneContext = createContext()

export const DropZoneProvider = ({ children }) => {
  const dropZones = useRef([])
  const [zones, setZones] = useState(Array(9).fill(null))

  return (
    <DropZoneContext.Provider value={{ dropZones, zones, setZones }}>
      {children}
    </DropZoneContext.Provider>
  )
}
