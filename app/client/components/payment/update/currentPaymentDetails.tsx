import React from "react";
import { Subscription } from "../../user";
import { CardDisplay } from "../cardDisplay";
import { PayPalDisplay } from "../paypalDisplay";

export const CurrentPaymentDetails = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  } else if (subscription.payPalEmail) {
    return <PayPalDisplay payPalEmail={subscription.payPalEmail} />;
  }
  return <span>Other Payment Method</span>; // Direct Debit ???
};