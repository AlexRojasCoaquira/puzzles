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
  const [aspectRatio, setAspectRatio] = useState(1)
  useEffect(() => {
    splitImage('./prueba.jpg', 3, 3).then((result) => {
      const shuffledPieces = shuffleArray(result.pieces)
      setPieces(shuffledPieces)
      setAspectRatio(result.aspectRatio)
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
      <div className="max-w-2xl w-full">
        <h3 className="text-center mb-3 text-lg font-bold">
          Ordena las piezas y descubre la imagen
        </h3>
        <div
          className="grid grid-cols-3 grid-rows-3 w-full gap-3"
          style={{ aspectRatio }}
        >
          <div className="border w-full h-g">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
          <div className="border">a</div>
        </div>
      </div>
    </div>
  )
}

export default App
