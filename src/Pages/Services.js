import { cartActions } from '../Store/Redux/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Css/services.module.css';
import { motion } from 'framer-motion';
import ServiceForm from '../Components/Services/ServiceForm';


const Services = () => {
    const dispatch = useDispatch();
    const soundRef = useSelector((state) => state.audio.ref);
    

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        if (soundRef) {
            soundRef.current.pause();
        }
    }, [dispatch, soundRef]);

    return (
        <motion.div
            initial={{transform: "translateX(150vh)"}}
            animate={{transform: "translateX(0vh)"}}
            exit={{}}
            className={styles.wrapper}
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

            <div className={styles.service}>
                <p className={styles.subtitle}>Web Development</p>
                <p>
                    I coded this entire website using the React.js Framework. If you would like a web application I can design you a modern web app from scratch, so you aren't limited to a template.
                </p>
            </div>

            <ServiceForm />
        </motion.div>
    );
}

export default Services;