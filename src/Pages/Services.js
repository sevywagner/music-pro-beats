import { cartActions } from '../Store/Redux/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import styles from './Css/services.module.css';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Services = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState();
    const [hasSent, setHasSent] = useState(false);
    const dispatch = useDispatch();
    const soundRef = useSelector((state) => state.audio.ref);
    const formRef = useRef();

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        if (soundRef) {
            soundRef.current.pause();
        }
    }, [dispatch, soundRef]);

    const emailForm = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_kw159gn', 'template_wgfqmd7', formRef.current, 'btwNFPHJIznru2lf6').then(result => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        });

        setName('');
        setEmail('');
        setMessage('');
        setHasSent(true);
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

    return (
        <motion.div
            initial={{transform: "translateX(150vh)"}}
            animate={{transform: "translateX(0vh)"}}
            exit={{}}
        >
            <p className={styles.title}>Services</p>

            <div className={styles.service}>
                <p className={styles.subtitle}>Vocal Engineering</p>
                <p>
                    Send me your vocal stems dry and I will return it to you mixed AND mastered(not just a soft clipper on the master) so you can have it ready to send right upon recieving it.
                </p>
            </div>

            <div className={styles.service}>
                <p className={styles.subtitle}>Custom beat</p>
                <p>
                    Given any reference, be it an artist, or just a song, or even just "_____ type beat" I can make you something from scratch, no payment until you know you like the beat.
                </p>
            </div>

            {hasSent && <p className={styles.sent}>Sent, I will be get back to you within the next couple days</p>}

            <div className={styles['form-wrap']}>
                <form ref={formRef} onSubmit={emailForm}>

                    <label>Full Name</label>
                    <input name='name' value={name} onChange={nameChangeHandler} type="text" />

                    <label>Email</label>
                    <input name='email' value={email} onChange={emailChangeHandler} type="text" />

                    <label>Message</label>
                    <textarea name='message' value={message} onChange={messageChangeHandler} />

                    <button>Submit</button>
                </form>
            </div>
        </motion.div>
    );
}

export default Services;