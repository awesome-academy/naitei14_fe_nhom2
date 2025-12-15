import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/services/orderAPI';
import { ShippingInfo } from '@/types/order';
import { RenderButton } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { VAT_RATE } from '@/constants/common';

export const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      alert('Đặt hàng thành công!'); 
      navigate('/'); 
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-10">
      <Container>
        <h1 className="text-2xl font-bold text-gray-800 mb-8 uppercase">Thanh toán</h1>
        
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
                {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
              </RenderButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
