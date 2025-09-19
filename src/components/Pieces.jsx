import { createRef, useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
import DraggablePiece from './DraggablePiece'
import { Carousel } from './Carousel'

export function Pieces({ pieces }) {
  const { zones } = useContext(DropZoneContext)
  console.log('zones', zones)
  const filteredPieces = pieces.filter((src) => !zones.includes(src))
  return (
    <Carousel>
      {filteredPieces.map((src, i) => {
        const ref = createRef()
        return (
          <div
            key={src}
            className="snap-start shrink-0"
          >
            <DraggablePiece
              ref={ref}
              src={src}
              alt={`pieza ${i}`}
              pieceIndex={i}
            />
          </div>
        )
      })}
    </Carousel>
  )
}
