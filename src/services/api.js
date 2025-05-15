import axios from "axios"

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3040/v1',
        timeout: 3000
    }
)

export const getPostRequest = async() => {
    try {
        return await apiClient.get('/post/getAll')
    } catch (err) {
        return{
            error: true,
            err
        }
    }
} 

export const getPostById = async (id) => {
  try {
    return await apiClient.get(`/post/${id}`)
  } catch (err) {
    return { error: true, err }
  }
}

export const getCommentsByPostId = async (postId) => {
  try {
    return await apiClient.get(`/comment/getCommentsByPost/${postId}`)
  } catch (err) {
    return { error: true, err }
  }
}

export const createComment = async (data) => {
  try {
    return await apiClient.post('/save', data)
  } catch (err) {
    return { error: true, err }
  }
}
