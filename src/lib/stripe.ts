import * as sdk from '@stripe/stripe-js';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;

export const StripeInstance = new Stripe(`${STRIPE_SECRET_KEY}`, {
  apiVersion: "2023-10-16",
});

let stripePromise: sdk.Stripe | PromiseLike<sdk.Stripe | null> | null;
const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    stripePromise = sdk.loadStripe(publicKey);
  }
  return stripePromise;
};

export default getStripe;
