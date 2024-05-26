import axios from 'axios'
const api = axios.create({
    baseURL: 'https://tarefa-backend-beryl.vercel.app/'
})
export default api;