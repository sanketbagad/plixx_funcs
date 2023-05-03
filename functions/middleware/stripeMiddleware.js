import express from 'express';
// import stripe from 'stripe';

//  const stripe = require('stripe')("sk_test_51Md94jSDJwBZbd2CmhfitPSgNDKaI24udGyQoSNWVDuredZfZt8wsnF9RXAThkZ83UG3EwGnM2O2GRqTcOtxudvo00V1GyEl3P");
// write the code to import stripe here in ES6

import stripe from 'stripe'

const apiKey = "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";

const stripeClient = stripe(apiKey);

const paymentRouter = express.Router();
import { PaymentModel, UserModel } from '../Models/UsersModel.js';
import { protect } from './authMiddleware.js';

paymentRouter.get('/config', (req, res) => {
    res.send({
        publishableKey: "pk_live_51Md94jSDJwBZbd2Cp8svGV347stvMxH8GSIsaw0CfBqxMVLZe1Qws1pahyvtd14wTGP3z7o5wC7XZXgWHGK5V0tI00bi5PB2jK",
    });
});

paymentRouter.post('/create-payment-intent', protect, async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripeClient.com/docs/api/payment_intents/create
    const { amount} = req.body;
    try {
        const paymentIntent = await stripeClient.paymentIntents.create({
            currency: 'INR',
            amount: amount,
            //   automatic_payment_methods: { enabled: true }
            // payment_method_types: ['cards'],
            payment_method_types: ['card'],
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

paymentRouter.post('/webhook', protect, express.raw({ type: 'application/json' }), async (request, response) => {
    let data, eventType;

    // Check if webhook signing is configured.
    if ("whsec_44a4b406105177b3cff0e32d3c4cf1098af34c5ed0bd0b0f19118835cda0346a") {

        let event;
        let signature = request.headers['stripe-signature'];
        try {
            event = stripeClient.webhooks.constructEvent(
                request.rawBody,
                signature,
                "whsec_44a4b406105177b3cff0e32d3c4cf1098af34c5ed0bd0b0f19118835cda0346a"
            );
            data = event.data;
            eventType = event.type;
        } catch (err) {
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        data = event.data;
        eventType = event.type;
    } else {
        data = request.body.data;
        eventType = request.body.type;
    }
    console.log(eventType);

    if (eventType === 'payment_intent.succeeded') {
        await PaymentModel.create({
            paymentMethod: "Stripe",
            hasPaid: true,
            paymentResult: "success",
        });

        let user = await UserModel.findById(request.user._id);
        user.hasPaid = true;
        await user.save();
        console.log('💰 Payment received!');
        return response.status(200).send(`Webhook received: ${eventType}`);
    } else if (eventType === 'payment_method.attached') {
        const paymentMethod = data.object;
        console.log('💳 PaymentMethod was attached to a Customer!');
    }
    // Return a response to acknowledge receipt of the event
    else if (eventType === 'payment_intent.payment_failed') {
        const paymentIntent = data.object;
        console.log('❌ Payment failed.');
    }


    response.status(200).send(`Webhook received: ${eventType}`);
});

export default paymentRouter;





