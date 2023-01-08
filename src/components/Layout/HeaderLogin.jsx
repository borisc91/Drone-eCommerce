import classes from "./Header.module.scss"
import { Link } from 'react-router-dom';
import {Fragment} from 'react';





const HeaderLogin = () => {

   

    
    


    return <Fragment>
<header className={classes.header}>
    <Link to='/'><h1>Homepage</h1></Link>
    
</header>
    </Fragment>

};


export default HeaderLogin;