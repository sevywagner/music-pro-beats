import BeatList from "../Components/Beats/BeatList";
import Card from "../Components/UI/Card";
import styles from './Css/beat.module.css';
import { motion } from 'framer-motion';

const Beat = () => {
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