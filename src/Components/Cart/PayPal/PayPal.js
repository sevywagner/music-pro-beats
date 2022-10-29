import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cartActions } from "../../../Store/Redux/cart-slice";

const PayPal = () => {
    const paypal = useRef();
    const navigate = useNavigate();
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, error) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Beats",
                            amount: {
                                currency_code: "USD",
                                value: parseFloat(totalPrice + '.00')
                            }
                        }
                    ]
                });
            },
            onApprove: async (data, actions) => {
                dispatch(cartActions.setHasPurchased(true));
                navigate('/success');
            },
            onError: (error) => {
                console.log(error);
                navigate('/error');
            }
        }).render(paypal.current);
    }, [totalPrice, navigate, dispatch]);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default PayPal;