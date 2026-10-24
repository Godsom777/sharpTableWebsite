'use client';

import React, { useState } from 'react';
import { CreditCard, Globe, HelpCircle, Mail, ShieldCheck, Clock, Utensils, Wifi, type LucideIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';

interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
  category: 'general' | 'pricing' | 'technical' | 'operations';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    icon: Globe,
    question: 'Where does SharpTable work? Is it only for Nigeria?',
    answer: "SharpTable works globally - anywhere you have internet access. We built it for restaurants worldwide. While we started in Nigeria and have strong African roots, we're already serving restaurants in the UK, US, Australia, and across Europe. The QR codes work with any smartphone, the payment gate integrates with Paystack (which supports international cards), and the dashboard is accessible from any browser. Your customers can order from anywhere, and you can manage your restaurant from anywhere.",
  },
  {
    category: 'general',
    icon: HelpCircle,
    question: 'How is this different from a POS system like SambaPOS or Square?',
    answer: "SharpTable isn't trying to be a full POS system. We do one thing obsessively well: make sure you get paid before the kitchen starts. Traditional POS systems have inventory modules, employee timesheets, loyalty programs, table management, reservation systems - features most restaurants never use. SharpTable focuses on the payment gate, real-time order tracking, and the oversight tools you actually need. No training manuals. No certified installers. Just scan, pay, confirm, cook. If you need a bloated system with 100 features, we're not for you. If you want something that works in 30 seconds, you're in the right place.",
  },
  {
    category: 'operations',
    icon: Utensils,
    question: 'Do my customers need to download an app?',
    answer: "No. That's the point. Your customers scan a QR code at their table, the menu opens in their phone's browser, they order and pay - all without downloading anything. No 'Download our app' friction. No app store ratings to worry about. No updates to push. It just works. The only people who need accounts are you (the owner), your kitchen staff, and your marshals.",
  },
  {
    category: 'operations',
    icon: Clock,
    question: "What happens if a customer orders but doesn't pay?",
    answer: "They can't. That's the whole system. The order doesn't reach your kitchen until payment is confirmed. Customers scan the QR code, browse the menu, add items to their cart, and when they hit 'Order' they're taken straight to Paystack to pay. Only after successful payment does the marshal see the order. Only after the marshal confirms it does the kitchen start cooking. No payment = no order. It's that simple. Walkouts become impossible.",
  },
  {
    category: 'operations',
    icon: ShieldCheck,
    question: 'Can I trust the marshal role? What if they confirm fake orders?',
    answer: "Every action is logged in the audit trail - who confirmed what order, when, from which device. If a marshal confirms an order, it's tied to their account permanently. You'll see it in the daily summary, in the Intelligence dashboard, in the order history. The system is designed for accountability. Your marshal becomes your trust layer - they verify the order matches what the customer actually wants before it goes to the kitchen. If you have concerns about a specific marshal, you can review their entire history and remove their access instantly.",
  },
  {
    category: 'technical',
    icon: Wifi,
    question: 'What if the internet goes down?',
    answer: "SharpTable needs internet to work - it's a cloud system. If your internet goes down, customers can't place new orders through the QR codes. However, your marshal and kitchen dashboards will show all orders that were already confirmed before the outage, so your team can keep cooking. When internet returns, everything syncs automatically. This is the trade-off with cloud systems: you need connectivity, but you get real-time data, zero setup, automatic backups, and you can check your restaurant from anywhere in the world. Most modern restaurants already depend on internet for cards and mobile payments anyway.",
  },
  {
    category: 'technical',
    icon: CreditCard,
    question: 'What payment methods do you support?',
    answer: "SharpTable uses Paystack as the payment processor. That means your customers can pay with Visa, Mastercard, Verve, American Express, bank transfers, and mobile money (where available). Paystack handles all the payment security, PCI compliance, and fraud detection. You get paid directly to your bank account on Paystack's settlement schedule (usually T+1 or T+2 business days, depending on your country). We don't touch your money - it goes straight from customer to Paystack to your bank.",
  },
  {
    category: 'pricing',
    icon: CreditCard,
    question: 'What currency is billed, and how does subscription payment work?',
    answer: "All plans are billed in Nigerian Naira (NGN) via Paystack: Solo at ₦50,000/month (1 branch), Growth at ₦99,999/month (2 to 5 branches), and Group at ₦199,999/month (6 to 10 branches). Yearly billing gives you 2 months free. Groups with 11+ branches get custom pricing. International and diaspora cards are fully accepted by Paystack with seamless currency conversion. What you see is what you pay — no hidden fees or surprise markups.",
  },
  {
    category: 'pricing',
    icon: HelpCircle,
    question: 'Do you take a percentage of my sales?',
    answer: "No. Never. We charge a flat monthly or yearly subscription - that's it. Whether you make N1 million or N10 million a month, your SharpTable bill stays the same unless your branch count moves you to a bigger plan. We're not a payment processor (that's Paystack's job), we're a restaurant operations tool. You pay for the plan that fits your number of branches, and that's your only SharpTable cost. Paystack charges their standard payment processing fees, but SharpTable doesn't take a cut of your revenue.",
  },
  {
    category: 'pricing',
    icon: Globe,
    question: 'Which plan do I pick?',
    answer: 'Count your branches: 1 is Solo, 2-5 is Growth, 6-10 is Group. Every plan has every feature.',
  },
  {
    category: 'pricing',
    icon: HelpCircle,
    question: 'What if I open another branch?',
    answer: 'Move up a plan whenever you need to.',
  },
  {
    category: 'technical',
    icon: Clock,
    question: 'How long does setup take?',
    answer: "About 30 minutes. Seriously. Create your account, add your menu items (name, price, description, photo if you want), generate your QR codes, print them, and put them on tables. Your marshal and kitchen staff can log in from any device - they don't need to install anything. You can be live the same day you sign up. No hardware to buy. No installers to schedule. No training sessions. We've had restaurants go from signup to first paid order in under an hour.",
  },
  {
    category: 'operations',
    icon: Utensils,
    question: 'Can customers split bills or pay separately?',
    answer: "Yes. The split billing feature is built in. If multiple people at a table want to pay separately, they each scan the QR code, select the items they're paying for, and complete their own payment. Each payment creates a separate order entry, all linked to the same table. Your marshal sees all the orders from that table grouped together. This is especially useful for groups, corporate lunches, or any situation where people want individual receipts.",
  },
  {
    category: 'operations',
    icon: ShieldCheck,
    question: 'What if I need to refund a customer?',
    answer: "Refunds are handled through Paystack's dashboard. Since SharpTable doesn't process payments directly, you'll log into your Paystack account, find the transaction, and issue the refund from there. Paystack gives you full control over refunds, partial refunds, and disputes. SharpTable's audit trail will show you the original order details, customer info, and payment reference, so you can quickly find the transaction in Paystack and process the refund.",
  },
  {
    category: 'technical',
    icon: Wifi,
    question: 'Do I need special hardware or tablets?',
    answer: "No. Your marshal can use any smartphone or tablet with a browser. Your kitchen can use any computer, tablet, or even a smartphone to view the Kitchen Display Screen (KDS). Your customers use their own phones. That's it. No expensive iPad POS terminals. No proprietary hardware. No vendor lock-in. If a device breaks, grab any other device, log in, and you're back in business. This is one reason SharpTable is so much cheaper than traditional POS systems - you're not buying hardware.",
  },
  {
    category: 'operations',
    icon: Utensils,
    question: 'Can I customize my menu items? Add photos? Mark items as sold out?',
    answer: "Yes. You have full control over your menu from the admin dashboard. Add items, set prices, upload photos (recommended but not required), write descriptions, categorize by food type (appetizers, mains, drinks, etc.). If something runs out, you can mark it as 'Sold Out' in real-time - customers won't see it on the menu until you turn it back on. For Enterprise users, you can set different menus or prices per branch if needed.",
  },
  {
    category: 'pricing',
    icon: CreditCard,
    question: 'Can I cancel anytime? Is there a contract?',
    answer: "You can cancel anytime, no questions asked, no penalties. Monthly plans are month-to-month. Yearly plans are paid upfront but give you significant savings (22-35% off). If you cancel a yearly plan mid-year, you won't get a refund for unused months - but there's no auto-renewal trap, no cancellation fees, no 'call us to cancel' runaround. Just cancel from your account settings and you're done. Your subscription runs until the end of your paid period, then stops.",
  },
  {
    category: 'technical',
    icon: Globe,
    question: 'Is my data safe? What about customer payment info?',
    answer: "Your data is stored securely on Supabase (a modern cloud database with enterprise-grade security). All connections are encrypted with HTTPS. Customer payment information never touches our servers - it goes directly to Paystack, which is PCI-DSS Level 1 certified (the highest security standard for payment processors). We see order details, not card numbers. Your restaurant data is backed up continuously. You can export your data anytime. We'll never sell your data or customer information to third parties.",
  },
  {
    category: 'operations',
    icon: Utensils,
    question: 'What if customers have questions or need help while ordering?',
    answer: "Your menu can include a 'Message to Kitchen' feature where customers can add special requests or notes ('no onions,' 'extra spicy,' etc.). For general questions, we recommend adding a support contact number or WhatsApp link to your QR code setup. On Enterprise, that can be your ordering WhatsApp flow. The beauty of SharpTable is it reduces order-taking work for your staff - but they're still there to help customers who need assistance. Older customers or anyone uncomfortable with tech can still order through your waitstaff the traditional way; SharpTable is an option, not a replacement.",
  },
  {
    category: 'general',
    icon: HelpCircle,
    question: "I'm skeptical. Why should I change what already works?",
    answer: "Fair question. If your current system genuinely has zero revenue leakage, perfect staff accountability, complete order history, real-time inventory visibility, and you never wonder where money went - then you probably don't need SharpTable. But most owners think things are fine until they see the first audit report. The average restaurant loses 5-12% of revenue to walkouts, untracked orders, cash discrepancies, and theft. That's $2,000-$6,000 per month on a $50,000 revenue restaurant. SharpTable recovers most of that. Try the ROI calculator on the pricing page - plug in your real numbers. If the math doesn't make sense, don't buy it. If it does, you'll wish you'd started sooner.",
  },
];

type Category = 'all' | FAQItem['category'];
const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'pricing', label: 'Pricing & Plans' },
  { id: 'technical', label: 'Technical' },
  { id: 'operations', label: 'Operations' },
];

export const FAQ: React.FC = () => {
  const [active, setActive] = useState<Category>('all');
  const list = active === 'all' ? faqs : faqs.filter((f) => f.category === active);

  return (
    <section className="relative bg-navy-950 py-14 md:py-24">
      <div className="container max-w-3xl">
        <Reveal className="mb-8 text-center md:mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-sm font-semibold text-brand-yellow">
            <HelpCircle className="size-4" aria-hidden /> FAQ
          </span>
          <h2 className="display-serif mb-4 text-4xl leading-[1.05] text-white md:text-6xl">Questions? We've got answers.</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to know about SharpTable - from setup to daily operations. Still have questions? Email us at{' '}
            <a href="mailto:info@sharptable.com.ng" className="inline-block py-2 text-brand-yellow underline-offset-4 hover:underline">info@sharptable.com.ng</a>
          </p>
        </Reveal>

        <Tabs value={active} onValueChange={(v) => setActive(v as Category)} className="mb-8">
          <TabsList className="no-scrollbar flex h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 md:justify-center">
            {categories.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="min-h-11 shrink-0 rounded-full border border-white/10 bg-navy-900 px-4 text-sm text-muted-foreground data-[state=active]:border-brand-yellow data-[state=active]:bg-brand-yellow data-[state=active]:text-navy-950"
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {list.map((f) => (
            <AccordionItem key={f.question} value={f.question} className="rounded-2xl border border-white/10 bg-navy-900 px-4 md:px-6">
              <AccordionTrigger className="min-h-14 gap-3 text-left text-base font-semibold text-white hover:no-underline md:text-lg">
                <span className="flex flex-1 items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10"><f.icon className="size-4" aria-hidden /></span>
                  {f.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line pl-12 text-[0.95rem] leading-relaxed text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Reveal className="mt-12 rounded-3xl border border-white/10 bg-navy-900 p-7 text-center md:p-12">
          <h3 className="mb-3 text-3xl font-black tracking-tight text-white md:text-4xl">Still not sure? Let's talk.</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">We're real people who actually use this software. We know restaurants because we built this for ourselves first.</p>
          <Button asChild size="lg">
            <a href="mailto:info@sharptable.com.ng">Get in Touch <Mail aria-hidden /></a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
