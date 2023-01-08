import { useState, useContext, Fragment } from 'react'
import Drones from '../components/Drones/Drones'
import Header from '../components/Layout/Header'
import Cart from '../components/Cart/Cart'
import { Switch, Route, useHistory } from 'react-router-dom';

import CartContext from '../store/cart-context';
import AuthPage from './AuthPage';


const HomePage = () => {


    const history = useHistory();

    const authCtx = useContext(CartContext);

  const [cartIsShown, setCartIsShown] = useState(false);
  
  const showCartHandler = () => {

    if(authCtx.isLoggedIn){
    setCartIsShown(true);
    }else {
        history.replace('/signin');
    }

  };

  const hideCartHandler = () => {
setCartIsShown(false);
  };

  return (
    <Fragment>
      
      <Switch>
        
        <Route path='/auth'>
          <AuthPage />
        </Route>
        
      
      </Switch>
    
      {cartIsShown && <Cart onClose ={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Drones />
      </main>
      </Fragment>
    
  )
}

export default HomePage;
