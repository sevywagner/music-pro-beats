import './App.css';
import { Backdrop } from './Pages/Home';
import Outline from './Components/Layout/Outline';
import { useSelector, useDispatch } from 'react-redux';
import LeaseList from './Components/Beats/Leases/LeaseList';
import AnimatedRoutes from './Components/UI/AnimatedRoutes';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { audioActions } from './Store/Redux/audio-slice';
//import useHttp from './Hooks/use-http';

function App() {
  const checkPricing = useSelector((state) => state.cart.checkPricing);
  const audio = useSelector((state) => state.audio);
  const location = useLocation();
  const dispatch = useDispatch();
  // const { isLoading, error, sendRequest } = useHttp();

  // const sendBeats = () => {
  //   sendRequest({
  //     url: 'https://music-pro-beats-default-rtdb.firebaseio.com/beats.json',
  //     method: 'POST',
  //     body: {
  //       id: 'b8',
  //       bpm: '90',
  //       genre: 'Trap/Boom-Bap',
  //       melodicKey: '',
  //       price: '100',
  //       title: 'Class',
  //       url: 'Class'
  //     },
  //     headers: {
  //       "Content-Type": "Application/js"
  //     }
  //   }, () => {});
  // }
  

  const sound = useRef(new Audio());
  useEffect(() => {
    const playPause = async () => {
      if (audio.audioUrl) {
        const file = require(`./Components/Beats/BeatFiles/${audio.audioUrl}.wav`);
        sound.current.src = file;
        await sound.current.load();
        if (audio.isPlaying) {  
          await sound.current.play();
        }
        } else {
          await sound.current.pause();
          dispatch(audioActions.setIsPlaying(false));
        }

        if (location.pathname === '/music-pro-beats/home' || 
            location.pathname === '/music-pro-beats/beats' || 
            location.pathname === '/music-pro-beats/services' ||
            location.pathname === '/music-pro-beats/success'
          ) {
          await sound.current.pause();
          dispatch(audioActions.setIsPlaying(false));
      }
    }

    playPause();

    

  }, [audio, location, sound, dispatch])

  return (
    <div className="App">
      <Backdrop />
      <Outline>
        <AnimatedRoutes />
      </Outline>

      <div className='list'>
        {checkPricing && <LeaseList />}
      </div>
      {/* <button onClick={sendBeats}>Send</button> */}
    </div>
  );
}

export default App;
