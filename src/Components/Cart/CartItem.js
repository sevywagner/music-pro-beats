import styles from './Css/cart-item.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Redux/cart-slice';

const CartItem = (props) => {
    const dispatch = useDispatch();
    
    const removeHandler = () => {
        dispatch(cartActions.removeBeat(props.id));
    }

    return (
        <div className={styles['cart-item']}>
            <div className={styles.button}>
                <button onClick={removeHandler}>-</button>
            </div>
            <div className={styles.title}>
                <p>{props.title}</p>
            </div>
            <div className={styles['lease-type']}>
                <p className={styles.lease}>{props.lease}</p>
            </div>
            <div className={styles.price}>
                <p>${props.price}</p>
            </div>
        </div>
    );
}

export default CartItem;