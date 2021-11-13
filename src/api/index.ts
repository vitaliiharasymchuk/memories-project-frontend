import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') ?? '{}').token}`;
    }

    return req;
});

export const fetchPost = (id: number) => API.get(`/posts/${id}`);
export const fetchPosts = (page: any) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery: any) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost: object) => API.post('/posts', newPost);
export const likePost = (id: number) => API.patch(`${'/posts'}/${id}/likePost`);
export const comment = (value: string, id: number) => API.post(`${'/posts'}/${id}/commentPost`, { value });
export const updatePost = (id: number, updatedPost: any) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const deletePost = (id: number) => API.delete(`${'/posts'}/${id}`);


export const signIn = (formData: object) => API.post('/users/signin', formData);
export const signUp = (formData: object) => API.post('/users/signup', formData);