export function DificultySelector({ onSelect }) {
  const handleRowsAndCols = (rows, cols) => {
    onSelect({ rows, cols })
  }
  return (
    <div className="max-w-2xl w-full">
      <p className="text-center mb-3 text-lg font-bold mt-4">Selecciona el nivel de dificultad</p>
      <div className="flex gap-4 justify-around my-10">
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
  )
}
