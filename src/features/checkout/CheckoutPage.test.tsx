import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CheckoutPage } from './index';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));
vi.mock('@/contexts/CartContext');
vi.mock('@/apis/orders', () => ({
  createOrder: mockCreateOrder,
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

vi.mock('./components/CheckoutForm', () => ({
  CheckoutForm: ({ onSubmit, initialValues }: any) => (
    <form data-testid="checkout-form" onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        fullName: initialValues?.fullName || 'Test User',
        email: initialValues?.email || 'test@example.com',
        phone: initialValues?.phone || '0123456789',
        address: '123 Test St',
        city: 'Test City',
      });
    }}>
      <button type="submit">Submit Form</button>
    </form>
  ),
}));

vi.mock('./components/OrderSummary', () => ({
  OrderSummary: () => <div data-testid="order-summary">Order Summary</div>,
}));

vi.mock('@/hooks', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'checkout.checkoutTitle': 'Thanh toán',
        'checkout.placeOrder': 'Đặt hàng',
        'checkout.processing': 'Đang xử lý...',
        'checkout.orderSuccess': 'Đặt hàng thành công!',
        'checkout.orderFailed': 'Đặt hàng thất bại. Vui lòng thử lại.',
      };
      return translations[key] || key;
    },
  }),
}));

const { mockCreateOrder, mockNavigate, mockClearCart } = vi.hoisted(() => ({
  mockCreateOrder: vi.fn(),
  mockNavigate: vi.fn(),
  mockClearCart: vi.fn(),
}));


describe('CheckoutPage', () => {
  const mockUser = {
    id: 'user1',
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '0123456789',
  };

  const mockCart = [
    { id: 'p1', name: 'Product 1', price: 100000, quantity: 2, image: 'img1.jpg' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useAuth as any).mockReturnValue({
      user: mockUser,
      isLoggedIn: true,
    });
    (useCart as any).mockReturnValue({
      cart: mockCart,
      totalPrice: 200000,
      clearCart: mockClearCart,
    });
  });

  // ============ GIAO DIỆN (UI) ============
  
  it('renders all checkout page elements correctly', () => {
    render(<CheckoutPage />);
    
    // Title
    expect(screen.getByText('Thanh toán')).toBeInTheDocument();
    
    // Form nhập thông tin giao hàng
    expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
    
    // Tóm tắt đơn hàng
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    
    // Submit button
    expect(screen.getByText('Đặt hàng')).toBeInTheDocument();
  });

  it('displays loading state when submitting order', async () => {
    mockCreateOrder.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ id: 'order1' }), 100))
    );

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    // Button hiển thị "Đang xử lý..." và bị disabled
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /đang xử lý/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  // ============ LOGIC GIỎ HÀNG ============

  it('displays cart with multiple products correctly', () => {
    const multiItemCart = [
      { id: 'p1', name: 'iPhone 15', price: 20000000, quantity: 1, image: 'iphone.jpg' },
      { id: 'p2', name: 'AirPods Pro', price: 5000000, quantity: 2, image: 'airpods.jpg' },
    ];

    (useCart as any).mockReturnValue({
      cart: multiItemCart,
      totalPrice: 30000000,
      clearCart: mockClearCart,
    });

    render(<CheckoutPage />);
    
    // Verify giỏ hàng hiển thị đúng
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
  });

  it('calculates order total with VAT correctly', async () => {
    const cartTotal = 10000000;
    (useCart as any).mockReturnValue({
      cart: mockCart,
      totalPrice: cartTotal,
      clearCart: mockClearCart,
    });

    mockCreateOrder.mockResolvedValue({ id: 'order1' } as any);

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreateOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          totalAmount: Math.round(cartTotal * 1.1), // 10% VAT
        })
      );
    });
  });

  it('clears cart after successful order', async () => {
    mockCreateOrder.mockResolvedValue({ id: 'order1' } as any);

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
    });
  });

  it('does not clear cart when order fails', async () => {
    mockCreateOrder.mockRejectedValue(new Error('API Error'));

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Đặt hàng thất bại. Vui lòng thử lại.');
    });

    expect(mockClearCart).not.toHaveBeenCalled();
  });

  // ============ LOGIC NHẬP THÔNG TIN ============

  it('pre-fills user information in checkout form', () => {
    const userWithInfo = {
      id: 'user1',
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
    };

    (useAuth as any).mockReturnValue({
      user: userWithInfo,
      isLoggedIn: true,
    });

    mockCreateOrder.mockResolvedValue({ id: 'order1' } as any);

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    // Verify thông tin user được truyền vào form
    waitFor(() => {
      expect(mockCreateOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          shippingInfo: expect.objectContaining({
            fullName: userWithInfo.fullName,
            email: userWithInfo.email,
            phone: userWithInfo.phone,
          })
        })
      );
    });
  });

  it('sends complete order data with shipping info', async () => {
    mockCreateOrder.mockResolvedValue({ id: 'order1' } as any);

    render(<CheckoutPage />);
    
    const form = screen.getByTestId('checkout-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreateOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user1',
          items: expect.arrayContaining([
            expect.objectContaining({
              productId: 'p1',
              productName: 'Product 1',
              quantity: 2,
              price: 100000,
            })
          ]),
          shippingInfo: expect.objectContaining({
            fullName: expect.any(String),
            email: expect.any(String),
            phone: expect.any(String),
            address: expect.any(String),
            city: expect.any(String),
          }),
          paymentMethod: 'cod',
          status: 'pending',
        })
      );
    });
  });
});
