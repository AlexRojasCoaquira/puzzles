import { createContext, useState } from 'react'
export const ZonesContext = createContext()

export const ZonesProvider = ({ children }) => {
  const [zones, setZones] = useState(Array(9).fill(null))
  return <ZonesContext.Provider value={{ zones, setZones }}>{children}</ZonesContext.Provider>
}
