import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cartActions } from "../../../Store/Redux/cart-slice";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPal = () => {
    const paypal = useRef();
    const navigate = useNavigate();
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     window.paypal.Buttons({
    //         createOrder: (data, actions, error) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [
    //                     {
    //                         description: "Beats",
    //                         amount: {
    //                             currency_code: "USD",
    //                             value: parseFloat(totalPrice + '.00')
    //                         }
    //                     }
    //                 ]
    //             });
    //         },
    //         onApprove: async (data, actions) => {
    //             dispatch(cartActions.setHasPurchased(true));
    //             navigate('/music-pro-beats/success');
    //         },
    //         onError: (error) => {
    //             console.log(error);
    //             navigate('/music-pro-beats/error');
    //         }
    //     }).render(paypal.current);
    // }, [totalPrice, navigate, dispatch]);

    return (
        <div>
            <div ref={paypal}></div>
            <PayPalScriptProvider options={{
                "client-id": "AdCBUAJMi9VBcf2l7Tlcu3BAqpip2TPKrIGC9dpp0FhFfTLFYeOxmbwDu08X0CZeosxvPklU26ld4E0B"
            }}>
                <PayPalButtons 
                    createOrder={(data, actions) => {
                            return actions.order.create({
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
                        }}
                    onApprove={async (data, actions) => {
                        dispatch(cartActions.setHasPurchased(true));
                        navigate('/music-pro-beats/success');
                    }}
                    onError={(error) => {
                        console.log(error);
                        navigate('/music-pro-beats/error');
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}

export default PayPal;