import { useState, useRef, useContext } from 'react';
import CartContext from '../../store/cart-context';
import { useHistory } from 'react-router-dom';


import classes from './AuthForm.module.scss';



const isEmpty = value => value.trim() === '' && !value.includes('@') ;
const isSixChars = value => value.trim().length >= 6;



const AuthForm = () => {

  const history = useHistory();

 const authCtx = useContext(CartContext);


  const [formValidity, setFormValidity] = useState({

    email: true,
    password: true
});




  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const enteredPassword = passwordInputRef.current.value;

    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = isSixChars(enteredPassword);

    setFormValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid
     
  });

  const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;



  if(!formIsValid){
    console.log('neuspesno')
      return;

  }

    setIsLoading(true);
    let url;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAWBeaj13-Xj9OJToPO2eHZgFMvlpjZcQ'

    }else {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAWBeaj13-Xj9OJToPO2eHZgFMvlpjZcQ';
      
    }

    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);
        if(res.ok){
          

          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!;'
            
           
            throw new Error(errorMessage);
  
          })
        }
      }).then(data => {
        if(isLogin){
            
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                    authCtx.login(data.idToken, expirationTime.toISOString());
                    history.replace('/');
                  }}).catch(err=> {
        
                    alert(err.message);
        
                  });;
                
    

  };

  

  const emailControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
const passwordControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailControlClasses}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
          {!formValidity.email && <p>Please enter a valid email!</p>}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
          {!formValidity.password && <p>Please enter a valid password(6 characters minimum)!</p>}
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p>Sending request..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
