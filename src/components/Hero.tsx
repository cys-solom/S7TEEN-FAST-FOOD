
import { useEffect, useState } from 'react';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhatsApp = () => {
    const whatsappSection = document.getElementById('whatsapp-order');
    if (whatsappSection) {
      whatsappSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium gradient overlay with pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-meat-dark/80 via-primary/70 to-spice-dark/80 -z-10"></div>
      
      {/* High-quality background image with slight blur for modern effect */}
      <div className="absolute inset-0 -z-20" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.7) blur(1px)"
      }}></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 -z-10" style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundRepeat: "repeat"
      }}></div>
      
      <div className="container mx-auto px-4">
        <motion.div className="max-w-3xl" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              <span className="text-spice-light font-cairo">منتجات لحوم ومأكولات</span> جاهزة بمذاق لا يُقاوم
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="md:text-xl text-white/90 mb-8 drop-shadow-md backdrop-blur-sm bg-black/10 p-4 rounded-lg text-lg font-normal text-right">نوفر لك أفضل أنواع اللحوم الطازجة والمأكولات الجاهزة المختارة بعناية وبأسعار مناسبة. جرب الفرق مع مطبخ صحتين !</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToProducts} 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg transform transition-transform hover:scale-105"
              aria-label="تصفح المنتجات"
            >
              تصفح المنتجات
            </Button>
            <Button 
              onClick={scrollToWhatsApp} 
              className="whatsapp-btn px-8 py-6 text-lg flex items-center gap-2"
              aria-label="اطلب الآن"
            >
              <ShoppingCart size={20} />
              اطلب الآن
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2" 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button 
          className="animate-bounce p-2 bg-white/20 backdrop-blur-md rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => document.getElementById('address')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="التمرير لأسفل"
        >
          <ArrowDown className="text-white" size={32} />
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
