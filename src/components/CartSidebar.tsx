
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from '@/pages/CategoryPage';

interface CartSidebarProps {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

const CartSidebar = ({ 
  cart, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  onCheckout 
}: CartSidebarProps) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="md:sticky top-24 transition-all duration-300 ease-in-out">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold font-tajawal">سلة الطلبات</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-primary/50" 
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
        
        <motion.div 
          animate={{ 
            height: isCartOpen ? 'auto' : 0,
            opacity: isCartOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {cart.length > 0 ? (
            <div className="max-h-[40vh] overflow-y-auto divide-y">
              {cart.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-md object-cover ml-3"
                    />
                    <div>
                      <h3 className="font-medium font-tajawal">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.price} ج.م</p>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => addToCart(item)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              السلة فارغة. قم بإضافة منتجات من القائمة.
            </div>
          )}
        </motion.div>
        
        <motion.div 
          animate={{ 
            height: isCartOpen ? 'auto' : 0,
            opacity: isCartOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="border-t overflow-hidden"
        >
          <div className="p-4 bg-secondary/50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>الإجمالي:</span>
              <span>{calculateTotal().toFixed(2)} ج.م</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={onCheckout} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
                disabled={cart.length === 0}
              >
                تأكيد الطلب
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                إفراغ السلة
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default CartSidebar;
