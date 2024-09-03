import axios from "../util/axiosCustomize"

export const postRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const postLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const callUserPaginayion = (queryString) => {
    return axios.get(`/api/v1/user?${queryString}`)
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`)
}

export const callCreateUser = (fullName, password, email, phone) => {
    return axios.post(`/api/v1/user/`, { fullName, password, email, phone })
}