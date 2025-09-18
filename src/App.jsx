import { useState, useEffect } from 'react'
import './App.css'
import { splitImage, shuffleArray } from './utils/images'

// export default function Puzzle() {
//   const [pieces, setPieces] = React.useState([])

//   React.useEffect(() => {
//     splitImage("/imagen.jpg", 3, 3).then(setPieces)
//   }, [])

//   return (
//     <div className="grid grid-cols-3 gap-2 w-[600px]">
//       {pieces.map((src, i) => (
//         <img key={i} src={src} className="w-full h-auto" alt={`pieza ${i}`} />
//       ))}
//     </div>
//   )
// }

function App() {
  const [pieces, setPieces] = useState([])
  useEffect(() => {
    splitImage('./prueba.jpg', 3, 3).then((pieces) => {
      const shuffledPieces = shuffleArray(pieces)
      setPieces(shuffledPieces)
    })
  }, [])
  return (
    <div className="flex gap-4 flex-col items-center h-screen p-4 border">
      <h1 className="text-4xl font-bold">Puzzle</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 border max-w-2xl w-full justify-around p-2">
        {pieces.map((src, i) => (
          <img
            key={i}
            src={src}
            className="max-w-40 w-full"
            alt={`pieza ${i}`}
          />
        ))}
      </div>
      <div className="border">
        <h3>Ordena las piezas y descubre la imagen</h3>
        <div className="grid grid-cols-8 gap-4">Mi pluzzle</div>
      </div>
    </div>
  )
}

export default App
