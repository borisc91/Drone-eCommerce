import { useState } from 'react'
import CartProvider from './store/CartProvider';
import { Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



function App() {

  const [cartIsShown, setCartIsShown] = useState(false);
  
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
setCartIsShown(false);
  };

  return (
    
    <CartProvider>
      <Switch>
        
        <Route path='/signin'>
          <AuthPage />
        </Route>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      
      </Switch>
      </CartProvider>
    
     
    
  )
}

export default App
