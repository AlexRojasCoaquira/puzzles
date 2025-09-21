import './App.css'
import { useContext, useState } from 'react'
import { DropZone } from './components/DropZone'
import { usePieces } from './hooks/usePieces'
import { Pieces } from './components/Pieces'
import { DropZoneContext } from './context/dropZone'
import { DificultySelector } from './components/DificultySelector'
function App() {
  const { isZonesCorrect, setZones, sizeCanvas } = useContext(DropZoneContext)
  const { pieces, aspectRatio } = usePieces()
  const [isSelected, setIsSelected] = useState(false)

  const handleReset = () => {
    setIsSelected(false)
    setZones(Array(sizeCanvas.rows * sizeCanvas.cols).fill(null))
  }

  const handleSelect = () => {
    setIsSelected(true)
  }

  return (
    <div className="flex gap-4 flex-col items-center h-100dvh p-4">
      <h1 className="text-4xl font-bold">Puzzle</h1>
      {!isSelected ? (
        <DificultySelector onSelect={handleSelect} />
      ) : (
        <>
          <Pieces pieces={pieces} />
          <DropZone aspectRatio={aspectRatio} />
          <div className="text-center text-lg font-bold">
            {isZonesCorrect && (
              <>
                <p className="text-center text-lg font-bold">¡Felicidades, has ganado!</p>
              </>
            )}
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => handleReset()}
            >
              Reiniciar
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
