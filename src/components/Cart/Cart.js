
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {

   const cartCtx = useContext(CartContext);

   const totalAmountInCart = `$${cartCtx.totalAmount.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;
   
   const addToCartHandler = (item) => {
      cartCtx.addItem({...item, amount: 1});
   }

   const removeFromCartHandler = (id) => {
       cartCtx.removeItem(id);   
   }


  return (
    <Modal onClose={props.onCloseCart}>
        {cartCtx.items.map((item) => {
            return <CartItem key={item.id} item={item} 
                             onAdd={addToCartHandler.bind(null, item)}
                             onRemove={removeFromCartHandler.bind(null, item.id)} />
        })}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmountInCart}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart;