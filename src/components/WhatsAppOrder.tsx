import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Send, Phone } from 'lucide-react';

const WhatsappIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.6 6.32C16.4 5.12 14.8 4.4 13.2 4.4C9.8 4.4 7.1 7.1 7.1 10.5C7.1 11.8 7.5 13.1 8.2 14.1L7 17.9L10.9 16.7C11.9 17.3 12.9 17.6 14 17.6C17.4 17.6 20.1 14.9 20.1 11.5C20 9.8 19.2 7.8 17.6 6.32ZM13.2 16.4C12.1 16.4 11.1 16.1 10.2 15.6L9.9 15.4L7.7 16.1L8.4 14L8.2 13.7C7.6 12.8 7.3 11.7 7.3 10.6C7.3 7.9 9.5 5.7 13.3 5.7C14.6 5.7 15.8 6.2 16.8 7.2C17.8 8.2 18.3 9.5 18.3 10.8C18.2 13.5 16 16.4 13.2 16.4ZM16 12.2C15.8 12.1 14.9 11.7 14.7 11.6C14.5 11.5 14.4 11.5 14.3 11.7C14.2 11.9 13.9 12.3 13.8 12.4C13.7 12.5 13.6 12.5 13.4 12.4C12.5 12 11.9 11.6 11.2 10.8C11 10.6 11.3 10.6 11.6 10C11.7 9.9 11.6 9.8 11.6 9.7C11.6 9.6 11.3 8.7 11.2 8.3C11.1 7.9 10.9 8 10.8 8C10.7 8 10.6 8 10.5 8.2C10.3 8.4 10 8.8 10 9.7C10 10.6 10.6 11.5 10.7 11.6C10.8 11.7 11.8 13.2 13.3 13.9C14.5 14.5 14.9 14.5 15.4 14.4C15.7 14.4 16.4 14 16.6 13.6C16.8 13.2 16.8 12.8 16.7 12.7C16.6 12.5 16.4 12.3 16 12.2Z"
      fill="currentColor"
    />
  </svg>
);

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  orderDetails: string;
}

const validateEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(01)[0-9]{9}$/;
  return egyptianPhoneRegex.test(phone.replace(/\s+/g, ''));
};

const WhatsAppOrder = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    orderDetails: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'phone'>('whatsapp');
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById('whatsapp-order-section');
    
    if (section) {
      observer.observe(section);
    } else {
      setIsSectionVisible(true);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') setPhoneError(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.fullName || !formData.phoneNumber || !formData.orderDetails) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!validateEgyptianPhoneNumber(formData.phoneNumber)) {
      setPhoneError("يرجى إدخال رقم هاتف صحيح (يبدأ بـ 01 ويتكون من 11 رقمًا)");
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف صحيح (يبدأ بـ 01 ويتكون من 11 رقمًا)",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (activeTab === 'whatsapp') {
      // بناء رسالة الواتساب مع تنسيق محسن
      const message = `طلب جديد%0A%0A👤 الاسم: ${formData.fullName}%0A📞 رقم الهاتف: ${formData.phoneNumber}%0A${formData.email ? `📧 البريد الإلكتروني: ${formData.email}%0A` : ''}%0A📦 تفاصيل الطلب:%0A${formData.orderDetails.replace(/\n/g, '%0A')}%0A%0Aشكرًا لاختياركم!`;
      
      // إنشاء رابط واتساب مع تضمين الرسالة
      const whatsappUrl = `https://wa.me/201030557250?text=${message}`;
      
      // فتح الرابط في نافذة جديدة بعد تأخير بسيط
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsLoading(false);
        setFormData({ fullName: '', phoneNumber: '', email: '', orderDetails: '' });
        toast({
          title: "تم فتح واتساب بنجاح!",
          description: "الرجاء إرسال الرسالة لتأكيد طلبك.",
        });
      }, 500);
    } else {
      // معالجة حالة الاتصال المباشر
      window.location.href = `tel:01030557250`;
      setIsLoading(false);
      toast({
        title: "جار الاتصال...",
        description: "يتم توجيهك للاتصال بنا مباشرة.",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section 
      id="whatsapp-order" 
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8f8f8 0%, #e8f4ea 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundRepeat: "repeat" }}></div>

      <div id="whatsapp-order-section" className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">اطلب الآن</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            يمكنك طلب منتجاتنا بسهولة عبر واتساب أو الاتصال المباشر.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isSectionVisible ? "visible" : "hidden"} className="flex justify-center">
          <Card className="max-w-xl w-full shadow-2xl overflow-hidden border-none">
            <div className="bg-gradient-to-r from-primary to-accent h-2"></div>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 flex flex-row gap-2 pb-6">
              <div className="flex w-full rounded-lg overflow-hidden">
                <button 
                  className={`w-1/2 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 ${activeTab === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-white/50 text-foreground hover:bg-white/80'}`}
                  onClick={() => setActiveTab('whatsapp')}
                >
                  <WhatsappIcon className={activeTab === 'whatsapp' ? 'text-white' : 'text-green-600'} />
                  طلب عبر واتساب
                </button>
                <button 
                  className={`w-1/2 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 ${activeTab === 'phone' ? 'bg-primary text-white' : 'bg-white/50 text-foreground hover:bg-white/80'}`}
                  onClick={() => setActiveTab('phone')}
                >
                  <Phone className={activeTab === 'phone' ? 'text-white' : 'text-primary'} size={20} />
                  اتصل بنا
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-1">
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    className="w-full border-2 focus:border-primary p-3 rounded-md" 
                    required 
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <Label htmlFor="phoneNumber">رقم الجوال *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full border-2 focus:border-primary p-3 rounded-md ${phoneError ? 'border-red-400' : ''}`}
                    placeholder="01xxxxxxxxx"
                    required
                    dir="ltr"
                  />
                  {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full border-2 focus:border-primary p-3 rounded-md" 
                    dir="ltr" 
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <Label htmlFor="orderDetails">تفاصيل الطلب *</Label>
                  <Textarea 
                    id="orderDetails" 
                    name="orderDetails" 
                    value={formData.orderDetails} 
                    onChange={handleChange} 
                    className="w-full min-h-[120px] border-2 focus:border-primary p-3 rounded-md" 
                    placeholder="اكتب تفاصيل طلبك هنا..."
                    required 
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className={`w-full py-6 text-white font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      activeTab === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'
                    }`} 
                    disabled={isLoading}
                  >
                    {activeTab === 'whatsapp' ? (
                      <>
                        <WhatsappIcon className="ml-2" />
                        {isLoading ? 'جارِ التحضير...' : 'إرسال الطلب عبر واتساب'}
                      </>
                    ) : (
                      <>
                        <Phone size={20} className="ml-2" />
                        {isLoading ? 'جارِ التحضير...' : 'اتصل بنا مباشرة'}
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground pt-2">
                  {activeTab === 'whatsapp'
                    ? 'سيتم فتح محادثة واتساب مع نص الطلب جاهزًا للإرسال'
                    : 'سيتم الاتصال بالرقم: 01030557250'
                  }
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 md:hidden animate-float">
        <Button 
          onClick={() => document.getElementById('whatsapp-order')?.scrollIntoView({ behavior: 'smooth' })} 
          className="whatsapp-btn rounded-full px-6 py-3 shadow-lg bg-green-600 hover:bg-green-700"
        >
          <WhatsappIcon className="ml-2" />
          اطلب الآن
        </Button>
      </div>
    </section>
  );
};

export default WhatsAppOrder;
