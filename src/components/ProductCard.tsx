
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from '@/pages/CategoryPage';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    isNew?: boolean;
  };
  categoryId: string;
  onAddToCart: (product: any) => void;
}

const ProductCard = ({ product, categoryId, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-none group h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 space-x-2">
            {product.isNew && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
                جديد
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              onClick={() => onAddToCart(product)} 
              variant="default"
              size="lg"
              className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Plus size={18} className="ml-1" />
              إضافة للسلة
            </Button>
          </div>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg font-tajawal">{product.name}</h3>
            <div className="font-bold text-primary text-lg">{product.price} ج.م</div>
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
          <Button 
            onClick={() => onAddToCart(product)} 
            variant="secondary"
            className="w-full mt-auto hover:bg-primary hover:text-white transition-colors"
          >
            <Plus size={18} className="ml-1" />
            إضافة للسلة
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
