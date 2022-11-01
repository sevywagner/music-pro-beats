import { useState } from "react";

const useInput = (validateData) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    const isValid = validateData(enteredValue);
    const hasError = !isValid && isTouched;

    const inputBlurHandler = (event) => {
        setIsTouched(true);
    }

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        hasError,
        isValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}

export default useInput;