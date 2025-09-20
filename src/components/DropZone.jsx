import { useContext, useRef } from 'react'
import { DropZoneContext } from '../context/dropZone'
export function DropZone({ aspectRatio }) {
  const { dropZones, zones, setZones, sizeCanvas } = useContext(DropZoneContext)
  const longPressTimer = useRef(null)
  console.log('sizeCanvas', sizeCanvas)

  const removePiece = (index) => {
    setZones((prevState) => {
      const newZones = [...prevState]
      newZones[index] = null
      return newZones
    })
  }
  const handleDoubleClick = (index) => {
    removePiece(index)
  }

  const handleTouchStart = (index) => {
    longPressTimer.current = setTimeout(() => {
      removePiece(index)
    }, 1000)
  }
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }
  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  return (
    <div
      className={`grid  max-w-3xl aspect-square`}
      style={{
        aspectRatio,
        gridTemplateColumns: `repeat(${sizeCanvas.cols}, 1fr)`,
        gridTemplateRows: `repeat(${sizeCanvas.rows}, 1fr)`
      }}
    >
      {zones.map((zone, index) => (
        <div
          className={`${zone ? '' : 'border'}`}
          key={index}
          ref={(el) => (dropZones.current[index] = el)}
          onDoubleClick={() => handleDoubleClick(index)}
          onTouchStart={() => handleTouchStart(index)}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {zone ? (
            <img
              src={zone}
              alt={`piece ${index}`}
              className="w-full h-full object-cover"
              title="Para remover la pieza, doble click"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
