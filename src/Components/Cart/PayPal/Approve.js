import { useDispatch } from "react-redux";
import { cartActions } from "../../../Store/cart-slice";
import { useEffect, useState } from "react";
import styles from './paypal.module.css';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from "./../../../Store/firebase-config";

const Approve = () => {
    const [beatList, setBeatList] = useState([]);
    const dispatch = useDispatch();
    const beatListRef = ref(storage, "Beats/");


    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        dispatch(cartActions.setShowDisplay(false));

        listAll(beatListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setBeatList((prevState => [...prevState, url]));
                });
            });
        });
    }, [dispatch, beatListRef]);

    return (
        <div>
            <p className={styles.approve}>Your Order Was Approved Thank You!!</p>
            <a href={beatList[0]}>Download</a>
        </div>
    );
}

export default Approve;