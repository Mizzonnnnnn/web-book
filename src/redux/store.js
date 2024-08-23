import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './account/accountSilce'
export default configureStore({
    reducer: {
        account: accountReducer
    },
})