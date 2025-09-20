import { useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
export function DropZone({ aspectRatio }) {
  const { dropZones, zones, setZones, sizeCanvas } = useContext(DropZoneContext)
  console.log('sizeCanvas', sizeCanvas)
  const handleDoubleClick = (index) => {
    console.log('double click', index)
    setZones((prevState) => {
      const newZones = [...prevState]
      newZones[index] = null
      return newZones
    })
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
