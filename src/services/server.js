import axios from 'axios'

const conf = {
  baseURL: 'http://localhost:8085/',
  timeout: 5000,
}

const server = axios.create(conf)

export default server
