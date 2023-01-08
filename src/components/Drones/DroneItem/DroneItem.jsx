import classes from './DroneItem.module.scss'
import DroneItemForm from './DroneItemForm';
import {useContext} from 'react'
import CartContext from '../../../store/cart-context';



const DroneItem = props => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`

    const addItemToCartHandler = qty => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            qty: qty,
            price: props.price
        })

    };

    return (
        <li className={classes.drone}>
            <div><h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            </div>
            <div>
                <DroneItemForm onAddToCart={addItemToCartHandler} id={props.id} />

            </div>
        </li>
    )

};


export default DroneItem;