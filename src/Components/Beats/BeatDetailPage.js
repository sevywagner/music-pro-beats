import Button from "../UI/Button";
import styles from './Css/beat-detail.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cartActions } from "../../Store/Redux/cart-slice";
import { audioActions } from "../../Store/Redux/audio-slice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';

const BeatDetailPage = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkPricingState = useSelector((state) => state.cart.checkPricing)

    const params = useParams();
    const loadedBeats = useSelector((state) => state.beat.loadedBeats);
    const beat = loadedBeats.find((beat) => beat.id === params.beatId);

    const backHandler = () => {
        dispatch(cartActions.setCheckPricing(false));
        navigate('/music-pro-beats/beats', {replace: true});
    }

    const togglePlayHandler = () => {
        setIsPlaying((prevState) => !prevState);
    }

    useEffect(() => {
        dispatch(audioActions.setAudioUrl(beat.url));

        if (isPlaying) {
            dispatch(audioActions.setIsPlaying(true));
        } else {
            dispatch(audioActions.setIsPlaying(false));
        }
    }, [isPlaying, beat, dispatch])

    const viewLeaseHandler = () => {
        dispatch(cartActions.setCheckPricing(!checkPricingState));
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{display: "none"}}
        >
            <div className={styles['beat-page']}>

                <div className={styles.left}>
                    <div className={styles.title}>
                        <h1>{beat.title}</h1>
                    </div>
                    <div className={styles.beats}>
                        <button
                            className={styles['pause-play-button']}
                            onClick={togglePlayHandler}
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                    <div className={styles.actions}>
                        <Button onClick={backHandler} className={styles.back}>Back</Button>
                        <Button onClick={viewLeaseHandler} className={styles.add}>{checkPricingState ? 'Return' : 'View Leases'}</Button>
                    </div>
                </div>

                <div className={styles.right}>
                    <p>{beat.genre}</p>
                    <p>{beat.melodicKey}</p>
                    <p>{beat.bpm} BPM</p>
                </div>
                
            </div>
        </motion.div>
    );
}

export default BeatDetailPage;