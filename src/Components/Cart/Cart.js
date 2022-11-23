import Button from "../UI/Button";
import CartDisplay from "./CartDisplay";
import styles from './Css/cart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../Store/Redux/cart-slice";

const Cart = () => {
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const showDisplay = useSelector((state) => state.cart.showDisplay);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(cartActions.setShowDisplay(!showDisplay));
    }

    return (
        <div className={styles['cart-wrapper']}>
            <div className={styles['button-wrapper']}>
                <Button className={styles.cart} onClick={clickHandler}>Your Cart</Button>
            </div>
            {totalAmount !== 0 && <p className={styles.amount}>{totalAmount}</p>}
            {showDisplay && <CartDisplay onConfirm={clickHandler}/>}
        </div>
    );
}

export default Cart;