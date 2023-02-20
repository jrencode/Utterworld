import axios from 'axios';
import Cookies from 'js-cookie'



const API = axios.create({ baseURL: 'https://utterworld.onrender.com' });
//const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    const token = Cookies.get('auth_token')
    //const authEmail = Cookies.get('auth_email')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByAuthor = () => API.get(`/posts/author`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);