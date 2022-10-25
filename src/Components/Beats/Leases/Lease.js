import Button from "../../UI/Button";
import styles from './../Css/Leases/lease.module.css';
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../Store/cart-slice";

const Lease = (props) => {
    const tempBeat = useSelector((state) => state.beat.tempBeat);
    const dispatch = useDispatch();

    const addHandler = () => {
        const beat = {
            ...tempBeat,
            price: props.price,
            lease: props.title
        }

        dispatch(cartActions.addBeatToCart(beat));
    }

    return (
        <div className={styles.lease}>
            <h2>{props.title}</h2>
            <div className={styles['description-wrap']}>
                <p>{props.description}</p>
            </div>
            <p>${props.price}</p>
            <div className={styles.actions}>
                <Button onClick={addHandler}>Add to cart</Button>
            </div>
        </div>
    );
}

export default Lease;