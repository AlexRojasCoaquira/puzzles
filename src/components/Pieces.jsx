import { createRef, useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
import DraggablePiece from './DraggablePiece'
import { Carousel } from './Carousel'
import { usePieces } from '../hooks/usePieces'

export function Pieces() {
  const { zones, sizeCanvas } = useContext(DropZoneContext)
  const { pieces } = usePieces({ sizeCanvas })
  const filteredPieces = (pieces ?? []).filter(
    (piece) => !(zones ?? []).some((zone) => zone?.src === piece.src && zone?.order === piece.order)
  )

  return (
    <section className="max-w-2xl w-full sm:max-h-full mt-5">
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
                piece={piece}
                alt={`pieza ${i}`}
              />
            </div>
          )
        })}
      </Carousel>
    </section>
  )
}
