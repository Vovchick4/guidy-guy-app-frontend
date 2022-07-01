import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/'

axios.interceptors.response.use((res) => console.log(res))

export function setToken(token) {
    axios.defaults.headers.Authentication = `Baerer ${token}`;
}

export function unsetToken() {
    axios.defaults.headers.Authentication = '';
}