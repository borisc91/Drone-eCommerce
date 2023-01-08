import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.scss';
import Checkout from './Checkout';



const Cart = props => {

    const [didSubmit, setDidSubmit] = useState(false);

    const [isCheckout, setIsCheckout] =useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalQty = `$${cartCtx.totalQty.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);

    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, qty: 1});

    };

    const orderHandler = () => {
setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
      await fetch('https://ecommerce-e3d5d-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };



    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
                key={item.id}
                name={item.name}
                price={item.price}
                qty={item.qty} />))}</ul>
    );

    const modalActions = <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button-alt']}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>;

    const cartModalContent = <React.Fragment> {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalQty}</span>
    </div>
    {isCheckout && <Checkout onCancel={props.onClose} onConfirm ={submitOrderHandler} />}
    {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <p>Successfully sent the order!</p>

    return (
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting && isSubmittingModalContent}
           {didSubmit && didSubmitModalContent}
        </Modal>

    );
};


export default Cart;