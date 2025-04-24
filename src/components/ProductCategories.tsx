import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { productCategories } from '@/data/productData';

const ProductCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };
  
  const hoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.3, type: "tween" } }
  };
  
  const buttonVariants = {
    rest: { scale: 1, backgroundColor: "var(--primary)" },
    hover: { scale: 1.05, backgroundColor: "var(--primary)", transition: { duration: 0.2 } }
  };
  
  return (
    <section id="categories" className="py-24 relative overflow-hidden bg-gradient-to-b from-secondary/30 to-secondary/60">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')",
             backgroundRepeat: "repeat"
           }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-4xl font-bold mb-4 relative inline-block">
            فئات المنتجات
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            اكتشف مجموعتنا المتنوعة من المنتجات الطازجة عالية الجودة. من اللحوم الطازجة إلى الوجبات السريعة الشهية.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          id="products"
        >
          {productCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <motion.div 
                variants={hoverVariants}
                initial="rest"
                whileHover="hover"
                className="h-full"
              >
                <Card className="category-card h-full overflow-hidden border-transparent shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  <motion.div 
                    className="h-56 overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${category.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute bottom-0 right-0 p-4 text-white"
                    >
                      <div className="font-bold text-3xl mb-1">{category.icon}</div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </motion.div>
                  </motion.div>
                  <CardContent className="p-6">
                    <p className="text-foreground/80 mb-6 line-clamp-2">{category.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm bg-secondary/50 px-3 py-1 rounded-full">{category.products.length} منتج</span>
                      <Link to={`/category/${category.id}`} aria-label={`عرض منتجات ${category.name}`}>
                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                        >
                          <Button className="bg-primary hover:bg-primary/90 text-white font-medium group">
                            عرض المنتجات
                            <ArrowLeft size={16} className="mr-2 group-hover:translate-x-[-3px] transition-transform" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
