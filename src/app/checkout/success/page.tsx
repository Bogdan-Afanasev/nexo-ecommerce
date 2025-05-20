import { redirect } from "next/navigation";
import Stripe from "stripe";

const getCheckoutSession = async (sessionId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
  });

  return stripe.checkout.sessions.retrieve(sessionId);
};

const CheckoutSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const session = await getCheckoutSession(session_id);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Спасибо за ваш заказ!
          </h1>
          <p className="text-gray-600 mb-6">
            Мы получили ваш заказ и вскоре отправим вам электронное письмо с
            подтверждением!
          </p>
          <div className="text-sm text-gray-500">
            Общая сумма заказа:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: session.currency || "RUB",
            }).format((session.amount_total || 0) / 100)}
          </div>
          <div className="text-sm text-gray-500">
            Электронная почта для заказа: {session.customer_details?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
