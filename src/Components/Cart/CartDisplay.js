import ReactDOM from "react-dom";
import styles from './Css/cart-display.module.css';
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useState } from "react";
import PayPal from "./PayPal/PayPal";

const Interface = (props) => {
    const cart = useSelector((state) => state.cart);
    const [checkOut, setCheckOut] = useState(false);

    const checkOutHandler = () => {
        setCheckOut(true);
    }
    

    return (
        <div className={styles.interface}>
            <Card className={styles['cart-display']}>
                <div className={styles.items}>
                    <div className={styles.title}>
                        <h1>Your Cart</h1>
                    </div>
                    <div className={styles['cart-items']}>
                        {cart.totalAmount === 0 && 
                            <p className={styles.empty}>No items yet. If you add one you will see it here.</p>
                        }
                        {cart.beats.map(beat => <CartItem key={beat.id} title={beat.title} lease={beat.lease} price={beat.price}/>)}
                    </div>
                    <div className={styles.total}>
                        <h2>Total: </h2>
                        <h2>${cart.totalPrice}</h2>
                    </div>
                    <div className={styles.actions}>
                        {checkOut ? <PayPal /> : <Button className={styles['checkout-button']} onClick={checkOutHandler}>Checkout</Button>}

                        <Button onClick={props.onConfirm}>Close</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

const Overlay = () => {
    return (
        <div className={styles.overlay}></div>
    );
}

const CartDisplay = (props) => {
    return (
        <div>
            {ReactDOM.createPortal(<Interface onConfirm={props.onConfirm} />, document.getElementById('interface-root'))}
            {ReactDOM.createPortal(<Overlay />, document.getElementById('overlay-root'))}
        </div>
    );
}

export default CartDisplay;