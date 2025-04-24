
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="section-title mb-8">الأسئلة الشائعة</h2>
      <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
        <AccordionItem value="payment">
          <AccordionTrigger>ما هي طرق الدفع المتاحة؟</AccordionTrigger>
          <AccordionContent>
            نقبل الدفع نقداً عند الاستلام، وكذلك التحويل البنكي المسبق.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="delivery">
          <AccordionTrigger>ما هي أوقات التوصيل؟</AccordionTrigger>
          <AccordionContent>
            نوفر خدمة التوصيل من الساعة 10 صباحاً حتى 10 مساءً، والتوصيل خلال ساعتين من تأكيد الطلب.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="discount">
          <AccordionTrigger>هل هناك خصومات على الكميات؟</AccordionTrigger>
          <AccordionContent>
            نعم، نقدم خصومات خاصة على الطلبات بكميات كبيرة. يرجى التواصل معنا عبر واتساب لمعرفة التفاصيل.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
