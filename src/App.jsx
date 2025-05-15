import { useState } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
  const elementRoutes = useRoutes(routes)

  return (
    <>
    {elementRoutes}
    <Toaster position='bottom-center' reverseOrder={false} />
    </>
  )
}

export default App
