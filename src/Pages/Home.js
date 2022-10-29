import styles from './Css/home.module.css';
import { cartActions } from '../Store/Redux/cart-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
//import tag from './../Components/Beats/BeatFiles/tag.mp3';
//import { beatActions } from '../Store/beat-slice';

export const Backdrop = () => {
    return (
        <div className={styles.home}></div>
    );
}

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
    }, [dispatch]);

    return (
        <div className={styles.home}>
            <p>Welcome</p>
        </div>
    );
}

export default Home;