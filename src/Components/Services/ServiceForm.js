import emailjs from '@emailjs/browser';
import { Fragment, useRef, useState } from 'react';
import styles from './../../Pages/Css/services.module.css';
import useInput from '../../Hooks/use-input';

const ServiceForm = () => {
    const [error, setError] = useState(false);
    const formRef = useRef();
    const [hasSent, setHasSent] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);

    const {
        value: name,
        hasError: nameHasError,
        isValid: nameIsValid,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((data) => data.trim() !== '');

    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput((data) => data.includes('@'));

    const {
        value: service,
        hasError: selectHasError,
        isValid: selectIsValid,
        valueChangeHandler: selectChangeHandler,
        inputBlurHandler: selectBlurHandler
    } = useInput((data) => data !== '- Select -');

    const {
        value: message,
        hasError: messageHasError,
        isValid: messageIsValid,
        valueChangeHandler: messageChangeHandler,
        inputBlurHandler: messageBlurHandler,
        reset: resetMessage
    } = useInput((data) => data.trim() !== '');

    const emailForm = (event) => {
        event.preventDefault();

        if (!nameIsValid || !emailIsValid || !selectIsValid || !messageIsValid) {
            setFormIsValid(false);
            return;
        }

        setFormIsValid(true);

        emailjs.sendForm('service_kw159gn', 'template_wgfqmd7', formRef.current, 'btwNFPHJIznru2lf6').then(result => {
            console.log(result.text)
            setHasSent(true);
            setError(false);
        }, (error) => {
            console.log(error.text)
            setError(true);
        });

        resetName();
        resetEmail();
        resetMessage();
    }

    let nameClasses = nameHasError ? 'invalid' : '';
    let emailClasses = emailHasError ? 'invalid' : '';
    let messageClasses = messageHasError ? 'invalid' : '';
    let selectClasses = selectHasError ? 'invalid' : '';

    return (
        <Fragment>
            {!formIsValid && <p className={styles['form-error']}>Form is invalid. Please make sure you've filled out all fields.</p>}
            {hasSent && <p className={styles.sent}>Sent, I will get back to you within the next couple days</p>}
            {error && <p className={styles.sent}>An error occured while sending your form, please try again.</p>}
            <div className={styles['form-wrap']}>
                
                <form ref={formRef} onSubmit={emailForm}>
                    <p className={styles['form-title']}>Request a Service</p>

                    <select 
                        value={service} 
                        name='service' 
                        onBlur={selectBlurHandler}
                        onChange={selectChangeHandler}
                        className={styles[`${selectClasses}`]}
                    >
                        <option>- Select -</option>
                        <option value='Engineering'>Engineering</option>
                        <option value='Custom Beat'>Custom Beat</option>
                        <option value='Web Dev'>Web Development</option>
                    </select>

                    <label>Full Name</label>
                    <input
                        name='name' 
                        value={name} 
                        onBlur={nameBlurHandler}
                        onChange={nameChangeHandler} 
                        type="text" 
                        className={styles[`${nameClasses}`]}
                    />

                    <label>Email</label>
                    <input 
                        name='email'
                        value={email} 
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler} 
                        type="text"
                        className={styles[`${emailClasses}`]}
                    />

                    <label>Message</label>
                    <textarea 
                        name='message' 
                        value={message} 
                        onBlur={messageBlurHandler}
                        onChange={messageChangeHandler} 
                        className={styles[`${messageClasses}`]}
                    />

                    <button>Submit</button>
                </form>
            </div>
        </Fragment>
        
    );
}

export default ServiceForm;