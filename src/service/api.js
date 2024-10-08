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

export const importUsers = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}

export const callUpdateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}

export const callBookPagination = (queryString) => {
    return axios.get(`/api/v1/book?${queryString}`)
}

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}

export const callBookCategory = () => {
    return axios.get("/api/v1/database/category");
}

export const callBookImage = (fileImg) => {
    const body = new FormData();
    body.append("fileImg", fileImg)
    return axios({
        method: "post",
        url: "/api/v1/file/upload",
        data: body,
        headers: {
            'Content-Type': "multipart/form-data",
            "upload-type": "book"
        }
    })
}

export const callBookCreate = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post(`/api/v1/book`, { thumbnail, slider, mainText, author, price, sold, quantity, category })
}

export const callBookUpdate = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category })
}

export const callPaginationBook = (queryString) => {
    return axios.get(`/api/v1/book?${queryString}`)
}

export const callAllBook = () => {
    return axios.get(`/api/v1/book`)
}

export const callCreateOrder = (data) => {
    return axios.post(`/api/v1/order`, { ...data })
}

export const callHistoryOrder = () => {
    return axios.get('/api/v1/history')
}

export const callUpdateAvatar = (fileImg) => {
    const body = new FormData();
    body.append("fileImg", fileImg)
    return axios({
        method: "post",
        url: "/api/v1/file/upload",
        data: body,
        headers: {
            'Content-Type': "multipart/form-data",
            "upload-type": "avatar"
        }
    })
}

export const callUpdateAccount = (fullName, phone, avatar, _id) => {
    return axios.put('/api/v1/user', { fullName, phone, avatar, _id })
}

export const callRefeshtoken = () => {
    return axios.get('/api/v1/auth/refresh')
}

export const callChangePassword = (email, oldpass, newpass) => {
    return axios.post('/api/v1/user/change-password', { email, oldpass, newpass })
}

export const classHistoryOrder = (data) => {
    return axios.get(`/api/v1/order?${data}`);
}