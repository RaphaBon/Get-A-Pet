//Helper usado para chamar a API
import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:5000'
})