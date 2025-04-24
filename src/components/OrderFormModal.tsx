
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CartItem } from "@/pages/CategoryPage";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderFormModalProps {
  cart: CartItem[];
  total: number;
  onCancel: () => void;
  onComplete: () => void;
}

interface FormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
  notes: string;
}

const validateEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(01)[0-9]{9}$/;
  return egyptianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

const OrderFormModal = ({ cart, total, onCancel, onComplete }: OrderFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      notes: ''
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      if (!validateEgyptianPhoneNumber(data.phone)) {
        toast({
          title: "خطأ في رقم الهاتف",
          description: "يرجى إدخال رقم هاتف مصري صحيح (يبدأ بـ 01 ويتكون من 11 رقمًا)",
          variant: "destructive"
        });
        return;
      }
      
      // تنسيق محسّن لعناصر السلة
      const formattedCartItems = cart.map(item => 
        `▸ ${item.name}%0A   الكمية: ${item.quantity} | السعر: ${item.price.toFixed(2)} ج.م | الإجمالي: ${(item.quantity * item.price).toFixed(2)} ج.م`
      ).join("%0A%0A");
      
      // بناء رسالة واتساب بتنسيق منظم
      const message = [
        "✨ *طلب جديد* ✨",
        "",
        "👤 *معلومات العميل:*",
        `▸ الاسم: ${data.name}`,
        `▸ الهاتف: ${data.phone}`,
        `▸ العنوان: ${data.address}`,
        data.email && `▸ البريد: ${data.email}`,
        "",
        "🛍️ *طلباتك:*",
        formattedCartItems,
        "",
        `💰 *المجموع النهائي: ${total.toFixed(2)} ج.م*`,
        "",
        data.notes && `📝 *ملاحظاتك:*%0A${data.notes}`,
        "",
        "شكراً لثقتك بنا! ❤️",
        "سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب."
      ].filter(Boolean).join("%0A");
      
      const whatsappNumber = '201030557250'; // استبدل برقم واتسابك
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      toast({
        title: "تم تجهيز طلبك بنجاح!",
        description: "جارٍ تحويلك إلى واتساب لإرسال الطلب...",
      });
      
      setTimeout(() => {
        window.location.href = whatsappUrl;
        onComplete();
      }, 1500);
      
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "تعذر إرسال الطلب، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center overflow-hidden">
      <div className="relative w-full max-w-md h-screen overflow-y-auto py-6 px-4 flex items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl shadow-2xl w-full relative mx-auto my-auto"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-2 text-muted-foreground hover:bg-secondary z-10"
            onClick={onCancel}
            aria-label="إغلاق النموذج"
          >
            <X size={18} />
          </Button>
          
          <div className="pt-6 px-6 pb-4 border-b sticky top-0 bg-card z-10 rounded-t-xl">
            <h2 className="text-2xl font-bold font-tajawal">إكمال الطلب</h2>
            <p className="text-muted-foreground font-cairo">أدخل بياناتك لإرسال الطلب عبر واتساب</p>
          </div>
          
          <ScrollArea className="max-h-[calc(100vh-200px)] overflow-y-auto px-0.5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ 
                    required: "حقل الاسم مطلوب",
                    minLength: {
                      value: 3,
                      message: "الاسم يجب أن يحتوي على 3 أحرف على الأقل"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-cairo">الاسم الكامل *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="الاسم كما سيظهر على الفاتورة" 
                          {...field}
                          className="border-2 focus:border-primary transition-colors"
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  rules={{ 
                    required: "حقل العنوان مطلوب",
                    minLength: {
                      value: 10,
                      message: "العنوان يجب أن يحتوي على 10 أحرف على الأقل"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-cairo">العنوان التفصيلي *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="الحي، الشارع، رقم العمارة، الشقة" 
                          {...field}
                          className="border-2 focus:border-primary transition-colors"
                          autoComplete="address-line1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ 
                    required: "حقل الهاتف مطلوب",
                    pattern: {
                      value: /^(01)[0-9]{9}$/,
                      message: "رقم هاتف غير صحيح (يجب أن يبدأ بـ 01 ويتكون من 11 رقمًا)"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-cairo">رقم الهاتف *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="مثال: 01234567890" 
                          dir="ltr"
                          type="tel"
                          {...field}
                          className="border-2 focus:border-primary transition-colors"
                          autoComplete="tel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "بريد إلكتروني غير صالح"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-cairo">البريد الإلكتروني (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@domain.com" 
                          dir="ltr"
                          type="email"
                          {...field}
                          className="border-2 focus:border-primary transition-colors"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-cairo">ملاحظات إضافية</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أي متطلبات خاصة، تعليمات توصيل، إلخ..." 
                          {...field}
                          className="resize-none min-h-[80px] border-2 focus:border-primary transition-colors"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3 font-cairo">ملخص طلبك</h3>
                  <div className="bg-secondary/50 rounded-md p-3 mb-4 max-h-40 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between py-1 text-sm">
                        <span className="font-tajawal">{item.name} × {item.quantity}</span>
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                      <span>المجموع:</span>
                      <span className="text-primary">{total.toFixed(2)} ج.م</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]" 
                    disabled={isSubmitting}
                    aria-label="إرسال الطلب عبر واتساب"
                  >
                    <Send className="ml-2" size={18} />
                    {isSubmitting ? 'جارِ إرسال طلبك...' : 'إرسال الطلب عبر واتساب'}
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderFormModal;
