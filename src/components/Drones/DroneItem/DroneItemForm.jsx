import classes from './DroneItemForm.module.scss'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const DroneItemForm = props => {

    const [qtyIsValid, setQtyIsValid] = useState(true);

    const qtyInputRef = useRef();

    const submitHandler = e => {
        e.preventDefault();

        const enteredQty = qtyInputRef.current.value;
        const enteredQtyNumber = +enteredQty;


        if(enteredQty.trim().length === 0 || enteredQtyNumber < 1 || enteredQtyNumber >5){
           
            setQtyIsValid(false);
            return;
        } 

        props.onAddToCart(enteredQtyNumber);
    };



return (
<form className={classes.form} onSubmit={submitHandler}>
    <Input 
    ref={qtyInputRef} label="Qty" input={{
        id: 'Qty_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    }} />
    <button>Add To Cart</button>
    {!qtyIsValid && <p>Please enter a valid number from 1 to 5</p>}
</form>
);
};


export default DroneItemForm;