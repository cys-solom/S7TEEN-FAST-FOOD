import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { productCategories } from '@/data/productData';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import OrderFormModal from '@/components/OrderFormModal';
import ProductSearch from '@/components/ProductSearch';
import FAQ from '@/components/FAQ';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categoryId: string;
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const category = productCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">فئة غير موجودة</h1>
        <Link to="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</Link>
      </div>
    );
  }
  
  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast({
          title: "تمت الإضافة للسلة",
          description: `تمت إضافة ${product.name} إلى سلة المشتريات`,
        });
        return [...prevCart, { ...product, quantity: 1, categoryId }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const clearCart = () => {
    setCart([]);
    setShowOrderForm(false);
  };
  
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    return category.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [category, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      {/* Hero Section */}
      <section 
        className="relative py-20 mb-12 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${category.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link to="/" className="inline-flex items-center text-white mb-6 hover:text-primary transition-colors">
              <ChevronLeft size={20} className="ml-1" />
              <span>العودة للصفحة الرئيسية</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-tajawal">{category.name}</h1>
            <p className="text-lg text-white/90 mb-8 font-cairo">{category.description}</p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <ProductSearch onSearch={setSearchQuery} />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  categoryId={categoryId || ''}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Cart Sidebar */}
          <div className="md:w-96 md:order-last order-first">
            <CartSidebar 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              onCheckout={() => setShowOrderForm(true)}
            />
          </div>
        </div>
      </div>
      
      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderFormModal 
          cart={cart} 
          total={calculateTotal()} 
          onCancel={() => setShowOrderForm(false)} 
          onComplete={clearCart}
        />
      )}
      
      <FAQ />
    </div>
  );
};

export default CategoryPage;
