import './App.css'
import { DropZone } from './components/DropZone'
import { Pieces } from './components/Pieces'
import { DificultySelector } from './components/DificultySelector'
import { DropZoneProvider } from './context/dropZone.jsx'
import { useCanvas } from './hooks/useCanvas'

function App() {
  const { sizeCanvas, handleReset, handleSelect } = useCanvas()

  return (
    <div className="flex gap-4 flex-col items-center h-100dvh p-4">
      <h1 className="text-4xl font-bold">Puzzle</h1>
      {!sizeCanvas ? (
        <DificultySelector onSelect={handleSelect} />
      ) : (
        <DropZoneProvider sizeCanvas={sizeCanvas}>
          <Pieces />
          <DropZone />
          <div className="text-center text-lg font-bold">
            {/* {isZonesCorrect && (
              <>
                <p className="text-center text-lg font-bold">¡Felicidades, has ganado!</p>
              </>
            )} */}
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => handleReset()}
            >
              Reiniciar
            </button>
          </div>
        </DropZoneProvider>
      )}
    </div>
  )
}

export default App
