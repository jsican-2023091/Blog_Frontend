import { Outlet } from "react-router-dom"
import { useContextPosts } from "../shared/hooks/useContextPosts.jsx"

export const FeedContent = () => {
    const { isFetchingPosts } = useContextPosts()
    if( isFetchingPosts) {
        return (
            <span>Cargando....</span>
            
        )
    }
    return (
        <>
        <Outlet />
        </>
    )
}
