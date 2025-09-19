import { useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
export function DropZone({ aspectRatio }) {
  const { dropZones, zones, setZones } = useContext(DropZoneContext)
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
      className="grid grid-cols-3 grid-rows-3 w-full"
      style={{ aspectRatio }}
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
              onDoubleClick={() => handleDoubleClick(index)}
              title="Para remover la pieza, doble click"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
