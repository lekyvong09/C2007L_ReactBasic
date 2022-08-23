import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM_TO_CART') {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        let updatedItems = [];
        if (index !== -1) {
            const quantity = state.items[index].qty + 1;
            const updateCart = {...state.items[index], qty: quantity};
            const updateCarts = [...state.items];
            updateCarts[index] = updateCart;
            updatedItems = updateCarts;
        } else {
            updatedItems = state.items.concat(action.payload);
        }
        const updatedTotalAmount = state.totalAmount + action.payload.unit;
        console.log(updatedItems);
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if (action.type === 'REMOVE_ITEM_FROM_CART') {
        const index = state.items.findIndex(item => item.id === action.payload);
        const existingItem = state.items[index];
        let updatedItems = [];
        if (existingItem.qty > 1) {
            const quantity = state.items[index].qty - 1;
            const updateCart = {...state.items[index], qty: quantity};
            const updateCarts = [...state.items];
            updateCarts[index] = updateCart;
            updatedItems = updateCarts;
        } else {
            updatedItems = state.items.filter(item => item.id !== action.payload);
        }
        const updatedTotalAmount = state.totalAmount - action.payload.unit;
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if (action.type === 'RESET_SHOPPING_CART') {
        return {items: [], totalAmount: 0};
    }
    return {items: [], totalAmount: 0}
}

function CartProvider(props) {
    const [cartState, cartDispatcher] = useReducer(cartReducer, {items: [], totalAmount: 0});

    const addItemToCartHandler = item => {
        cartDispatcher({type: 'ADD_ITEM_TO_CART', payload: item})
    };

    const removeItemFromCartHandler = id => {
        cartDispatcher({type: 'REMOVE_ITEM_FROM_CART', payload: id})
    };

    const resetShoppingCart = () => {
        cartDispatcher({type: 'RESET_SHOPPING_CART'});
    }
    
    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      reset: resetShoppingCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;

