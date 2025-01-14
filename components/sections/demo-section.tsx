"use client";

import { UserMessage } from '@/components/llm-crypto/message';
import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/hooks/use-enter-submit';
import { useForm } from '@/hooks/use-form';
import type { ChatInputs } from '@/lib/schemas/chat-schema';
import type { AI } from '@/llm/actions';
import { useActions, useUIState } from 'ai/rsc';
import { ArrowDownIcon, PlusIcon, SendIcon, RefreshCwIcon, Sparkles, MessageSquare, Zap, Shield, Bot, ArrowRight, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatList } from '../chat/chat-list';
import { ChatScrollAnchor } from '../chat/chat-scroll-anchor';
import { Card } from '@/components/ui/card';

export function DemoSection() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [chatKey, setChatKey] = useState(Date.now());
  const form = useForm<ChatInputs>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)) {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputRef]);

  const submitHandler: SubmitHandler<ChatInputs> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: 'user',
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      const responseMessage = await sendMessage(value);
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewChat = () => {
    setChatKey(Date.now());
    setMessages([]);
  };

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(255,218,0,0.15)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
            <Rocket className="h-4 w-4" />
            Live Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Experience DuckChain AI
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Try our AI assistant now and discover how it can revolutionize your crypto transactions
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left Side - Description */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 text-xl sm:text-2xl font-bold">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                Try It Yourself
              </div>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Our AI understands natural language and can help you with everything from simple transactions to complex DuckChain operations.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 text-sm bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  "Send 1 DUCK to wallet"
                </div>
                <div className="inline-flex items-center gap-2 text-sm bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  "Check my balance"
                </div>
                <div className="inline-flex items-center gap-2 text-sm bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  "Show transaction history"
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Card className="p-4 hover:shadow-md transition-all hover:scale-[1.01] bg-gradient-to-br from-background to-muted/30 border-primary/10">
                <div className="flex gap-3">
                  <div className="bg-primary/15 p-2.5 rounded-lg h-fit shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Natural Language Processing</h3>
                    <p className="text-muted-foreground text-sm">
                      Communicate with our AI in plain English. No need to learn complex commands or syntax.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all hover:scale-[1.01] bg-gradient-to-br from-background to-muted/30 border-primary/10">
                <div className="flex gap-3">
                  <div className="bg-primary/15 p-2.5 rounded-lg h-fit shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Instant Responses</h3>
                    <p className="text-muted-foreground text-sm">
                      Get immediate answers to your questions about DuckChain transactions and features.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all hover:scale-[1.01] bg-gradient-to-br from-background to-muted/30 border-primary/10">
                <div className="flex gap-3">
                  <div className="bg-primary/15 p-2.5 rounded-lg h-fit shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Secure Interactions</h3>
                    <p className="text-muted-foreground text-sm">
                      All conversations are protected with enterprise-grade security and encryption.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="h-[600px] lg:h-[700px] order-1 lg:order-2">
            <Card className="rounded-2xl shadow-2xl border border-primary/20 bg-background/95 backdrop-blur overflow-hidden h-full hover:shadow-primary/5 transition-all duration-500">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/15 p-2.5 rounded-xl">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">DuckChain AI Assistant</h3>
                      <p className="text-xs text-muted-foreground">Powered by advanced AI</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 hover:bg-primary/10 rounded-lg text-xs gap-2 border-primary/20 hover:border-primary/30"
                    onClick={handleNewChat}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">New Chat</span>
                  </Button>
                </div>

                {/* Chat Area */}
                <div key={chatKey} className="flex-1 overflow-hidden">
                  <div className="h-full relative">
                    <ChatList messages={messages} />
                    <ChatScrollAnchor trackVisibility={true} />
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t p-3 sm:p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                  <form ref={formRef} onSubmit={form.handleSubmit(submitHandler)}>
                    <div className="relative flex items-center gap-2 sm:gap-3">
                      <TextareaAutosize
                        ref={inputRef}
                        tabIndex={0}
                        onKeyDown={onKeyDown}
                        placeholder="Message DuckChain AI..."
                        className="min-h-[48px] w-full resize-none rounded-xl bg-background/80 px-3 sm:px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 border border-primary/20 placeholder:text-muted-foreground/70"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        rows={1}
                        maxRows={4}
                        {...form.register('message')}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={form.watch('message') === ''}
                        className="h-10 w-10 shrink-0 rounded-xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-50 transition-all hover:scale-105 disabled:hover:scale-100"
                      >
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}