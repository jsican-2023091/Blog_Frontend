import { useState } from "react"
import {  getPostRequest } from "../../services/api.js"
import toast from "react-hot-toast"


export const useApi = () => {
    const [posts, setPosts] = useState(null)
    const getPosts = async () => {
        const response = await getPostRequest()
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.message ||
                'Error al obtener las publicaciones'
            )
        }
        setPosts(response.data.posts)
    }

    return {
        posts,
        isFetchingPosts: !posts,
        getPosts
    }
}