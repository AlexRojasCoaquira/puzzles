import { createRef, useContext } from 'react'
import { DropZoneContext } from '../context/dropZone'
import DraggablePiece from './DraggablePiece'

export function Pieces({ pieces }) {
  const { zones } = useContext(DropZoneContext)

  const filteredPieces = pieces.filter((src) => !zones.includes(src))
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 border max-w-2xl w-full justify-around p-2">
      {filteredPieces.map((src, i) => {
        const ref = createRef()
        return (
          <DraggablePiece
            key={src}
            ref={ref}
            src={src}
            alt={`pieza ${i}`}
            pieceIndex={i}
          />
        )
      })}
    </div>
  )
}
