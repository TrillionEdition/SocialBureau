import loadRazorpay from "../utils/loadRazorpay";
import { createOrder, verifyPayment } from "..payment.service";

const CheckoutButton = () => {
    const handlePayment = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) return alert("Razorpay SDK failed");

        const { data: order } = await createOrder(500);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "My MERN App",
            handler: async function (response) {
                await verifyPayment({
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                });
                alert("Payment Successful 🎉");
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default CheckoutButton;
