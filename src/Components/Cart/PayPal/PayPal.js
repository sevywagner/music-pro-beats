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

    return (
        <div>
            <div ref={paypal}></div>
            <PayPalScriptProvider options={{
                "client-id": "Ae4fIZrAFlg_VJRX2IN13linxSoj__Rff5rESzkIi3AMnId1Bxs7R2eugh2uEs_ClN0qauqDr7nsM5e0"
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