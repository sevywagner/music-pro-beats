import emailjs from '@emailjs/browser';
import { Fragment, useRef, useState } from 'react';
import styles from './../../Pages/Css/services.module.css';


const ServiceForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState();
    const [error, setError] = useState(false);
    const [service, setService] = useState();
    const formRef = useRef();
    const [hasSent, setHasSent] = useState(false);

    const emailForm = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_kw159gn', 'template_wgfqmd7', formRef.current, 'btwNFPHJIznru2lf6').then(result => {
            console.log(result.text)
            setHasSent(true);
            setError(false);
        }, (error) => {
            console.log(error.text)
            setError(true);
        });

        setName('');
        setEmail('');
        setMessage('');
        setService('- Select -');
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const messageChangeHandler = (event) => {
        setMessage(event.target.value);
    }

    const dropdownHandler = (event) => {
        setService(event.target.value);
    }


    return (
        <Fragment>
            {hasSent && <p className={styles.sent}>Sent, I will get back to you within the next couple days</p>}
            {error && <p className={styles.sent}>An error occured while sending your form, please try again.</p>}
            <div className={styles['form-wrap']}>
                
                <form ref={formRef} onSubmit={emailForm}>
                    <p className={styles['form-title']}>Request a Service</p>

                    <select value={service} name='service' onChange={dropdownHandler}>
                        <option>- Select -</option>
                        <option value='Engineering'>Engineering</option>
                        <option value='Custom Beat'>Custom Beat</option>
                        <option value='Web Dev'>Web Development</option>
                    </select>

                    <label>Full Name</label>
                    <input name='name' value={name} onChange={nameChangeHandler} type="text" />

                    <label>Email</label>
                    <input name='email' value={email} onChange={emailChangeHandler} type="text" />

                    <label>Message</label>
                    <textarea name='message' value={message} onChange={messageChangeHandler} />

                    <button>Submit</button>
                </form>
            </div>
        </Fragment>
        
    );
}

export default ServiceForm;