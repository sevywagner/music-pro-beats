import { useEffect, useState, useCallback } from "react";
import useHttp from "../../Hooks/use-http";
import BeatItem from "./BeatItem";
import styles from './Css/beat-list.module.css';
import { useDispatch } from "react-redux";
import { beatActions } from "../../Store/beat-slice";

const BeatList = () => {
    const [loadedBeats, setLoadedBeats] = useState([]);
    const { isLoading, error, sendRequest: fetchBeats } = useHttp();
    const dispatch = useDispatch();
    

    const loadBeats = useCallback((beats) => {
        const myBeats = [];

        for (const key in beats) {
            myBeats.push({
                id: key,
                melodicKey: beats[key].melodicKey,
                bpm: beats[key].bpm,
                price: beats[key].price,
                title: beats[key].title,
                url: beats[key].url,
                genre: beats[key].genre
            });
        }

        setLoadedBeats(myBeats);
        dispatch(beatActions.setBeats(myBeats));
    }, [dispatch]);

    useEffect(() => {
        fetchBeats({
            url: 'https://music-pro-beats-default-rtdb.firebaseio.com/beats.json'
        }, loadBeats);
    }, [fetchBeats, loadBeats]);

    return (
        <div className={styles['beat-list']}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {loadedBeats.map((beat) => <BeatItem 
                key={beat.id}
                id={beat.id}
                title={beat.title}
                bpm={beat.bpm}
                genre={beat.genre}
                melodicKey={beat.melodicKey}
                price={beat.price}
            />)}
        </div>
    );
}

export default BeatList;