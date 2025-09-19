import { forwardRef, useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { DropZoneContext } from '../context/dropZone'
function DraggablePiece({ src, alt, pieceIndex }, ref) {
  const { dropZones, setZones } = useContext(DropZoneContext)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleStop = (e, data, pieceIndex) => {
    const pieceRect = data.node.getBoundingClientRect()
    console.log(pieceIndex)
    let isInZone = false
    dropZones.current.forEach((zone, i) => {
      if (!zone) return
      const zoneRect = zone.getBoundingClientRect()

      const x = pieceRect.left + pieceRect.width / 2
      const y = pieceRect.top + pieceRect.height / 2
      if (x > zoneRect.left && x < zoneRect.right && y > zoneRect.top && y < zoneRect.bottom) {
        console.log('estoy en una zona', zone, i)
        setZones((prev) => {
          const newZones = [...prev]
          if (newZones[i] === null) {
            newZones[i] = src
            isInZone = true
          }
          return newZones
        })
        return isInZone
      }
      return false
    })
    if (!isInZone) {
      setPosition({ x: 0, y: 0 })
    }
  }
  return (
    <Draggable
      nodeRef={ref}
      onStop={(e, data) => handleStop(e, data, pieceIndex)}
      position={position}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="max-w-40 w-full cursor-grab"
      />
    </Draggable>
  )
}

export default forwardRef(DraggablePiece)
