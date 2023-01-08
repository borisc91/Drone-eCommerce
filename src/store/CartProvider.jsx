import { useReducer, useState, useEffect } from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalQty: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {

        const updatedTotalQty = state.totalQty + action.item.price * action.item.qty;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                qty: existingCartItem.qty + action.item.qty
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {

            updatedItems = state.items.concat(action.item);
        }


        return {
            items: updatedItems,
            totalQty: updatedTotalQty
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalQty = state.totalQty - existingItem.price;
        let updatedItems;
        if (existingItem.qty === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }


        return {
            items: updatedItems,
            totalQty: updatedTotalQty
        }
    }
    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
};

let logoutTimer;

const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};


const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 6000) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
}

const CartProvider = props => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    if(tokenData){
        
        initialToken = tokenData.token;
    }; 
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;




    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    };

    const loginHandler = (token, expirationTime) => {

        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime)

    };

    useEffect(() => {
        if(tokenData){
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData]);
    

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {

        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };


    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    };

    const carttContext = {
        items: cartState.items,
        totalQty: cartState.totalQty,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };


    return (
        <CartContext.Provider value={carttContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;