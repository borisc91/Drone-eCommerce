import classes from './HeaderCartButton.module.scss'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';


const HeaderCartButton = (props) => {

    const [btnIsAnimated, setBtnIsAnimated] = useState(false);


const cartCtx = useContext(CartContext);

const { items } = cartCtx;

const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.qty;
}, 0)


const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`;


useEffect(() => {
    if(cartCtx.items.length === 0){
        return;
    }
    setBtnIsAnimated(true);

    const timer = setTimeout(() => {
        setBtnIsAnimated(false);
    }, 300);

    return () => {
clearTimeout(timer)
    };

}, [items]);


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}


export default HeaderCartButton;