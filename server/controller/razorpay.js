const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorypay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class RazorpayController {
    async createOrder(req, res) {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };
        try {
            const order = await razorypay.orders.create(options);
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    verifyPayment(req, res) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');
        console.log('Generated Signature:', generated_signature);
        if (generated_signature === razorpay_signature) {
            res.json({ success: true , message: 'Payment verified successfully' });
        } else {
            res.json({ success: false , message: 'Payment verification failed' });
        }
    }
}

const razorpayController = new RazorpayController();
module.exports = razorpayController;