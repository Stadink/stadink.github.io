import express from 'express';
import Stripe from 'stripe';

// Initialize router
const router = express.Router();

// Initialize Stripe client with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @route   POST /stripe/create-payment-intent
 * @desc    Creates a Stripe PaymentIntent and returns its client secret
 * @access  Public (or protect with auth middleware if needed)
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata } = req.body;

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });

    // Send client secret to the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /stripe/webhook
 * @desc    Handles Stripe webhook events
 * @access  Public
 * 
 * Note: You must set your endpoint secret in environment (STRIPE_WEBHOOK_SECRET)
 */
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('✅ PaymentIntent was successful!', paymentIntent.id);
        // TODO: fulfill order, update database, etc.
        break;
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object;
        console.log('❌ PaymentIntent failed:', failedIntent.last_payment_error?.message);
        // TODO: notify customer or retry
        break;
      // ... handle other relevant events
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

export default router;
