import React from 'react'
import './PublicationCSS.css'
import { PostProvider } from '../../contexts/PostsContext'
import { FeedContent } from '../../components/FeedContent'
import { Outlet } from 'react-router-dom'

const PublicationPage = () => {
  return (
    <div>
        <header>
            <h1>Publicaciones</h1>
        </header>
    </div>
  )
}

export default PublicationPage
