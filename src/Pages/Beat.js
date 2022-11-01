import BeatList from "../Components/Beats/BeatList";
import Card from "../Components/UI/Card";
import styles from './Css/beat.module.css';
import { motion } from 'framer-motion';
import { cartActions } from "../Store/Redux/cart-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Beat = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
    }, [dispatch])

    return (
        <motion.div
            initial={{transform: "translateX(-100vh)"}}
            animate={{transform: "translateX(0vh)"}}
            exit={{}}
        >
            <p className={styles.title}>Beats</p>
            <Card className={styles.list}>
                <BeatList />
            </Card>
        </motion.div>
    );
}

export default Beat;