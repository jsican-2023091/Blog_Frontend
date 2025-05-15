import { useContext } from "react"
import { PostContext } from "../../contexts/PostsContext"
import toast from "react-hot-toast"


export const useContextPosts = () => {
    const context = useContext(PostContext)
    if(!context){
        toast.error('Error al obtener inforamción')
        return console.error('NO existe el provedor de context')
    }
    return context

}