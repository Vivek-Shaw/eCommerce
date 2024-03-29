import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem: (state, action) =>{
            const {product} = action.payload
            const item = state.cartItems.find((i)=>i.cartID === product.cartID);
            if(item){
                item.amount += product.amount;
            }
            else{
                state.cartItems.push(product);
            }
        },
        clearCart: (state)=>{},
        removeitem: (state, action)=>{},
        editItem: (state, action)=>{},
    }
})

export const { addItem, clearCart, removeitem, editItem } = cartSlice.actions

export default cartSlice.reducer;