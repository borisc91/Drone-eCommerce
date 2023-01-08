import classes from "./Header.module.scss"
import { Link } from 'react-router-dom';
import {Fragment, useContext} from 'react';
import HeaderCartButton from './HeaderCartButton'
import CartContext from "../../store/cart-context";
import drones from '../../assets/dronovi.jpg'



const Header = props => {

    const authCtx = useContext(CartContext);
    
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }




    return <Fragment>
<header className={classes.header}>
    <Link to='/'><h1>eComm Drones</h1></Link>
    <div className={classes.headerright}>
    {!isLoggedIn &&  <Link to='/signin'><button className={classes.button}>Login</button></Link>}
    {isLoggedIn && <button className={classes.button} onClick={logoutHandler}>Logout</button> }
    
    <HeaderCartButton onClick={props.onShowCart} />
    </div>
</header>
<div className={classes['main-image']}>
    <img src={drones} atl="" />
</div>
    </Fragment>

};


export default Header;