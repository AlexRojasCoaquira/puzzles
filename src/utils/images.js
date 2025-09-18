export const splitImage = (imgSrc, rows, cols) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      const pieces = []
      const pieceWidth = img.width / cols
      const pieceHeight = img.height / rows

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = pieceWidth
          canvas.height = pieceHeight

          ctx.drawImage(
            img,
            x * pieceWidth,
            y * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
          )

          pieces.push(canvas.toDataURL())
        }
      }
      resolve(pieces)
    }
  })
}

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5)
}
