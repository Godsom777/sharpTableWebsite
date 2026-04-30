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
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

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
    question: 'Where does SharpTable work? Is it only for Nigeria?',
    answer: "SharpTable works globally - anywhere you have internet access. We built it for restaurants worldwide. While we started in Nigeria and have strong African roots, we're already serving restaurants in the UK, US, Australia, and across Europe. The QR codes work with any smartphone, the payment gate integrates with Paystack (which supports international cards), and the dashboard is accessible from any browser. Your customers can order from anywhere, and you can manage your restaurant from anywhere.",
  },
  {
    category: 'general',
    icon: faQuestionCircle,
    question: 'How is this different from a POS system like SambaPOS or Square?',
    answer: "SharpTable isn't trying to be a full POS system. We do one thing obsessively well: make sure you get paid before the kitchen starts. Traditional POS systems have inventory modules, employee timesheets, loyalty programs, table management, reservation systems - features most restaurants never use. SharpTable focuses on the payment gate, real-time order tracking, and the oversight tools you actually need. No training manuals. No certified installers. Just scan, pay, confirm, cook. If you need a bloated system with 100 features, we're not for you. If you want something that works in 30 seconds, you're in the right place.",
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: 'Do my customers need to download an app?',
    answer: "No. That's the point. Your customers scan a QR code at their table, the menu opens in their phone's browser, they order and pay - all without downloading anything. No 'Download our app' friction. No app store ratings to worry about. No updates to push. It just works. The only people who need accounts are you (the owner), your kitchen staff, and your Marshalls.",
  },
  {
    category: 'operations',
    icon: faClock,
    question: "What happens if a customer orders but doesn't pay?",
    answer: "They can't. That's the whole system. The order doesn't reach your kitchen until payment is confirmed. Customers scan the QR code, browse the menu, add items to their cart, and when they hit 'Order' they're taken straight to Paystack to pay. Only after successful payment does the Marshall see the order. Only after the Marshall confirms it does the kitchen start cooking. No payment = no order. It's that simple. Walkouts become impossible.",
  },
  {
    category: 'operations',
    icon: faShieldHalved,
    question: 'Can I trust the Marshall role? What if they confirm fake orders?',
    answer: "Every action is logged in the audit trail - who confirmed what order, when, from which device. If a Marshall confirms an order, it's tied to their account permanently. You'll see it in the daily summary, in the Intelligence dashboard, in the order history. The system is designed for accountability. Your Marshall becomes your trust layer - they verify the order matches what the customer actually wants before it goes to the kitchen. If you have concerns about a specific Marshall, you can review their entire history and remove their access instantly.",
  },
  {
    category: 'technical',
    icon: faWifi,
    question: 'What if the internet goes down?',
    answer: "SharpTable needs internet to work - it's a cloud system. If your internet goes down, customers can't place new orders through the QR codes. However, your Marshall and kitchen dashboards will show all orders that were already confirmed before the outage, so your team can keep cooking. When internet returns, everything syncs automatically. This is the trade-off with cloud systems: you need connectivity, but you get real-time data, zero setup, automatic backups, and you can check your restaurant from anywhere in the world. Most modern restaurants already depend on internet for cards and mobile payments anyway.",
  },
  {
    category: 'technical',
    icon: faCreditCard,
    question: 'What payment methods do you support?',
    answer: "SharpTable uses Paystack as the payment processor. That means your customers can pay with Visa, Mastercard, Verve, American Express, bank transfers, and mobile money (where available). Paystack handles all the payment security, PCI compliance, and fraud detection. You get paid directly to your bank account on Paystack's settlement schedule (usually T+1 or T+2 business days, depending on your country). We don't touch your money - it goes straight from customer to Paystack to your bank.",
  },
  {
    category: 'pricing',
    icon: faCreditCard,
    question: "How does the pricing work? I see USD but I'm not in the US.",
    answer: "Prices are displayed in USD for global clarity, but you're billed in your local currency (Nigerian Naira via Paystack). The USD amount converts to the equivalent in Naira at current exchange rates when you subscribe. For example, the Pro plan is approximately N150,000/month and Enterprise is approximately N199,999/month. Enterprise includes up to 4 branches, and each branch above 4 adds N50,000. No surprise charges, no hidden fees - what you see on the pricing page is what you'll pay, converted to Naira at checkout.",
  },
  {
    category: 'pricing',
    icon: faQuestionCircle,
    question: 'Do you take a percentage of my sales?',
    answer: "No. Never. We charge a flat monthly or yearly subscription - that's it. Whether you make N1 million or N10 million a month, your SharpTable bill stays the same until you add extra Enterprise branches above 4. We're not a payment processor (that's Paystack's job), we're a restaurant operations tool. You pay for the plan that fits your restaurant size, and that's your only SharpTable cost. Paystack charges their standard payment processing fees, but SharpTable doesn't take a cut of your revenue.",
  },
  {
    category: 'pricing',
    icon: faGlobe,
    question: "What's the difference between Pro and Enterprise?",
    answer: 'Pro is for single-branch restaurants. You get the payment gate, Marshall dashboard, kitchen display, staff management, audit trail, and daily summaries. Enterprise is for operators running multiple branches. You get everything in Pro, plus WhatsApp ordering, food inventory, food tracker, unified analytics, multi-branch oversight, and 4 branches included in the base price. If you add more than 4 branches on Enterprise, each extra branch is N50,000. If you only need one branch, get Pro. If you want the operational layer across multiple branches, get Enterprise.',
  },
  {
    category: 'technical',
    icon: faClock,
    question: 'How long does setup take?',
    answer: "About 30 minutes. Seriously. Create your account, add your menu items (name, price, description, photo if you want), generate your QR codes, print them, and put them on tables. Your Marshall and kitchen staff can log in from any device - they don't need to install anything. You can be live the same day you sign up. No hardware to buy. No installers to schedule. No training sessions. We've had restaurants go from signup to first paid order in under an hour.",
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: 'Can customers split bills or pay separately?',
    answer: "Yes. The split billing feature is built in. If multiple people at a table want to pay separately, they each scan the QR code, select the items they're paying for, and complete their own payment. Each payment creates a separate order entry, all linked to the same table. Your Marshall sees all the orders from that table grouped together. This is especially useful for groups, corporate lunches, or any situation where people want individual receipts.",
  },
  {
    category: 'operations',
    icon: faShieldHalved,
    question: 'What if I need to refund a customer?',
    answer: "Refunds are handled through Paystack's dashboard. Since SharpTable doesn't process payments directly, you'll log into your Paystack account, find the transaction, and issue the refund from there. Paystack gives you full control over refunds, partial refunds, and disputes. SharpTable's audit trail will show you the original order details, customer info, and payment reference, so you can quickly find the transaction in Paystack and process the refund.",
  },
  {
    category: 'technical',
    icon: faWifi,
    question: 'Do I need special hardware or tablets?',
    answer: "No. Your Marshall can use any smartphone or tablet with a browser. Your kitchen can use any computer, tablet, or even a smartphone to view the Kitchen Display Screen (KDS). Your customers use their own phones. That's it. No expensive iPad POS terminals. No proprietary hardware. No vendor lock-in. If a device breaks, grab any other device, log in, and you're back in business. This is one reason SharpTable is so much cheaper than traditional POS systems - you're not buying hardware.",
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: 'Can I customize my menu items? Add photos? Mark items as sold out?',
    answer: "Yes. You have full control over your menu from the admin dashboard. Add items, set prices, upload photos (recommended but not required), write descriptions, categorize by food type (appetizers, mains, drinks, etc.). If something runs out, you can mark it as 'Sold Out' in real-time - customers won't see it on the menu until you turn it back on. For Enterprise users, you can set different menus or prices per branch if needed.",
  },
  {
    category: 'pricing',
    icon: faCreditCard,
    question: 'Can I cancel anytime? Is there a contract?',
    answer: "You can cancel anytime, no questions asked, no penalties. Monthly plans are month-to-month. Yearly plans are paid upfront but give you significant savings (22-35% off). If you cancel a yearly plan mid-year, you won't get a refund for unused months - but there's no auto-renewal trap, no cancellation fees, no 'call us to cancel' runaround. Just cancel from your account settings and you're done. Your subscription runs until the end of your paid period, then stops.",
  },
  {
    category: 'technical',
    icon: faGlobe,
    question: 'Is my data safe? What about customer payment info?',
    answer: "Your data is stored securely on Supabase (a modern cloud database with enterprise-grade security). All connections are encrypted with HTTPS. Customer payment information never touches our servers - it goes directly to Paystack, which is PCI-DSS Level 1 certified (the highest security standard for payment processors). We see order details, not card numbers. Your restaurant data is backed up continuously. You can export your data anytime. We'll never sell your data or customer information to third parties.",
  },
  {
    category: 'operations',
    icon: faUtensils,
    question: 'What if customers have questions or need help while ordering?',
    answer: "Your menu can include a 'Message to Kitchen' feature where customers can add special requests or notes ('no onions,' 'extra spicy,' etc.). For general questions, we recommend adding a support contact number or WhatsApp link to your QR code setup. On Enterprise, that can be your ordering WhatsApp flow. The beauty of SharpTable is it reduces order-taking work for your staff - but they're still there to help customers who need assistance. Older customers or anyone uncomfortable with tech can still order through your waitstaff the traditional way; SharpTable is an option, not a replacement.",
  },
  {
    category: 'general',
    icon: faQuestionCircle,
    question: "I'm skeptical. Why should I change what already works?",
    answer: "Fair question. If your current system genuinely has zero revenue leakage, perfect staff accountability, complete order history, real-time inventory visibility, and you never wonder where money went - then you probably don't need SharpTable. But most owners think things are fine until they see the first audit report. The average restaurant loses 5-12% of revenue to walkouts, untracked orders, cash discrepancies, and theft. That's $2,000-$6,000 per month on a $50,000 revenue restaurant. SharpTable recovers most of that. Try the ROI calculator on the pricing page - plug in your real numbers. If the math doesn't make sense, don't buy it. If it does, you'll wish you'd started sooner.",
  },
];

const FAQAccordionItem: React.FC<{ faq: FAQItem; index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      sx={{ border: '1px solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', overflow: 'hidden', bgcolor: '#111111', transition: 'border-color 0.3s', '&:hover': { borderColor: 'rgba(255,255,255,0.2)' } }}
    >
      <Box
        component="button"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ width: '100%', px: { xs: 3, md: 4 }, py: 3, display: 'flex', alignItems: 'flex-start', gap: 2, textAlign: 'left', transition: 'background-color 0.2s', bgcolor: 'transparent', border: 'none', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, fontFamily: 'inherit' }}
      >
        <Box sx={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5 }}>
          <FontAwesomeIcon icon={faq.icon} style={{ width: 16, height: 16, color: 'white' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', md: '1.125rem' }, pr: 4 }}>{faq.question}</Typography>
        </Box>
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} sx={{ flexShrink: 0 }}>
          <FontAwesomeIcon icon={faChevronDown} style={{ width: 20, height: 20, color: 'grey.400' }} />
        </Box>
      </Box>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{ px: { xs: 3, md: 4 }, pb: 4, pl: { xs: 8, md: 9 } }}>
              <Typography sx={{ color: 'grey.400', lineHeight: 1.625, whiteSpace: 'pre-line' }}>{faq.answer}</Typography>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
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

  const filteredFaqs = activeCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <Box component="section" sx={{ py: { xs: 16, md: 24 }, bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '9999px', px: 2, py: 0.75, mb: 2 }}>
            <FontAwesomeIcon icon={faQuestionCircle} style={{ width: 16, height: 16, color: '#fbbf24' }} />
            <Box component="span" sx={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.875rem' }}>FAQ</Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' }, fontWeight: 900, color: 'white', mb: 3, letterSpacing: '-0.04em' }}>
            Questions? We've got answers.
          </Typography>
          <Typography sx={{ color: 'grey.400', fontSize: '1.125rem', maxWidth: 'md', mx: 'auto' }}>
            Everything you need to know about SharpTable - from setup to daily operations. Still have questions? Email us at{' '}
            <Box component="a" href="mailto:info@sharptable.com.ng" sx={{ color: '#fbbf24', textDecoration: 'none', '&:hover': { color: '#fcd34d' }, transition: 'color 0.2s' }}>
              info@sharptable.com.ng
            </Box>
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: { xs: 8, md: 10 } }}
        >
          {categories.map((category) => (
            <Box
              component="button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              sx={{
                px: 2.5,
                py: 1.25,
                borderRadius: '0.5rem',
                fontWeight: 500,
                fontSize: '0.875rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                fontFamily: 'inherit',
                ...(activeCategory === category.id
                  ? { bgcolor: 'white', color: 'black', border: '1px solid white' }
                  : { bgcolor: '#111111', color: 'grey.400', border: '1px solid', borderColor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: '#1a1a1a', color: 'white' } }),
              }}
            >
              {category.label}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnimatePresence mode="wait">
            <Box
              component={motion.div}
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {filteredFaqs.map((faq, index) => (
                <FAQAccordionItem key={index} faq={faq} index={index} />
              ))}
            </Box>
          </AnimatePresence>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ mt: 10, textAlign: 'center', p: { xs: 4, md: 8 }, borderRadius: '2.5rem', bgcolor: '#111111', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, color: 'white', mb: 2, letterSpacing: '-0.04em' }}>
            Still not sure? Let's talk.
          </Typography>
          <Typography sx={{ color: 'grey.400', mb: 4, maxWidth: 'sm', mx: 'auto' }}>
            We're real people who actually use this software. We know restaurants because we built this for ourselves first.
          </Typography>
          <Box
            component="a"
            href="mailto:info@sharptable.com.ng"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 4, py: 2, bgcolor: 'white', color: 'black', fontWeight: 800, borderRadius: '9999px', textDecoration: 'none', transition: 'all 0.2s', '&:hover': { bgcolor: 'grey.200' } }}
          >
            Get in Touch
            <FontAwesomeIcon icon={faQuestionCircle} style={{ width: 16, height: 16 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
