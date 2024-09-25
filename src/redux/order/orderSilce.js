import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';


const initialState = { carts: [] };

const orderSilce = createSlice({
    name: "order",
    initialState,
    reducers: {
        doGetDetailBook(state, action) {
            const item = action.payload;
            let carts = state.carts;

            let isIndex = carts.findIndex(c => c._id === item._id);

            if (isIndex > -1) {
                carts[isIndex].quantity = carts[isIndex].quantity + item.quantity;
            } else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
            }
            message.success("Sản phẩm đã được thêm vào Giỏ hàng");
            state.carts = carts;
        },
        doRemoveOrder(state, action) {
            const item = action.payload;
            let carts = state.carts;
            console.log(item)
            let index = carts.findIndex(c => c._id === item._id);

            carts.splice(index)
            message.success("Sản phẩm đã được xóa khói Giỏ hàng");

            state.carts = carts;

        }
    }
})

export const { doGetDetailBook, doRemoveOrder } = orderSilce.actions;
export default orderSilce.reducer