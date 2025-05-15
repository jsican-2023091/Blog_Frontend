import React from 'react'
import './HomeCSS.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/home/posts')
  }
  return (
    

    <div>
      <header>
          <h1>Bienvenido a Mi Blog Personal</h1>
      </header>

      <div className='Content-Publi'>
        Presione el boton para ver las publicaciones
      </div>
      <div className='Bottom-Publi'>
        <button onClick={handleNavigate}>Ver Publicaciones</button>
      </div>

      <footer>
          <p>&copy; My blog Personal Jsican.</p>
      </footer>
    </div>
  )
}

export default HomePage
