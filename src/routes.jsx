import React from 'react'
import HomePage from './pages/Home/HomePage.jsx'
import Posts from './components/Posts/Posts.jsx'
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx'
import FeedPage from './pages/Feed/FeedPage.jsx'
import { Navigate } from 'react-router-dom'
import CommentPage from './pages/Comment/CommentPage.jsx'

const routes = [

    {
        path: '/',
        element: <Navigate to="/home" replace />
    },
    {
        path: '*',
        element: <NotFoundPage />
    },
    
    {
        path: '/home',
        element: <FeedPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path:'posts',
                element: <Posts />
            }
        ]
    },
    {
        path: '/home/posts/:postsId/comments',
        element: <CommentPage />
    }
    
    ]
export default routes
