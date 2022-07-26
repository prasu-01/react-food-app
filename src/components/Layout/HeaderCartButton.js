import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {

   const cartCtx =  useContext(CartContext);  // whenever the context changes, react revaluates the component


   // each time an item is added to the cart, it adds the number of same item to the 
   // current total number of items in cart
   // here amount is the number of that particular items

   const cartItemsNumber = cartCtx.items.reduce((curAmt, item) => {
    return curAmt + item.amount;
   }, 0);


    return (
        <button className={classes.button} onClick={props.onClickBtn}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
               {cartItemsNumber}
            </span>
        </button>
    )
}

export default HeaderCartButton;