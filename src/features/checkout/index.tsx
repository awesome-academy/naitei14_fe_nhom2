import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/apis/orders";
import { ShippingInfo } from "@/types/order";
import { RenderButton } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/hooks";
import { VAT_RATE } from "@/constants/common";

export const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    } else if (cart.length === 0) {
      navigate('/cart');
    }
  }, [isLoggedIn, cart.length, navigate]);

  if (!isLoggedIn || cart.length === 0) return null;

  const handleCheckout = async (shippingInfo: ShippingInfo) => {
    setIsSubmitting(true);
    try {
      if (!user) return;
      
      const orderData = {
        userId: user.id,
        items: cart.map(item => ({
          productId: item.id,
          productName: item.name,
          productImage: item.image || '',
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: Math.round(totalPrice * (1 + VAT_RATE)),
        shippingInfo,
        paymentMethod: 'cod' as const, 
        status: 'pending' as const
      };

      await createOrder(orderData);
      clearCart();
      alert(t("checkout.orderSuccess"));
      navigate("/");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(t("checkout.orderFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-10">
      <Container>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 uppercase">
          {t("checkout.checkoutTitle")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm 
              id="checkout-form"
              onSubmit={handleCheckout} 
              initialValues={user ? {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
              } : undefined}
            />
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
            <div className="mt-6">
              <RenderButton 
                className="w-full py-3 uppercase font-bold bg-green-primary hover:bg-green-dark text-white rounded transition-colors"
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("checkout.processing") : t("checkout.placeOrder")}
              </RenderButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
