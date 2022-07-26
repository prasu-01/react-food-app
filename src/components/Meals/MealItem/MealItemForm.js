import { useState, useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

  const amountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const amountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5){
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(amountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input 
             ref={amountRef}
             label="Amount" 
             input={{
                id: 'amount'+ props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
             }} />
        <button> + Add</button>
        {!amountIsValid && <p> Please enter a valid number</p>} 
    </form>
  )
}

export default MealItemForm;