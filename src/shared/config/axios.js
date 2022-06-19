import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/'

export function setToken(token) {
    axios.defaults.headers.Authentication = `Baerer ${token}`;
}

export function unsetToken() {
    axios.defaults.headers.Authentication = '';
}