import React from 'react'
import { PostProvider } from '../../contexts/PostsContext'
import { FeedContent } from '../../components/FeedContent'
import { Outlet } from 'react-router-dom'

const FeedPage = () => {
  return (
    <div>
      <PostProvider>
            <Outlet />
      </PostProvider>
    </div>
  )
}

export default FeedPage
