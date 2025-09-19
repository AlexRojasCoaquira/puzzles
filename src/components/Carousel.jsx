import { useRef } from 'react'

export function Carousel({ children, step = 300 }) {
  const trackRef = useRef(null)

  const scrollBy = (delta) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const onKeyDown = (e) => {
    console.log(e.key)
    if (e.key === 'ArrowLeft') scrollBy(-step)
    if (e.key === 'ArrowRight') scrollBy(step)
  }

  return (
    <div
      className="relative px-2 border rounded-lg"
      onKeyDown={onKeyDown} // para que funcione el scroll por teclado
      tabIndex={0}
    >
      <button
        type="button"
        className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-gray-400/60 hover:bg-white hover:text-gray-900 rounded-full shadow px-3 py-1 cursor-pointer"
        onClick={() => scrollBy(-step)}
        aria-label="Anterior"
      >
        ‹
      </button>

      <div
        ref={trackRef}
        className="carousel-track flex gap-3 max-w-2xl  overflow-x-auto scrollbar-hide p-2 snap-x snap-mandatory"
      >
        {children}
      </div>

      <button
        type="button"
        className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-gray-400/60 hover:bg-white hover:text-gray-900 rounded-full shadow px-3 py-1 cursor-pointer"
        onClick={() => scrollBy(step)}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  )
}
