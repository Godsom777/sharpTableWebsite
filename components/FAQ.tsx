import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faQuestionCircle,
  faGlobe,
  faCreditCard,
  faShieldHalved,
  faClock,
  faWifi,
  faUtensils
} from '@fortawesome/free-solid-svg-icons';

interface FAQItem {
  question: string;
  answer: string;
  icon: typeof faGlobe;
  category: 'general' | 'pricing' | 'technical' | 'operations';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    icon: faGlobe,
    question: "Where does SharpTable work? Is it only for Nigeria?",
    answer: "SharpTable works globally — anywhere you have internet access. We built it for restaurants worldwide. While we started in Nigeria and have strong African roots, we're already serving restaurants in the UK, US, Australia, and across Europe. The QR codes work with any smartphone, the payment gate integrates with Paystack (which supports international cards), and the dashboard is accessible from any browser. Your customers can order from anywhere, and you can manage your restaurant from anywhere."
  },
  {
    category: 'general',
    icon: faQuestionCircle,
    question: "How is this different from a POS system like SambaPOS or Square?",
    answer: "SharpTable isn't trying to be a full POS system. We do one thing obsessively well: make sure you get paid before the kitchen starts. Traditional POS systems have inventory modules, employee timesheets, loyalty programs, table management, reservation systems — features most restaurants never use. SharpTable focuses on the payment gate, real-time order tracking, and the oversight tools you actually need. No training manuals. No certified installers. Just scan, pay, confirm, cook. If you need a bloated system with 100 features, we're not for you. If you want something that works in 30 seconds, you're in the right place."
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: "Do my customers need to download an app?",
    answer: "No. That's the point. Your customers scan a QR code at their table, the menu opens in their phone's browser, they order and pay — all without downloading anything. No 'Download our app' friction. No app store ratings to worry about. No updates to push. It just works. The only people who need accounts are you (the owner), your kitchen staff, and your Marshalls."
  },
  {
    category: 'operations',
    icon: faClock,
    question: "What happens if a customer orders but doesn't pay?",
    answer: "They can't. That's the whole system. The order doesn't reach your kitchen until payment is confirmed. Customers scan the QR code, browse the menu, add items to their cart, and when they hit 'Order' they're taken straight to Paystack to pay. Only after successful payment does the Marshall see the order. Only after the Marshall confirms it does the kitchen start cooking. No payment = no order. It's that simple. Walkouts become impossible."
  },
  {
    category: 'operations',
    icon: faShieldHalved,
    question: "Can I trust the Marshall role? What if they confirm fake orders?",
    answer: "Every action is logged in the audit trail — who confirmed what order, when, from which device. If a Marshall confirms an order, it's tied to their account permanently. You'll see it in the daily summary, in the Intelligence dashboard, in the order history. The system is designed for accountability. Your Marshall becomes your trust layer — they verify the order matches what the customer actually wants before it goes to the kitchen. If you have concerns about a specific Marshall, you can review their entire history and remove their access instantly."
  },
  {
    category: 'technical',
    icon: faWifi,
    question: "What if the internet goes down?",
    answer: "SharpTable needs internet to work — it's a cloud system. If your internet goes down, customers can't place new orders through the QR codes. However, your Marshall and kitchen dashboards will show all orders that were already confirmed before the outage, so your team can keep cooking. When internet returns, everything syncs automatically. This is the trade-off with cloud systems: you need connectivity, but you get real-time data, zero setup, automatic backups, and you can check your restaurant from anywhere in the world. Most modern restaurants already depend on internet for cards and mobile payments anyway."
  },
  {
    category: 'technical',
    icon: faCreditCard,
    question: "What payment methods do you support?",
    answer: "SharpTable uses Paystack as the payment processor. That means your customers can pay with Visa, Mastercard, Verve, American Express, bank transfers, and mobile money (where available). Paystack handles all the payment security, PCI compliance, and fraud detection. You get paid directly to your bank account on Paystack's settlement schedule (usually T+1 or T+2 business days, depending on your country). We don't touch your money — it goes straight from customer to Paystack to your bank."
  },
  {
    category: 'pricing',
    icon: faCreditCard,
    question: "How does the pricing work? I see USD but I'm not in the US.",
    answer: "Prices are displayed in USD for global clarity, but you're billed in your local currency (Nigerian Naira via Paystack). The USD amount converts to the equivalent in Naira at current exchange rates when you subscribe. For example, $65/month (Control plan) equals approximately ₦99,999/month. This ensures everyone globally sees a consistent price while you pay in your local currency. No surprise charges, no hidden fees — what you see on the pricing page is what you'll pay, converted to Naira at checkout."
  },
  {
    category: 'pricing',
    icon: faQuestionCircle,
    question: "Do you take a percentage of my sales?",
    answer: "No. Never. We charge a flat monthly or yearly subscription — that's it. Whether you make ₦1 million or ₦10 million a month, your SharpTable bill stays the same. We're not a payment processor (that's Paystack's job), we're a restaurant operations tool. You pay for the plan that fits your restaurant size, and that's your only cost. Paystack charges their standard payment processing fees (usually around 1.5% + ₦100 per transaction), but SharpTable doesn't take a cut of your revenue."
  },
  {
    category: 'pricing',
    icon: faGlobe,
    question: "What's the difference between Control and Command plans?",
    answer: "Control is for single-location restaurants. You get the payment gate, Marshall dashboard, kitchen display, staff management, audit trail, and daily summaries. Perfect for one restaurant that wants tight operations. Command is for multi-location owners. You get everything in Control, plus unlimited branches, unlimited tables, unlimited staff, unlimited order history, cross-branch inventory tracking, unified analytics, and the ability to see every location from one dashboard. If you have one restaurant, get Control. If you're expanding or already have multiple locations, get Command."
  },
  {
    category: 'technical',
    icon: faClock,
    question: "How long does setup take?",
    answer: "About 30 minutes. Seriously. Create your account, add your menu items (name, price, description, photo if you want), generate your QR codes, print them, and put them on tables. Your Marshall and kitchen staff can log in from any device — they don't need to install anything. You can be live the same day you sign up. No hardware to buy. No installers to schedule. No training sessions. We've had restaurants go from signup to first paid order in under an hour."
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: "Can customers split bills or pay separately?",
    answer: "Yes. The split billing feature is built in. If multiple people at a table want to pay separately, they each scan the QR code, select the items they're paying for, and complete their own payment. Each payment creates a separate order entry, all linked to the same table. Your Marshall sees all the orders from that table grouped together. This is especially useful for groups, corporate lunches, or any situation where people want individual receipts."
  },
  {
    category: 'operations',
    icon: faShieldHalved,
    question: "What if I need to refund a customer?",
    answer: "Refunds are handled through Paystack's dashboard. Since SharpTable doesn't process payments directly, you'll log into your Paystack account, find the transaction, and issue the refund from there. Paystack gives you full control over refunds, partial refunds, and disputes. SharpTable's audit trail will show you the original order details, customer info, and payment reference, so you can quickly find the transaction in Paystack and process the refund."
  },
  {
    category: 'technical',
    icon: faWifi,
    question: "Do I need special hardware or tablets?",
    answer: "No. Your Marshall can use any smartphone or tablet with a browser. Your kitchen can use any computer, tablet, or even a smartphone to view the Kitchen Display Screen (KDS). Your customers use their own phones. That's it. No expensive iPad POS terminals. No proprietary hardware. No vendor lock-in. If a device breaks, grab any other device, log in, and you're back in business. This is one reason SharpTable is so much cheaper than traditional POS systems — you're not buying hardware."
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: "Can I customize my menu items? Add photos? Mark items as sold out?",
    answer: "Yes. You have full control over your menu from the admin dashboard. Add items, set prices, upload photos (recommended but not required), write descriptions, categorize by food type (appetizers, mains, drinks, etc.). If something runs out, you can mark it as 'Sold Out' in real-time — customers won't see it on the menu until you turn it back on. For Command (multi-location) users, you can set different menus or prices per branch if needed."
  },
  {
    category: 'pricing',
    icon: faCreditCard,
    question: "Can I cancel anytime? Is there a contract?",
    answer: "You can cancel anytime, no questions asked, no penalties. Monthly plans are month-to-month. Yearly plans are paid upfront but give you significant savings (22-35% off). If you cancel a yearly plan mid-year, you won't get a refund for unused months — but there's no auto-renewal trap, no cancellation fees, no 'call us to cancel' runaround. Just cancel from your account settings and you're done. Your subscription runs until the end of your paid period, then stops."
  },
  {
    category: 'technical',
    icon: faGlobe,
    question: "Is my data safe? What about customer payment info?",
    answer: "Your data is stored securely on Supabase (a modern cloud database with enterprise-grade security). All connections are encrypted with HTTPS. Customer payment information never touches our servers — it goes directly to Paystack, which is PCI-DSS Level 1 certified (the highest security standard for payment processors). We see order details, not card numbers. Your restaurant data is backed up continuously. You can export your data anytime. We'll never sell your data or customer information to third parties."
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: "What if customers have questions or need help while ordering?",
    answer: "Your menu can include a 'Message to Kitchen' feature where customers can add special requests or notes ('no onions,' 'extra spicy,' etc.). For general questions, we recommend adding a support contact number or WhatsApp link to your QR code setup. The beauty of SharpTable is it reduces order-taking work for your staff — but they're still there to help customers who need assistance. Older customers or anyone uncomfortable with tech can still order through your waitstaff the traditional way; SharpTable is an option, not a replacement."
  },
  {
    category: 'general',
    icon: faQuestionCircle,
    question: "I'm skeptical. Why should I change what already works?",
    answer: "Fair question. If your current system genuinely has zero revenue leakage, perfect staff accountability, complete order history, real-time inventory visibility, and you never wonder where money went — then you probably don't need SharpTable. But most owners think things are fine until they see the first audit report. The average restaurant loses 5-12% of revenue to walkouts, untracked orders, cash discrepancies, and theft. That's $2,000-$6,000 per month on a $50,000 revenue restaurant. SharpTable recovers most of that. Try the ROI calculator on the pricing page — plug in your real numbers. If the math doesn't make sense, don't buy it. If it does, you'll wish you'd started sooner."
  }
];

const FAQAccordionItem: React.FC<{ faq: FAQItem; index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 hover:border-amber-500/30 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
          <FontAwesomeIcon icon={faq.icon} className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base md:text-lg pr-8">{faq.question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-20">
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'pricing' | 'technical' | 'operations'>('all');

  const categories = [
    { id: 'all' as const, label: 'All Questions' },
    { id: 'general' as const, label: 'General' },
    { id: 'pricing' as const, label: 'Pricing & Plans' },
    { id: 'technical' as const, label: 'Technical' },
    { id: 'operations' as const, label: 'Operations' },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.03)_0%,transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
            <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Questions? We've got answers.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about SharpTable — from setup to daily operations. Still have questions? Email us at{' '}
            <a href="mailto:info@sharptable.com.ng" className="text-amber-400 hover:text-amber-300 transition-colors">
              info@sharptable.com.ng
            </a>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <FAQAccordionItem key={index} faq={faq} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/50 to-zinc-900/50 border border-amber-500/20"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Still not sure? Let's talk.
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            We're real people who actually use this software. We know restaurants because we built this for ourselves first.
          </p>
          <a
            href="mailto:info@sharptable.com.ng"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
          >
            Get in Touch
            <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
