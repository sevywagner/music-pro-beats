import styles from './Css/beat-item.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import { beatActions } from '../../Store/Redux/beat-slice';

const BeatItem = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkHandler = () => {
        const tempBeat = {
            id: props.id,
            title: props.title,
            genre: props.genre,
            melodicKey: props.melodicKey,
            bpm: props.bpm,
            url: props.url
        }

        dispatch(beatActions.setBeat(tempBeat));
        navigate(`/music-pro-beats/beats/${props.id}`);
    }

    return (
            <div className={styles.beat}>
                <div className={styles.title}>
                    <p>"{props.title}"</p>
                </div>
                <div className={styles.genre}>
                    <p>{props.genre}</p>
                </div>
                <div className={styles['melodic-key']}>
                    <p>{props.melodicKey}</p>
                </div>
                <div className={styles.bpm}>
                    <p>{props.bpm}</p>
                </div>
                <div className={styles.actions}>
                    <Button onClick={checkHandler}>Check it Out</Button>
                </div>
            </div>
    );
}

export default BeatItem;