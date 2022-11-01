import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../Store/Redux/cart-slice";
import { useEffect, useRef, useState } from "react";
import styles from './paypal.module.css';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from "./../../../Store/firebase-config";
import emailjs from '@emailjs/browser';
import useInput from "../../../Hooks/use-input";

const Approve = () => {
    const [beatList, setBeatList] = useState([]);
    const [formisValid, setFormIsValid] = useState(true);
    const [hasSent, setHasSent] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const formRef = useRef();
    const beatListRef = ref(storage, "Beats/");
    const cartItems = useSelector(state => state.cart.beats);
    const hasPurchased = useSelector((state) => state.cart.hasPurchased);

    const {
        enteredValue: name,
        hasError: nameHasError,
        isValid: nameIsValid,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    const {
        enteredValue: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput((value) => value.includes('@'));
    

    const sendEmail = (e) => {
        e.preventDefault();

        if (!emailIsValid || !nameIsValid) {
            setFormIsValid(false);
            setHasSent(false);
            return;
        }

        setFormIsValid(true);

        if (hasPurchased) {
            emailjs.sendForm('service_kw159gn', 'template_hdtw3gh', formRef.current, 'btwNFPHJIznru2lf6')
            .then((result) => {
                console.log(result.text);
                setHasSent(true);
                setError(false);
            }, (error) => {
                setError(true);
            });
            dispatch(cartActions.resetCart());
            
            resetName();
            resetEmail();
        } else {
            alert('You haven\'t purchased any items');
        }
    }

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        dispatch(cartActions.setShowDisplay(false));

        try {
            listAll(beatListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        cartItems.forEach((beat) => {
                            if (url.includes(beat.url)) {
                                console.log(url);
                                setBeatList((prevState => [...prevState, url]));
                            }
                        })
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }

        
        // eslint-disable-next-line
    }, [dispatch]);

    let nameClasses = nameHasError ? 'invalid': '';
    let emailClasses = emailHasError ? 'invalid': '';

    return (
        <div>
            <p className={styles.approve}>Your Order Was Approved Thank You!!</p>
            <div className={styles['form-wrap']}>
                {!formisValid && <p className={styles['form-error']}>Form is invalid. Please make sure you've filled out all fields.</p>}
                {hasSent && <p className={styles.sent}>Your beats have been sent to your email.</p>}
                {error && <p className={styles['form-error']}>An error occured while sending your form, please try again.</p>}

                <form ref={formRef} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        className={styles[`${nameClasses}`]}
                    />

                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        className={styles[`${emailClasses}`]}
                    />
                    

                    <textarea className={styles.invisible} type="text" value={beatList.map((beat) => `${beat} `)} name="download_link" onChange={() => {}}></textarea>
                    <button>Email Beats</button>
                </form>
            </div>
        </div>
    );
}

export default Approve;