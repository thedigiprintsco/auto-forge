import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Are these Notion templates hard to set up?",
    answer: "Not at all. Each template comes with a 5-minute setup guide and a video walkthrough. You can be up and running in less than 10 minutes.",
  },
  {
    question: "Do I need a paid Notion or ChatGPT account to use these?",
    answer: "Our tools are designed to work perfectly on the free versions of Notion and ChatGPT, though a paid subscription can unlock advanced automation features.",
  },
  {
    question: "Can I customize the templates?",
    answer: "Yes! Everything we build is 100% customizable. You can tweak the colors, layouts, and databases to fit your specific workflow.",
  },
  {
    question: "How do I receive my products after purchase?",
    answer: "Instantly. After a successful checkout via Stripe, you’ll receive an email with direct download links and Notion duplication instructions.",
  },
  {
    question: "Do you offer updates?",
    answer: "Absolutely. All EtherForge products include lifetime updates. When we improve a system or add new prompts, you get the new version for free.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-deep-space">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-ai-teal">Support</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Frequently Asked Questions
          </p>
        </div>
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
              <AccordionTrigger className="text-white hover:text-primary text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-silver-slate">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
