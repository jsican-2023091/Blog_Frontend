import { useApi } from "../shared/hooks/useApi"
import { createContext, useEffect } from "react"


export const PostContext = createContext()

export const PostProvider = ({ children}) => {
    const { posts, isFetchingPosts, getPosts } = useApi()
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <PostContext.Provider value={{ posts, isFetchingPosts }}>
            {children}
        </PostContext.Provider>
    )
}