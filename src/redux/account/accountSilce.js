import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
    }
}

export const accountSilce = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        doLogoutAction: (state) => {
            localStorage.removeItem("access_token")
            state.isAuthenticated = false;
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { doLoginAction, getAccountAction, doLogoutAction } = accountSilce.actions

export default accountSilce.reducer