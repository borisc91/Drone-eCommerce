import React from 'react';


const CartContext = React.createContext({
    items: [],
    totalQty: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});


export default CartContext;

