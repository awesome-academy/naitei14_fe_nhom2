import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Container } from "@/components/ui/Container";
import { CartItemRow } from "./components/CartItemRow";
import { CartSummary } from "./components/CartSummary";
import { Link, useNavigate } from "react-router-dom";
import { RenderButton } from "@/components/ui/Button";

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  if (cart.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <img src="/images/empty_cart.jpg" alt="Empty Cart" className="mb-6" />
          <Link to="/products">
            <RenderButton 
              variant="outline"
              className="px-6 py-2 rounded transition uppercase text-green-primary border-green-primary hover:bg-green-primary hover:text-white"
            >Tiếp tục mua sắm
            </RenderButton>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-10 bg-white">
      <Container>
        <div className="mb-8">
          <h1 className="text-xl font-medium text-green-primary uppercase">GIỎ HÀNG</h1>
        </div>
        
        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-primary text-white text-sm uppercase">
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">HÌNH ẢNH</th>
                <th className="py-3 px-4 font-medium w-[30%] border-r border-white text-center">TÊN SẢN PHẨM</th>
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">ĐƠN GIÁ</th>
                <th className="py-3 px-4 font-medium w-[20%] border-r border-white text-center">SỐ LƯỢNG</th>
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">THÀNH TIỀN</th>
                <th className="py-3 px-4 font-medium w-[5%] text-center">XÓA</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItemRow 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity} 
                  onRemove={removeFromCart} 
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-4 mt-6">
          <RenderButton 
            variant="outline" 
            className="uppercase text-green-primary border-green-primary rounded-full px-6"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?")) {
                clearCart();
              }
            }}
          >HỦY ĐƠN HÀNG
          </RenderButton>
          <Link to="/products">
            <RenderButton className="uppercase bg-green-primary hover:bg-green-dark text-white rounded-full px-6">
              TIẾP TỤC MUA
            </RenderButton>
          </Link>
        </div>

        {/* Tổng tiền */}
        <CartSummary totalPrice={totalPrice} />
      </Container>
    </section>
  );
};
