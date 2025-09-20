import { createRef, useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
import DraggablePiece from './DraggablePiece'
import { Carousel } from './Carousel'

export function Pieces({ pieces }) {
  const { zones } = useContext(DropZoneContext)
  console.log('zones', zones)
  const filteredPieces = pieces.filter((piece) => !zones.includes(piece.src))
  return (
    <Carousel>
      {filteredPieces.map((piece, i) => {
        const ref = createRef()
        return (
          <div
            key={piece.src}
            className="snap-start shrink-0 "
          >
            <DraggablePiece
              ref={ref}
              src={piece.src}
              alt={`pieza ${i}`}
            />
          </div>
        )
      })}
    </Carousel>
  )
}
