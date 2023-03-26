import { useEffect, useRef, useState } from 'react'
import './App.css'
import anime from 'animejs/lib/anime.es.js'

function App() {
  const wrapper = useRef<HTMLDivElement | null>(null)
  const [tiles, setTiles] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    for (let i = 0; i < tiles; i++) {
      const element = document.getElementById(`tile-${i}`) as HTMLSpanElement

      const rect = element.getBoundingClientRect()

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const radians = Math.atan2(e.pageX - centerX, e.pageY - centerY)
      const degree = radians * (180 / Math.PI) * -1 + 90

      anime({
        targets: element,
        rotate: degree + 'deg',
        duration: 500,
        easing: 'easeInOutSine',
      })
    }
  }

  const createTiles = () => {
    const { width, height } = wrapper.current!.getBoundingClientRect()

    const columns = Math.floor(width / 100)
    const rows = Math.floor(height / 100)

    wrapper.current?.style.setProperty('--columns', columns.toString())
    wrapper.current?.style.setProperty('--rows', rows.toString())

    setTiles(columns * rows)
  }

  useEffect(() => {
    if (!wrapper.current) return

    createTiles()

    window.addEventListener('resize', createTiles)

    return () => {
      window.removeEventListener('resize', createTiles)
    }
  })

  return (
    <div className="App" onMouseMove={(e) => handleMouseMove(e)}>
      <div className="wrapper" ref={wrapper}>
        {Array.from(Array(tiles)).map((tile, i) => (
          <div className="tile" key={i}>
            <span id={`tile-${i}`}>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
