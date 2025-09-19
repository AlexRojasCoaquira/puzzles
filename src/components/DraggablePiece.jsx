import { forwardRef, useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { DropZoneContext } from '../context/dropZone'
function DraggablePiece({ src, alt, pieceIndex }, ref) {
  const { dropZones, setZones } = useContext(DropZoneContext)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleStop = (e, data, pieceIndex) => {
    const pieceRect = data.node.getBoundingClientRect()
    const x = pieceRect.left + pieceRect.width / 2
    const y = pieceRect.top + pieceRect.height / 2
    console.log(pieceIndex)

    let targetIndex = -1
    dropZones.current.some((zone, i) => {
      if (!zone) return false
      const zoneRect = zone.getBoundingClientRect()

      const isInZone =
        x > zoneRect.left && x < zoneRect.right && y > zoneRect.top && y < zoneRect.bottom

      if (isInZone) {
        targetIndex = i
        return true
      }
      return false
    })

    if (targetIndex !== -1) {
      setZones((prev) => {
        const newZones = [...prev]
        console.log('newZones', newZones)
        const prevIdx = newZones.findIndex((zone) => zone === src)
        if (prevIdx !== -1) newZones[prevIdx] = null
        newZones[targetIndex] = src
        return newZones
      })
      return
    }
    setPosition({ x: 0, y: 0 })
  }
  return (
    <Draggable
      nodeRef={ref}
      position={position}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      onStop={(e, data) => handleStop(e, data, pieceIndex)}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="max-w-40 w-full cursor-grab"
      />
    </Draggable>
  )
}

export default forwardRef(DraggablePiece)
