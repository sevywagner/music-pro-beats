import { cartActions } from '../Store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Services = () => {
    const dispatch = useDispatch();
    const soundRef = useSelector((state) => state.audio.ref);

    useEffect(() => {
        dispatch(cartActions.setCheckPricing(false));
        if (soundRef) {
            soundRef.current.pause();
        }
    }, [dispatch, soundRef]);

    return (
        <div>
            <p>Services</p>
        </div>
    );
}

export default Services;