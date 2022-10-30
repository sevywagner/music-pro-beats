import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../Store/Redux/cart-slice";
import { useEffect, useRef, useState } from "react";
import styles from './paypal.module.css';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from "./../../../Store/firebase-config";
import emailjs from '@emailjs/browser';

const Approve = () => {
    const [beatList, setBeatList] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const formRef = useRef();
    const beatListRef = ref(storage, "Beats/");
    const cartItems = useSelector(state => state.cart.beats);
    const hasPurchased = useSelector((state) => state.cart.hasPurchased);

    const sendEmail = (e) => {
        e.preventDefault();

        if (hasPurchased) {
            emailjs.sendForm('service_kw159gn', 'template_hdtw3gh', formRef.current, 'btwNFPHJIznru2lf6')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            dispatch(cartActions.resetCart());
        } else {
            alert('Nice try.');
        }
        
    }

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        dispatch(cartActions.setShowDisplay(false));

        try {
            listAll(beatListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        cartItems.forEach((beat) => {
                            if (url.includes(beat.url)) {
                                console.log(url);
                                setBeatList((prevState => [...prevState, url]));
                            }
                        })
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }

        
        // eslint-disable-next-line
    }, [dispatch]);

    let linkString = '';

    beatList.forEach((link) => {
        linkString.concat(link + ' ');
    })

    return (
        <div>
            <p className={styles.approve}>Your Order Was Approved Thank You!!</p>
            <div className={styles['form-wrap']}>
                <form ref={formRef} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>

                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    

                    <textarea className={styles.invisible} type="text" value={beatList.map((beat) => `${beat} `)} name="download_link" onChange={() => {}}></textarea>
                    <button>Email Beats</button>
                </form>
            </div>
        </div>
    );
}

export default Approve;