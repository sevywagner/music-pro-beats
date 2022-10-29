import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../Store/Redux/cart-slice";
import { useEffect, useRef, useState } from "react";
import styles from './paypal.module.css';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from "./../../../Store/firebase-config";
import emailjs from '@emailjs/browser';

const Approve = () => {
    const [beatList, setBeatList] = useState([]);
    const [storedBeatNames, setStoreBeatNames] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const formRef = useRef();
    const beatListRef = ref(storage, "Beats/");
    const cartItems = useSelector(state => state.cart.beats);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_kw159gn', 'template_hdtw3gh', formRef.current, 'btwNFPHJIznru2lf6')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        dispatch(cartActions.setShowDisplay(false));

        try {
            listAll(beatListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setBeatList((prevState => [...prevState, url]));
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }


        listAll(beatListRef).then((response) => {
            response.items.forEach((item) => setStoreBeatNames((prevState) => [...prevState]));
        });

        for (let i; i < beatList.length; i++) {
            for (let j; j < cartItems.length; j++) {
                if (beatList[i].includes(cartItems[j].url)) {
                    emailLinks.push(beatList[i]);
                    console.log(beatList[i]);
                }
            }
        }

        // eslint-disable-next-line
    }, []);

    const emailLinks = [...storedBeatNames]; //just for the sake of a no warning console

    return (
        <div>
            <form ref={formRef} onSubmit={sendEmail}>
                <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                {/* <textarea className={styles.invisible} type="text" name="download_link" onChange={() => {}}>{emailLinks.map((link) => `${link}`)}</textarea> */}
                {/* <textarea className={styles.invisible} type="text" value={links} name="download_link" onChange={() => {}} /> */}
                <button>Press</button>
            </form>
            <p className={styles.approve}>Your Order Was Approved Thank You!!</p>
            
        </div>
    );
}

export default Approve;