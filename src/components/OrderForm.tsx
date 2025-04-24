
import OrderFormModal from './OrderFormModal';
import { CartItem } from '@/pages/CategoryPage';

/**
 * Props for OrderForm component
 * @interface OrderFormProps
 * @property {CartItem[]} cart - Array of items in the cart
 * @property {number} total - Total amount of the order
 * @property {() => void} onCancel - Callback function when order is canceled
 * @property {() => void} onComplete - Callback function when order is completed
 */
interface OrderFormProps {
  cart: CartItem[];
  total: number;
  onCancel: () => void;
  onComplete: () => void;
}

/**
 * OrderForm component (wrapper for OrderFormModal)
 * 
 * This component serves as a backward-compatible wrapper for OrderFormModal.
 * It passes all props directly to OrderFormModal component.
 * 
 * @component
 * @param {OrderFormProps} props - Component props
 * @returns {JSX.Element} Rendered OrderFormModal component
 */
const OrderForm = (props: OrderFormProps): JSX.Element => {
  return <OrderFormModal {...props} />;
};

export default OrderForm;
