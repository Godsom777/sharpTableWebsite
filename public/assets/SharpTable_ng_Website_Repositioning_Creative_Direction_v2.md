# SharpTable_ng — Website Repositioning & Creative Direction

> **Important naming note:** The product/brand name used in this document is **SharpTable_ng**.  
> The website domain is **sharptable.com.ng**.

> **Revision note (v2):** The original draft made "orders coming from everywhere" the headline promise. That's the right *mechanism* story, but it's not the right *hero* — it speaks to a single-location restaurant's problem, not the multi-branch group owner (3–10 locations) who is actually the buyer, and who is won on-site with theft, kitchen miscommunication, and branch-visibility pain, not missed WhatsApp orders. This revision keeps the existing hero promise ("Every naira. Every branch. Every shift.") as the headline and repositions the omnichannel-orders narrative as the proof underneath it — the "here's how" once the owner already sees themselves in the problem. It also tightens the AI/Insights language so the site doesn't promise forecasting the product doesn't yet do, and flags a production-sequencing consideration.

---

## Instructions for the coding agent executing this plan

This document is creative direction, not a literal spec — most of it requires judgment calls (which photo, which exact phrasing, how a section actually looks) that a human should make or approve, not an agent alone. Follow these rules:

1. **Build and get sign-off one section at a time**, in the order given in Section 21's flow (Hero → Restaurant Moment → The Fourth Set of Eyes → Mechanism → five modules → WhatsApp demo → credibility → CTA). Do not build the full homepage in one pass. A creative direction doc has far more room for a reasonable-sounding wrong turn than a technical spec does — smaller review cycles catch that early.

2. 🛑 **STOP before finalizing hero copy.** The hero promise has already been revised once in this conversation because the first draft optimized for distinctiveness over matching the actual buyer. Any agent-generated hero copy — even copy that follows the letter of this doc — should come back to the human as 2–3 options before being treated as final, not committed as the single obvious answer.

3. 🛑 **STOP before using any photography that isn't sourced from real SharpTable/client environments.** Section 13 is explicit: no generic stock photography, no "happy business owner with tablet" imagery. If real photography isn't available yet, AI-generated or stock placeholder images are acceptable *only* as clearly-labeled placeholders (e.g. a `TODO: replace with real photo of [scene]` comment in the code, or a visible watermark in a staging build) — never shipped to production as final. An agent should not treat "found an image that fits the mood" as equivalent to "found the real, observational photography this doc calls for."

4. 🛑 **STOP before publishing any copy that implies a feature the product doesn't currently ship.** This applies most directly to Section 18 (Insights/AI) but isn't limited to it — check any new copy against what's actually live before treating it as ready, the same way Section 18 already distinguishes the current-state claim from the future forecasting claim. If unsure whether something has shipped, ask rather than assume the more impressive version is safe to write. **This includes the open "Discounts" question** (see the section right after Section 17) — do not write, build, or place discount-related homepage copy until that question has an explicit answer from the human.

5. **Never deploy directly to the production branch/domain.** All work goes to a preview/staging deployment first (Vercel preview deploys are the natural fit here). The human reviews the live preview — not just a description of what was built — before anything merges to production. This is not optional even for small copy tweaks, since the site's crawlability was a real, previously-broken thing (see Section 25) and a small change can silently reintroduce it.

6. **Before any production deploy, verify the crawlability checklist from Section 25** (no `opacity:0`-at-load blocking crawlers, hero imagery/video lazy-loaded, no CSS-minification regressions). Report this check explicitly rather than assuming a working preview means crawlability is intact — they're different things.

7. **If asked to "just finish the rest of the homepage" or otherwise batch multiple unreviewed sections together**, push back and propose continuing the one-section-at-a-time cadence, or ask the human to explicitly accept the batch risk first.

8. 🛑 **STOP before shipping the particle/motion treatment in Section 26.** `InteractiveParticles` has no `prefers-reduced-motion` handling as sourced — this must be added, not treated as optional, before it reaches production. Confirm this explicitly, don't just report that the component "works."

---

## 1. Why the website needs to change

The original product story is no longer the right story.

The initial concept leaned heavily toward QR/table ordering and a paid-before-preparation workflow. That is no longer the main direction.

The stronger product is the system that handles **orders coming from outside the restaurant's normal in-house ordering flow** — especially WhatsApp — and brings those orders into the restaurant's existing operational workflow.

This is a real and distinctive story:

> **Orders have a way of coming from everywhere. SharpTable_ng brings them back to one table.**

But it is the story of *how the system works*, not the story of *why the owner should care first*. The owner who books a demo is a multi-branch operator worried about a manager skimming cash at branch 4, not a single-location owner worried about a missed WhatsApp order. So this idea should live as the **proof and mechanism** on the homepage — the section that shows *how* SharpTable_ng delivers on the branch-and-accountability promise — rather than as the opening line.

This is not simply a new feature list. It is a change in the way the product should be understood. It just shouldn't replace the hero that field sales already knows works.

---

# 2. What is already on sharptable.com.ng

The current website was reviewed directly at **https://sharptable.com.ng**.

It already has substantial product depth. The current site presents:

- QR Ordering
- Split Payments
- Kitchen Sync
- WhatsApp Orders
- Multi-Branch Control
- Hotel & Room Service
- Live dashboards
- Inventory/stock alerts
- Staff/Marshall verification
- Fraud/audit protection
- Revenue tracking
- Payment breakdowns
- Pricing
- Testimonials
- Hotel positioning

The current hero is:

> **Every naira.  
> Every branch.  
> Every shift.**

It positions SharpTable primarily around visibility, revenue control, staff accountability, stock alerts and fraud protection.

The site also currently describes WhatsApp ordering as a flow where customers browse the menu, order and pay through WhatsApp before the order reaches the dashboard.

That existing functionality is valuable, but the website currently tells **too many product stories at once**.

It tries to sell:

- QR ordering
- payments
- kitchen
- WhatsApp
- multi-branch management
- hotels
- fraud prevention
- inventory
- staff oversight

all within the same primary narrative.

That makes the product look broad, but it makes the brand story less distinctive.

---

# 3. The strategic shift

## Old story

> Scan → Order → Pay

## New story

> Customer orders anywhere → SharpTable_ng captures it → Staff confirms → Kitchen prepares → Order is completed → Customer history and business data are updated.

The product should no longer be presented primarily as a customer-facing ordering interface.

It should be presented as the **operational layer that connects the different ways a restaurant receives orders**.

---

# 4. The five product modules

The five modules should remain the core product architecture:

1. **Orders**
2. **Customers**
3. **Kitchen**
4. **Inventory**
5. **Insights**

However, they should NOT become five long feature explanations on the homepage.

They should act as five connected parts of one story.

## The relationship

```text
                    SHARPTABLE_NG

                        ORDERS
                          |
             +------------+------------+
             |            |            |
             v            v            v
         CUSTOMERS     KITCHEN      PAYMENTS
             |            |
             +------+-----+
                    |
                    v
                INVENTORY
                    |
                    v
                 INSIGHTS
```

The advantage is not having five features.

The advantage is that **one order can affect all five areas of the restaurant**.

---

# 5. Module 01 — Orders

## Core idea

> **The message becomes an order.**

SharpTable_ng should capture orders regardless of where they originate.

Potential channels:

- WhatsApp
- Website
- Phone
- Walk-in
- QR
- Staff-created orders
- Future delivery/platform integrations

The key value proposition is:

> **Wherever the order starts, it should not get lost.**

### Website presentation

Do not write a long technical explanation.

Instead, show a visual story:

```text
CUSTOMER

"Good evening, please can I get
two chicken shawarma and one Coke."

                 ↓

SHARPTABLE_NG

Order #1082
Chicken Shawarma × 2
Coke × 1
₦XX,XXX

                 ↓

STAFF

Confirm order

                 ↓

KITCHEN

Preparing #1082

                 ↓

COMPLETED
```

This is much easier to understand than a paragraph describing omnichannel ordering.

---

# 6. Module 02 — Customers

## Core idea

> **Know who's behind the order.**

Every order should gradually create a useful customer profile.

Example:

```text
CHISOM

18 orders
₦284,500 total spend

Favourite:
Chicken & Chips

Last order:
9 days ago

Average order:
₦15,805
```

The future value is not merely storing customer information.

It is enabling:

- Reordering
- Loyalty
- Customer history
- Repeat-customer recognition
- Customer segmentation
- Promotions
- WhatsApp follow-ups

A strong future feature:

> **Order your usual?**

The customer should not need another app download just to become a repeat customer.

---

# 7. Module 03 — Kitchen

## Core idea

> **The kitchen sees what matters.**

The kitchen should not care whether an order came from WhatsApp, a waiter, a website or a QR code.

It needs a clean sequence:

```text
NEW
 ↓
CONFIRMED
 ↓
PREPARING
 ↓
READY
 ↓
COMPLETED
```

This is where the product becomes operational software.

The website should visually show orders moving through the kitchen rather than merely saying:

> "Real-time kitchen synchronization."

A more human line is:

> **No rewriting orders. No screenshots. No searching through chats.**

---

# 8. Module 04 — Inventory

## Core idea

> **Know what's left before you say yes.**

Inventory should be connected to actual orders.

For example:

```text
Chicken & Chips × 1
        |
        +-- Chicken
        +-- Potatoes
        +-- Cooking oil
```

As the product matures, completed orders can automatically affect ingredient stock.

This creates a stronger connection:

> **Orders → Ingredients → Stock → Purchasing**

The website should avoid generic language such as "powerful inventory management."

Instead, explain the consequence:

> **Know what you're selling. Know what you're running out of.**

---

# 9. Module 05 — Insights

## Core idea

> **When the doors close, the numbers tell the story.**

Restaurant owners need more than a list of transactions.

The system should surface:

- Sales
- Orders
- Average order value
- Best-selling items
- Peak periods
- Slow periods
- Order channels
- Repeat customers
- Payment breakdown
- Staff activity
- Inventory warnings

Example:

```text
TODAY

Sales              ₦385,500
Orders             127
Average order      ₦3,035

WhatsApp           42 orders
Walk-in            51 orders
Website            34 orders
```

Later, this can become an intelligent insights layer.

For example:

> Chicken & Chips sales increased this week, but average order value dropped. Consider bundling it with a drink.

The important thing is not to overuse "AI" in the marketing.

Show the useful conclusion instead.

---

# 10. The website should NOT be a feature catalogue

The previous proposed website structure was too expressive.

The homepage should NOT explain every feature in depth.

Use three information levels:

## Level 1 — Homepage

Answer:

> **What is SharpTable_ng and why should I care?**

## Level 2 — Product pages

Answer:

> **How does each part of SharpTable_ng work?**

## Level 3 — App / documentation

Answer:

> **Exactly how do I use it?**

The homepage should be approximately:

> **70% visual / 30% text**

The visitor should be able to understand the product by watching the workflow.

This is also the direct answer to "keep the homepage minimal without losing the product's depth": the depth doesn't disappear, it moves to Level 2. The homepage's job is to earn the click to "Product," not to be the product page itself.

---

# 11. Creative direction

This is extremely important.

SharpTable_ng should NOT look like another AI-generated SaaS website.

Avoid:

- Loud, saturated gradient backgrounds (the purple-to-blue "AI startup" mesh gradient) — see Section 12 for the soft, muted gradient treatment this doc does call for
- Floating 3D objects
- Excessive rounded cards
- Generic smiling-business-owner stock photography
- "AI-powered" everywhere
- Excessive feature icons
- "Seamless"
- "Powerful"
- "Revolutionize"
- "Take your business to the next level"
- "Everything you need"
- "Built for modern businesses"
- "Stay in control"

These phrases have become SaaS wallpaper. The same logic applies to visuals — it's not gradients themselves that are the problem, it's the loud, default version every Framer template already uses.

---

# 12. The desired visual personality

SharpTable_ng should feel like:

> **A modern hospitality company that happens to build excellent software.**

Not:

> A software company trying to look sophisticated.

The visual language should lean toward:

- Editorial typography
- Strong photography
- Deliberate whitespace
- Large typography
- Restrained UI
- Real product interfaces
- Human copy
- Asymmetrical layouts where appropriate
- Strong visual rhythm
- Small details that reward attention

The website should feel like it was designed by a **small, opinionated design and storytelling studio**.

### Typography

Lead with scale, not decoration. Large, bold display type carries the core promise ("Every naira. Every branch. Every shift.") with minimal supporting copy underneath — one line, not a paragraph. If a line needs a second sentence to explain itself, cut it rather than add the second sentence.

### Background treatment

Soft, muted gradients are welcome — a quiet tonal wash behind photography or a hero headline, not a substitute for photography. The distinction from the banned "generic gradient" in Section 11: this should feel like a warm, barely-there shift in light — closer to the soft falloff of restaurant ambient lighting than a saturated purple-to-blue mesh sitting behind floating UI elements. If someone could screenshot the background alone and mistake it for any other SaaS product, it's too loud.

### Motion

Restrained, not decorative. Elements fade and rise gently into place on scroll (a small vertical offset, 12–20px, plus opacity) — no bounce, no elastic easing, nothing spinning or pulsing for attention. Stagger related elements slightly (50–100ms apart) rather than animating everything at once, so one thing earns the eye at a time. This also has a practical side: keep initial animation states crawlable (see Section 25) — an element that starts at `opacity: 0` and only animates in on scroll must still be readable to a crawler that doesn't scroll.

---

# 13. Use real restaurant imagery

Avoid generic stock photos such as:

> "Happy restaurant owner looking at tablet."

Instead, use observational photography:

- Waiter carrying plates
- Close-up of a handwritten order
- Phone displaying WhatsApp
- Kitchen pass
- Receipt beside a POS terminal
- Restaurant during dinner service
- Chef checking tickets
- Busy bar/grill service
- Restaurant after the rush
- Staff coordinating during peak hours

The photography should feel Nigerian/African and authentic to the environments SharpTable_ng serves.

The imagery should communicate:

> **This software understands what happens here.**

---

# 14. Brand voice

The copy should sound like people who understand restaurants.

### Avoid

> Manage incoming WhatsApp orders efficiently.

### Prefer

> **The message arrives.**

---

### Avoid

> Improve kitchen communication.

### Prefer

> **The kitchen sees what matters.**

---

### Avoid

> Real-time inventory management.

### Prefer

> **Know what's left before you say yes.**

---

### Avoid

> Customer retention and loyalty.

### Prefer

> **Some customers come back. Make it easy for them.**

---

### Avoid

> Advanced business analytics.

### Prefer

> **When the doors close, the numbers tell the story.**

The writing should be short, confident and specific.

---

# 15. Proposed homepage story

## HERO

### Every naira. Every branch. Every shift.

You can't be everywhere. SharpTable_ng can.

CTA:

**See how it works**

Secondary:

**Get started**

Then show the product interface — ideally a multi-branch live dashboard, not an order ticket. Lead with the view an owner wishes they had, not the mechanism behind it.

---

## SECTION 2 — THE RESTAURANT MOMENT

Use a strong full-width restaurant photograph.

Small editorial label:

> **Friday. 8:17 PM.**

Then:

> Three branches are running service at once.  
> Three WhatsApp orders just came in.  
> A manager is short at the till.
>
> **This is where SharpTable_ng lives.**

This is storytelling rather than feature marketing. Note the shift from the earlier draft: the moment now includes a branch-accountability beat (the till) alongside the order-chaos beat, so it earns the hero promise instead of only illustrating the mechanism.

*Motion candidate: see Section 26 for a proposed particle treatment that opens on chaos and settles to calm as this section loads — proposal only, needs sign-off before it's built.*

---

## SECTION 3 — THE FOURTH SET OF EYES

This section didn't exist in the earlier draft. It should — it's the most direct, hardest-to-copy proof of the hero promise, and it's already built, not aspirational (see the note below).

> **Every branch has a Marshall, a Chef, a manager.**
>
> **SharpTable_ng adds a fourth — one that answers only to the numbers.**

### Every edit. Every comp. Every void. Logged automatically, by branch.

*Grounding note (not for publication): this is the Auditor role — its own login, its own dashboard, sitting alongside Marshall/Chef/Admin. Every insert, update, and delete across the system is captured with a diff, tied to tenant and branch. Complimentary/comped orders are already tracked per staff member and flagged on the analytics dashboard. This is real, running software, which is exactly why it earns a spot this close to the hero — unlike Section 18's forecasting caution, there's nothing here to overpromise.*

Keep this section as short as the copy above. It doesn't need a diagram like Orders or Kitchen — the two bold lines are the whole point. A visual of the Auditor dashboard (a clean reconciliation view, not a busy screenshot) does the rest of the work.

---

## SECTION 4 — THE MECHANISM ("Orders have a way of coming from everywhere")

This is where the omnichannel-orders story from earlier drafts belongs — as the *proof*, once the owner already recognizes the problem from Section 2.

### Orders have a way of coming from everywhere.

WhatsApp.  
A phone call.  
Someone at the counter.  
A link someone found online.

### SharpTable_ng brings them back to one table — at every branch.

Show the product interface here. This section earns its place by demonstrating *how* the branch-and-accountability promise gets delivered, not by opening the page with it.

*Motion candidate: see Section 26 for a proposed word-cycle treatment (WhatsApp / phone / counter / link → "One table.") — proposal only, needs sign-off before it's built.*

---

# 16. Product modules on the homepage

Introduce them with:

## Five things SharpTable_ng keeps together.

Then use five compact editorial sections.

### 01 / ORDERS

> **The message becomes an order.**

Product visual.

### 02 / CUSTOMERS

> **The next order starts with the last one.**

Product visual.

### 03 / KITCHEN

> **The kitchen sees what matters.**

Product visual.

### 04 / INVENTORY

> **Know what's left before you say yes.**

Product visual.

### 05 / INSIGHTS

> **When the doors close, the numbers tell the story.**

Product visual.

Each section should be visually distinct.

Do not use five identical feature cards.

---

# 17. The strongest existing feature: WhatsApp

The current website already has a substantial WhatsApp ordering section.

This should remain prominent, but the story should evolve. It also does its best work as *proof* underneath the branch-and-accountability hero (see the Mechanism section under Section 15), rather than as the thing that opens the page — it's the most commoditized-sounding claim in the product (several Nigerian competitors also pitch "WhatsApp ordering"), while branch oversight and fraud accountability are where SharpTable_ng is harder to copy.

Instead of making WhatsApp simply:

> Customer browses → pays → order arrives

the broader story becomes:

> **Your customers already know how to reach you. SharpTable_ng makes sure the restaurant knows what to do next.**

Show:

```text
WHATSAPP

Customer sends order
        ↓
SHARPTABLE_NG
        ↓
Staff confirms
        ↓
Kitchen receives
        ↓
Order completed
```

This is a strong, believable product story because it reflects existing functionality.

---

## Discounts — open question, not yet resolved

Auditing had an obvious answer once the code was checked: include it, prominently. Discounts don't, yet.

A direct search of the codebase didn't turn up a customer-facing discount or coupon-code system. What it did turn up is two different things, and the right homepage treatment depends on which one is actually meant:

1. **VIP/tiered table pricing** — a table can be assigned a "VIP" price tier, so guests at that table see different (usually lower) menu prices. This is a hospitality/loyalty feature, not urgent, and would sit as a minor supporting point rather than anywhere near the hero.
2. **Complimentary ("comp") order tracking** — already covered above, in Section 3. Comps are tracked per staff member and flagged in the analytics dashboard. This isn't really a "discount" story at all — it's part of the accountability story, and it's already accounted for.

**Do not write homepage copy for "discounts" until this is confirmed.** If it turns out to be something else entirely — a promo-code engine that isn't in this export, or something still being planned — say so and this section gets rewritten properly once it's clear what's actually shipping.

---

# 18. Don't lead with AI

AI can eventually become valuable for:

- Sales insights
- Demand prediction
- Inventory forecasting
- Customer recommendations
- Reorder prompts
- Abandoned-order recovery
- Menu performance analysis

But it should not be the headline.

The restaurant owner doesn't care that something is AI-powered.

They care about the outcome — but the site should only promise outcomes the product currently delivers. Today that's clear, current-state reporting:

> **"I know exactly what sold, what didn't, and what's running low — before I even open the branch."**

Once predictive insight (e.g. stock forecasting, demand prediction) actually ships, the site can graduate to a forward-looking line such as:

> **"You told me I would run out of chicken tomorrow, and you were right."**

Do not publish the forecasting-style claim ahead of the feature. A Nigerian operator who tries a demo and finds the "prediction" isn't real yet is a harder sale to recover than one who was told a slightly more modest, accurate story from the start.

---

# 19. Navigation

Keep the main navigation simple:

**SharpTable_ng**

- Product
- Solutions
- Pricing
- Resources
- Login
- Get Started

Product can contain:

- Orders
- Customers
- Kitchen
- Inventory
- Insights

Do not expose every feature in the primary navigation.

---

# 20. The homepage should NOT explain the whole product

A good homepage should make the visitor think:

> "That's exactly what happens in my restaurant."

Then:

> "I want that."

It does not need to make the visitor memorize every feature.

---

# 21. Suggested homepage flow

```text
HERO
Every naira. Every branch. Every shift.

        ↓

RESTAURANT MOMENT
Friday. 8:17 PM. — order chaos AND a branch running short at the till.

        ↓

THE FOURTH SET OF EYES
Every edit. Every comp. Every void. Logged automatically, by branch.

        ↓

THE MECHANISM
Orders have a way of coming from everywhere.
SharpTable_ng brings them back to one table, at every branch.

        ↓

01 ORDERS
The message becomes an order.

        ↓

02 CUSTOMERS
The next order starts with the last one.

        ↓

03 KITCHEN
The kitchen sees what matters.

        ↓

04 INVENTORY
Know what's left before you say yes.

        ↓

05 INSIGHTS
When the doors close, the numbers tell the story.

        ↓

REAL PRODUCT DEMO
WhatsApp → Staff → Kitchen → Completed

        ↓

LOCAL/INDUSTRY CREDIBILITY
Built around real restaurant workflows.

        ↓

FINAL CTA
Run the restaurant.
We'll keep the orders together.
```

---

# 22. The central brand idea

The strongest version of the brand is not:

> "Restaurant management software."

It is:

> **SharpTable_ng keeps the restaurant's moving parts connected.**

The product can become much bigger underneath that idea.

The website simply needs to tell that story with discipline.

---

# 23. One strategic warning

Do not let the five modules become five unrelated features.

The competitive advantage is the connection:

**Order → Customer → Kitchen → Inventory → Insight**

One WhatsApp order can:

1. Create an order
2. Identify a customer
3. Create a kitchen ticket
4. Affect stock
5. Become part of sales analytics

That interconnected workflow is more defensible than simply having a WhatsApp ordering feature.

---

# 24. Final creative principle

The website should not feel like it is saying:

> "Look how many features we have."

It should feel like:

> **"We understand what happens when a restaurant gets busy."**

Then the software quietly demonstrates that it can handle it.

That is the difference between a **feature website** and a **brand story**.

---

# 25. Production sequencing and page-weight note

Two practical constraints worth flagging before this becomes a build ticket:

- **70/30 visual/text is a real production commitment.** Five visually distinct module sections, real observational photography, and a working product-interface demo is a meaningful chunk of design and dev time — on top of the hotel module, the Tauri desktop app, and the codebase restructure already in flight. This doesn't need to happen before those ship; sequence it deliberately rather than letting it compete for the same week.
- **Don't undo the crawlability fix.** The Next.js migration solved SEO crawlability issues that the Vite/React SPA had. A heavier, more visual homepage should lazy-load hero imagery/video and keep Framer Motion initial states from re-introducing an `opacity:0`-at-load problem for crawlers. Treat this as a checklist item during implementation, not an afterthought — see the coding-agent instructions above: this check is a required gate before any production deploy, not a nice-to-have.

---

# 26. Signature interaction: chaos → calm

Four externally-sourced components were evaluated (from vengenceui.com) as candidates for embodying the hero's chaos-to-calm story in motion, not just in copy. Two are recommended; two are not. This section is proposal, not settled direction — treat it with the same weight as hero copy in the coding-agent instructions: come back with a working preview before treating it as final.

## Recommended: InteractiveParticles (Restaurant Moment / Hero)

A WebGL particle field (Three.js) that samples an image into GPU particles and scatters them around the cursor. Its own intro animation already runs chaos → calm natively — it eases in from a scattered `depth: 40` down to a calm resting `depth: 3`. Use it, don't fight it.

**How to use it:**
- Sample it from a **real** image per Section 13 — a kitchen pass mid-service, a stack of order tickets, a POS screen during a rush. Not a demo/stock asset.
- Tune `color` to a muted, brand-appropriate tone (not the component's default stark white-on-black) so it reads as quiet, not as a tech demo.
- Keep `randomness` and `depth` on the restrained end — the goal is a brief, believable settle, not a fireworks show.

**Required before this ships (not optional):**
- 🛑 **Add `prefers-reduced-motion` handling.** The component as sourced has none. `research-bento-grid` (also linked) handles this correctly throughout via `useReducedMotion` — follow that same pattern here.
- 🛑 **Scope it for page weight.** Three.js plus a full shader pipeline is the single heaviest thing proposed for this homepage. Lazy-load it, keep it out of the critical render path, and confirm it doesn't regress the crawlability fix above. Consider limiting it to desktop/larger viewports if mobile performance testing shows real jank on mid-range Android hardware — a meaningful share of the actual buyer's team will be on exactly that hardware.

## Recommended: MorphText (Mechanism section), modified

Bold, configurable word-cycling text. Use it for the Mechanism section's list — cycling through the chaos, then stopping:

```text
WhatsApp
A phone call
Someone at the counter
A link someone found online
        ↓ (settles, does not loop)
One table.
```

**Required change:** the component as sourced loops infinitely with a heavy blur transition. That's decorative motion competing for attention, which Section 12's Motion guidance exists to avoid. Play the sequence once on scroll-into-view, land on the final word, stop.

## Not recommended: StaggeredGrid

A dense 21-tile image grid (the "Halcyon" Codrops demo) with hardcoded GitHub/Slack/Twitter icons and heavy hover-scale effects. This isn't restaurant content and the density contradicts Section 11's stance on excessive rounded cards and Section 12's restrained-motion direction. If a grid-reveal treatment is still wanted somewhere, it needs to be rebuilt simpler — treat this as inspiration for the general idea, not as a component to install as-is.

## Not recommended: research-bento-grid

Not a generic layout — a fully scripted dev-agency pricing pitch (Vercel/GitHub/Supabase/Cloudflare/Docker brand icons, a "$1,990/mo vs $32,000" invoice mockup, a workspace pause/resume toggle). Almost none of its content is reusable for a restaurant product, and Section 16 already has a purpose-built, appropriately minimal treatment for the five-module section. Stripping this down would cost more than building that section fresh.

## Stack note

The main app already depends on Framer Motion. StaggeredGrid and MorphText both pull in GSAP + ScrollTrigger — a second animation library doing overlapping work, worth being deliberate about rather than accepting by default. InteractiveParticles' GSAP usage is three short tweens and easily swapped for a Framer Motion equivalent if avoiding a second library matters more than the convenience of using it as-sourced; Three.js itself is the one genuinely unavoidable new dependency if this effect is wanted at all.

