export const setToken = (headers, { getState }) => {
    const token = getState()?.auth?.token
    if (token) {
        headers.set('authentication', `Bearer ${token}`)
    }
    return headers
}