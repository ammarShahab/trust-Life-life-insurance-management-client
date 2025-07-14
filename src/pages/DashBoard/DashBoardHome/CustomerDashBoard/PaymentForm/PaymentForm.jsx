import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useLocation } from "react-router";

const PaymentForm = () => {
  const { state } = useLocation();
  console.log("state from payment form", state);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  };

  return (
    <div className="max-w-4xl lg:w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Complete Your Payment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Policy Title
            </label>
            <input
              type="text"
              value={state?.policyTitle || "Unknown"}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Premium Amount
            </label>
            <input
              type="text"
              value={`${state?.premium}`}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3 border rounded">
            <CardElement className="p-2 border space-x-4 rounded-2xl w-full" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1f2937] hover:bg-gray-800 text-white font-semibold py-2 rounded transition"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
