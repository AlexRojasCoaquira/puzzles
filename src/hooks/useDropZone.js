import { useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
export function useDropZone() {
  const ctx = useContext(DropZoneContext)

  if (!ctx) {
    throw new Error('use DropZone debe ser usado con DropZoneProvider')
  }

  return ctx
}
