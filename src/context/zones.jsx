import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ZonesContext = createContext()

export const ZonesProvider = ({ children, rows, cols }) => {
  const [zones, setZones] = useState(Array(rows * cols).fill(null))
  return <ZonesContext.Provider value={{ zones, setZones }}>{children}</ZonesContext.Provider>
}
