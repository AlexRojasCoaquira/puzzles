import './App.css'
import { useContext, useState } from 'react'
import { DropZone } from './components/DropZone'
import { usePieces } from './hooks/usePieces'
import { Pieces } from './components/Pieces'
import { DropZoneContext } from './context/dropZone'
function App() {
  const { setSizeCanvas, isZonesCorrect } = useContext(DropZoneContext)
  const { pieces, aspectRatio } = usePieces()
  const [isSelected, setIsSelected] = useState(false)

  const handleRowsAndCols = (rows, cols) => {
    setSizeCanvas({ rows, cols })
    setIsSelected(true)
  }
  return (
    <div className="flex gap-4 flex-col items-center h-100dvh p-4">
      <h1 className="text-4xl font-bold">Puzzle</h1>
      {!isSelected ? (
        <div className="max-w-2xl w-full">
          <p className="text-center mb-3 text-lg font-bold">Selecciona el nivel de dificultad</p>
          <div className="flex gap-4 justify-around">
            <button
              className="border-2 p-2 rounded-md size-40 text-white font-bold
                     bg-gradient-to-r from-purple-500 to-pink-500
                     cursor-pointer
                     hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-3002"
              onClick={() => handleRowsAndCols(4, 4)}
            >
              4x4
            </button>
            <button
              className="border-2 p-2 rounded-md size-40 text-white font-bold
                     bg-gradient-to-r from-blue-500 to-cyan-500
                     cursor-pointer
                     hover:from-blue-600 hover:to-cyan-600 hover:scale-105 transition-all duration-3002"
              onClick={() => handleRowsAndCols(5, 5)}
            >
              5x5
            </button>
            <button
              className="border-2 p-2 rounded-md size-40 text-white font-bold
                     bg-gradient-to-r from-green-500 to-lime-500
                     cursor-pointer
                     hover:from-green-600 hover:to-lime-600 hover:scale-105 transition-all duration-3002"
              onClick={() => handleRowsAndCols(6, 6)}
            >
              6x6
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-2xl w-full h-24 sm:max-h-32">
            <Pieces pieces={pieces} />
          </div>
          <div className="max-w-2xl w-full">
            <h3 className="text-center mb-3 text-lg font-bold">
              Ordena las piezas y descubre la imagen
            </h3>
            <DropZone aspectRatio={aspectRatio} />
          </div>
          <p className="text-center text-lg font-bold">
            {isZonesCorrect ? 'Correcto' : 'Incorrecto'}
          </p>
        </>
      )}
    </div>
  )
}

export default App
