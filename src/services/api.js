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
        return{ error: true, err }
    }
} 

export const getPostById = async (postId) => {
  try {
    return await apiClient.get(`/post/getPostById/${postId}`)
  } catch (err) {
    return { error: true, err }
  }
}

export const getCommentsById = async (commentid) => {
  try {
    return await apiClient.get(`/comment/getCommentsById/${commentid}`)
  } catch (err) {
    return { error: true, err }
  }
}

export const getCommentsByPostId = async(postId) => {
  try {
    return await apiClient.get(`/comment/getCommentByPostId/${postId}`)
  } catch (err) {
    return { error: true, err}
  }
}

export const createComment = async (data) => {
  try {
    return await apiClient.post('/comment/save', data)
  } catch (err) {
    return { error: true, err }
  }
}

export const getPostsByCourse = async (course) => {
  try {
    return await apiClient.get(`/post/getCourse/${encodeURIComponent(course)}`)
  } catch (err) {
    return { error: true, err }
  }
}
