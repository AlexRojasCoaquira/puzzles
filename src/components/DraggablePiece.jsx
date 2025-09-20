import { forwardRef, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import Draggable from 'react-draggable'
import { DropZoneContext } from '../context/dropZone'
import confetti from 'canvas-confetti'
function DraggablePiece({ piece, alt, isInDropZone = false, zoneIndex = -1 }, ref) {
  const { dropZones, setZones, isZonesCorrect } = useContext(DropZoneContext)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const getPoint = (e) =>
    'touches' in e ? e.touches[0] : 'changedTouches' in e ? e.changedTouches[0] : e

  const handleStart = (e) => {
    console.log('Starting drag')
    const rect = ref.current?.getBoundingClientRect()
    console.log('rect', rect)
    if (rect) {
      setImageSize({ width: rect.width, height: rect.height })
    }
    const p = getPoint(e)
    setDragPosition({ x: p.clientX, y: p.clientY })
    setIsDragging(true)
  }

  const handleStop = () => {
    const cx = dragPosition.x
    const cy = dragPosition.y

    if (isInDropZone) {
      let targetIndex = -1
      dropZones.current.some((zone, i) => {
        if (!zone || i === zoneIndex) return false
        const zoneRect = zone.getBoundingClientRect()
        const isInZone =
          cx > zoneRect.left && cx < zoneRect.right && cy > zoneRect.top && cy < zoneRect.bottom
        if (isInZone) {
          targetIndex = i
          return true
        }
        return false
      })
      if (targetIndex !== -1) {
        setZones((prev) => {
          const newZones = [...prev]
          const temp = newZones[zoneIndex]
          newZones[zoneIndex] = newZones[targetIndex]
          newZones[targetIndex] = temp
          return newZones
        })
      }
      setPosition({ x: 0, y: 0 })
    } else {
      let targetIndex = -1
      dropZones.current.some((zone, i) => {
        //iteramos sobre los dropZones para ver si la pieza está en alguno de ellos
        if (!zone) return false
        const zoneRect = zone.getBoundingClientRect()
        const margin = 20
        const isInZone =
          cx > zoneRect.left - margin &&
          cx < zoneRect.right + margin &&
          cy > zoneRect.top - margin &&
          cy < zoneRect.bottom + margin
        if (isInZone) {
          // si está en el dropZone, entonces targetIndex es el índice del dropZone
          targetIndex = i
          return true
        }
        return false
      })

      if (targetIndex !== -1) {
        //encontró un lugar para la pieza
        setZones((prev) => {
          const newZones = [...prev]
          const prevIdx = newZones.findIndex((zone) => zone === piece.src)
          if (prevIdx !== -1) newZones[prevIdx] = null
          newZones[targetIndex] = piece
          return newZones
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    console.log('Stopping drag')
    setIsDragging(false)
    if (isZonesCorrect) {
      console.log('ganaste')

      //   confetti({
      //     particleCount: 100,
      //     spread: 70,
      //     origin: { y: 0.6 }
      //   })
    } else {
      console.log('todavia no ganaste')
    }
  }
  return (
    <>
      <Draggable
        nodeRef={ref}
        position={position}
        onStart={handleStart}
        onDrag={(e, data) => {
          const p = getPoint(e)
          setPosition({ x: data.x, y: data.y })
          setDragPosition({ x: p.clientX, y: p.clientY })
        }}
        onStop={(e, data) => handleStop(e, data)}
        bounds={isInDropZone ? 'parent' : undefined}
      >
        <img
          ref={ref}
          src={piece.src}
          alt={alt}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className={`relative touch-none w-full cursor-grab select-none ${
            isInDropZone ? 'h-full object-cover cursor-move' : 'max-w-30 sm:max-w-30'
          }`}
          style={{ opacity: isDragging ? 0 : 1 }}
        />
      </Draggable>

      {isDragging &&
        createPortal(
          <img
            src={piece.src}
            alt={alt}
            draggable={false}
            style={{
              position: 'fixed',
              left: `${dragPosition.x - imageSize.width / 2}px`,
              top: `${dragPosition.y - imageSize.height / 2}px`,
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
              pointerEvents: 'none',
              zIndex: 99999
            }}
          />,
          document.body
        )}
    </>
  )
}

export default forwardRef(DraggablePiece)
