import styles from './Css/cart-item.module.css';

const CartItem = (props) => {
    return (
        <div className={styles['cart-item']}>
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