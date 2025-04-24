
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  return (
    <div className="relative w-full max-w-lg mx-auto mb-6">
      <div className="relative">
        <Input
          type="search"
          placeholder="ابحث عن منتجك المفضل..."
          className="w-full pl-10 pr-4"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      </div>
    </div>
  );
};

export default ProductSearch;
