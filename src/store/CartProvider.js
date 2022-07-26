import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

// reducer function takes in state and action as parameters
const cartReducer = (state, action) => {

    if(action.type === 'ADD'){
        // add item to old state in an immutable way
        
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }

        let updatedTotalAmount = state.totalAmount + (action.payload.price * action.payload.amount);
   

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };;
    }
    else if(action.type === 'REMOVE'){
 

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;


        //remove the item entirely when only just one is left 
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter((item) => item.id !== action.id);
        }
        else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }
    return defaultCartState;
}

const CartProvider = props => {
  
    // now on, cartState is the current state of cart
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
   

    const addItemhandler = item => {
        dispatchCartAction({ type: 'ADD', payload: item })
    }

    const removeItemhandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemhandler,
        removeItem: removeItemhandler
    }


    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;