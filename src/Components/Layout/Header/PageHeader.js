import styles from './page-header.module.css';
import { NavLink } from 'react-router-dom';
import Cart from '../../Cart/Cart';
import { Fragment } from 'react';

const PageHeader = (props) => {
    return (
        <Fragment>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.img}></div>
                    <h1>Music Pro Beats</h1>
                </div>
                <div className={styles.nav}>
                    <NavLink to="/music-pro-beats/home">Home</NavLink>
                    <NavLink to="/music-pro-beats/beats">Beats</NavLink>
                    <NavLink to="/music-pro-beats/services">Services</NavLink>
                </div>
                <div className={styles.cart}>
                    <Cart />
                </div>
            </div>
        </Fragment>
    );
}

export default PageHeader;