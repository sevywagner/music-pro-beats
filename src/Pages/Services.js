import { cartActions } from '../Store/Redux/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Css/services.module.css';
import { motion } from 'framer-motion';

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
        </motion.div>
    );
}

export default Services;