import styles from './Css/home.module.css';
import { cartActions } from '../Store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Backdrop = () => {
    return (
        <div className={styles.home}></div>
    );
}

const Home = () => {
    const dispatch = useDispatch();
    const soundRef = useSelector((state) => state.audio.ref);

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        if (soundRef) {
            soundRef.current.pause();
        }
    }, [dispatch, soundRef]);

    return (
        <div className={styles.home}>
            <p>Welcome</p>
        </div>
    );
}

export default Home;