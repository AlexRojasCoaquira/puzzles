import { useContext, useRef, createRef } from 'react'
import { DropZoneContext } from '../context/dropZone'
import DraggablePiece from './DraggablePiece'
import { usePieces } from '../hooks/usePieces'
export function DropZone({ title }) {
  console.log('DropZone')
  const { dropZones, zones, setZones, sizeCanvas } = useContext(DropZoneContext)
  const { aspectRatio } = usePieces({ sizeCanvas })
  const longPressTimer = useRef(null)

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
    <div className="max-w-2xl w-full mt-5">
      <h3 className="text-center mb-3 text-lg font-bold">
        {title || 'Ordena las piezas y descubre la imagen'}
      </h3>
      {zones && zones.length > 0 && (
        <div
          className={`grid  max-w-3xl aspect-square`}
          style={{
            aspectRatio,
            gridTemplateColumns: `repeat(${sizeCanvas?.cols}, 1fr)`,
            gridTemplateRows: `repeat(${sizeCanvas?.rows}, 1fr)`
          }}
        >
          {zones.map((zone, index) => {
            const refZone = createRef(null)
            return (
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
                  <DraggablePiece
                    ref={refZone}
                    piece={zone}
                    alt={`piece ${index}`}
                    isInDropZone={true}
                    zoneIndex={index}
                    onDoubleClick={() => removePiece(index)}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
