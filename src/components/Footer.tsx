import { Phone, MapPin, Clock, Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      d="M17.6 6.32C16.4 5.12 14.8 4.4 13.2 4.4C9.8 4.4 7.1 7.1 7.1 10.5C7.1 11.8 7.5 13.1 8.2 14.1L7 17.9L10.9 16.7C11.9 17.3 12.9 17.6 14 17.6C17.4 17.6 20.1 14.9 20.1 11.5C20 9.8 19.2 7.8 17.6 6.32ZM13.2 16.4C12.1 16.4 11.1 16.1 10.2 15.6L9.9 15.4L7.7 16.1L8.4 14L8.2 13.7C7.6 12.8 7.3 11.7 7.3 10.6C7.3 7.9 9.5 5.7 13.3 5.7C14.6 5.7 15.8 6.2 16.8 7.2C17.8 8.2 18.3 9.5 18.3 10.8C18.2 13.5 16 16.4 13.2 16.4ZM16 12.2C15.8 12.1 14.9 11.7 14.7 11.6C14.5 11.5 14.4 11.5 14.3 11.7C14.2 11.9 13.9 12.3 13.8 12.4C13.7 12.5 13.6 12.5 13.4 12.4C12.5 12 11.9 11.6 11.2 10.8C11 10.6 11.3 10.6 11.6 10C11.7 9.9 11.6 9.8 11.6 9.7C11.6 9.6 11.3 8.7 11.2 8.3C11.1 7.9 10.9 8 10.8 8C10.7 8 10.6 8 10.5 8C10.4 8 10.2 8 10 8.2C9.8 8.4 9.4 8.8 9.4 9.7C9.4 10.6 10 11.5 10.1 11.6C10.2 11.7 11.2 13.2 12.7 13.9C13.9 14.5 14.3 14.5 14.8 14.4C15.1 14.4 15.8 14 16 13.6C16.2 13.2 16.2 12.8 16.1 12.7C16.1 12.5 16.1 12.3 16 12.2Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="relative bg-gradient-to-b from-meat-dark/80 via-primary/70 to-spice-dark/80 text-white overflow-hidden"
      style={{
        clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>

      <div 
        className="absolute top-0 left-0 right-0 h-12 bg-background" 
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
          zIndex: 0
        }}
      ></div>

      <div className="container mx-auto px-4 relative">
        <button 
          onClick={scrollToTop}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/90 transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 font-cairo">
              <span className="text-spice-light">صحتين</span>
              <span className="block text-lg mt-1 font-normal text-white/80 font-tajawal">
                Fast Food
              </span>
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              نقدم أفضل اللحوم والبهارات بجودة عالية وأسعار مناسبة. جميع منتجاتنا طازجة ومختارة بعناية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://wa.me/201017812946" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:w-3 transition-all duration-300"></span>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/#products" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:w-3 transition-all duration-300"></span>
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/#whatsapp-order" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:w-3 transition-all duration-300"></span>
                  اطلب عبر واتساب
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:w-3 transition-all duration-300"></span>
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-accent" />
<div>
  <div className="text-white/80">الفرع الاول - الشرقية</div>
  <div className="text-white/80">الفرع الثاني - 6 أكتوبر</div>
</div>

              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-accent" />
                <div>
                  <a 
                    href="tel:01030557250" 
                    className="text-white/80 hover:text-white transition-colors inline-block"
                  >
                    01030557250
                  </a>
                  <p className="text-white/60 text-sm">متاح على مدار اليوم</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <WhatsappIcon size={18} className="mt-1 shrink-0 text-accent" />
                <div>
                  <a 
                    href="https://wa.me/201030557250" 
                    className="text-white/80 hover:text-white transition-colors inline-block"
                  >
                    01030557250
                  </a>
                  <p className="text-white/60 text-sm">واتساب للطلبات والاستفسارات</p>
                </div>
              </li>
              <li className="flex items-start gap-3 mt-6">
                <span className="text-white/80">
                  صاحبة المتجر : علياء شوقي
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-accent after:right-0 after:bottom-0 pb-2">ساعات العمل</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/80">السبت - الأربعاء</span>
                <span className="text-white">9:00 ص - 10:00 م</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/80">الخميس</span>
                <span className="text-white">9:00 ص - 11:00 م</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/80">الجمعة</span>
                <span className="text-white">2:00 م - 10:00 م</span>
              </li>
              <li className="mt-4">
                <div className="py-2 px-4 bg-accent/20 rounded-lg text-center">
                  <span className="text-white font-bold">مفتوح الآن</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">
            © {currentYear} صحتين. جميع الحقوق محفوظة لـ علياء شوقي
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
