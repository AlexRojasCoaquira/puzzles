import { useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
export function DropZone({ aspectRatio }) {
  const { dropZones, zones } = useContext(DropZoneContext)

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
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
