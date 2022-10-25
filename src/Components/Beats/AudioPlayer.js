import { Howl, Howler } from 'howler';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { audioActions } from '../../Store/audio-slice';
import styles from './Css/audio-player.module.css';

const AudioPlayer = (props) => {
    const url = useSelector((state) => state.audio.url);
    const audioIsPlaying = useSelector((state) => state.audio.isPlaying);
    const dispatch = useDispatch();
    
    const file = require(`./BeatFiles/${url}.wav`);

    const sound = useRef(new Howl({
        src: file
    }));

    const playHandler = () => {
        dispatch(audioActions.setIsPlaying(true));
    }

    const pauseHandler = () => {
        dispatch(audioActions.setIsPlaying(false));
    }

    useEffect(() => {
        if (audioIsPlaying) {
            sound.current.play();
        } else {
            sound.current.pause();
        }
    }, [audioIsPlaying])

    return (
        <div>
            <button className={styles['pause-play-button']} onClick={playHandler}>Play</button>
            <button className={styles['pause-play-button']} onClick={pauseHandler}>Pause</button>
        </div>
    );
}

export default AudioPlayer;