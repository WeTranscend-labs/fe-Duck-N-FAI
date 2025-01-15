'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { SectionHighlight } from '@/components/ui/section-highlight';
import { MessageSquare } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Duck’N’FAI's AI assistant makes crypto simple. I've never had such smooth transactions before.",
    name: 'Lu1is Dev',
    title: 'Web3 Advocate',
  },
  {
    quote:
      'From speed to security, DuckChain is way ahead. A true game-changer in the blockchain space.',
    name: 'Tommy',
    title: 'Crypto Enthusiast',
  },
  {
    quote:
      "I'm impressed with the flexibility of Duck’N’FAI. It’s perfect for developers and traders alike.",
    name: 'ThuanFu',
    title: 'Tech Innovator',
  },
  {
    quote:
      'The AI integration with cross-chain support makes everything seamless. I love using Duck’N’FAI!',
    name: 'Kenny',
    title: 'Blockchain Consultant',
  },
  {
    quote:
      'Duck’N’FAI’s infrastructure gives me confidence to manage my investments. It’s incredibly reliable.',
    name: 'Amy Lee',
    title: 'FinTech Specialist',
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4" />
            Testimonials
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied users who trust Duck’N’FAI for their
            crypto transactions.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
          <InfiniteMovingCards
            items={[...testimonials].reverse()}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
