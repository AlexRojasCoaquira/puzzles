import './App.css'
import { DropZone } from './components/DropZone'
import { DropZoneProvider } from './context/dropZone'
import { usePieces } from './hooks/usePieces'
import { Pieces } from './components/Pieces'

function App() {
  const rows = 5
  const cols = 5
  const { pieces, aspectRatio } = usePieces({ rows, cols })
  return (
    <DropZoneProvider
      rows={rows}
      cols={cols}
    >
      <div className="flex gap-4 flex-col items-center h-100dvh p-4">
        <h1 className="text-4xl font-bold">Puzzle</h1>
        <div className="max-w-2xl w-full h-24 sm:max-h-32">
          <Pieces pieces={pieces} />
        </div>
        <div className="max-w-2xl w-full">
          <h3 className="text-center mb-3 text-lg font-bold">
            Ordena las piezas y descubre la imagen
          </h3>
          <DropZone aspectRatio={aspectRatio} />
        </div>
      </div>
    </DropZoneProvider>
  )
}

export default App
