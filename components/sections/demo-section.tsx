"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, User } from "lucide-react";

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export function DemoSection() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! I can help you send crypto quickly. Try saying something like "send 0.5 ETH to Alex" or "transfer 100 USDT to 0x1234..."' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('send') || lowerInput.includes('transfer')) {
        response = "I've analyzed your request and here's what I understood:\n" +
          "✓ Action: Transfer cryptocurrency\n" +
          "✓ Amount: " + (lowerInput.match(/\d+(\.\d+)?/) || [''])[0] + "\n" +
          "✓ Currency: " + (lowerInput.match(/eth|btc|usdt/i) || [''])[0].toUpperCase() + "\n" +
          "✓ Recipient: " + (lowerInput.match(/to\s+(\w+)/i)?.[1] || 'Unknown') + "\n\n" +
          "Would you like me to prepare this transaction?";
      } else {
        response = "I'm not sure I understood that. Try saying something like 'send 0.5 ETH to Alex' or 'transfer 100 USDT to 0x1234...'";
      }

      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);

    setInput('');
  };

  return (
    <section id="demo" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Experience AI-Powered Transactions</h2>
          <p className="text-muted-foreground">
            Our advanced AI understands natural language, making crypto transfers as easy as chatting
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="p-4 shadow-xl">
            <div className="mb-4 h-[400px] overflow-y-auto space-y-4 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.type === 'user'
                      ? 'bg-blue-600'
                      : 'bg-emerald-600'
                    }`}>
                    {message.type === 'user'
                      ? <User className="h-5 w-5 text-white" />
                      : <Bot className="h-5 w-5 text-white" />
                    }
                  </div>
                  <div className={`rounded-xl p-4 max-w-[80%] ${message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted'
                    }`}>
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Try: send 0.5 ETH to Alex"
                className="rounded-xl"
              />
              <Button
                onClick={handleSend}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}