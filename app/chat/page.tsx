'use client';

import { UserMessage } from '@/components/llm-crypto/message';
import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/hooks/use-enter-submit';
import { useForm } from '@/hooks/use-form';
import type { ChatInputs } from '@/lib/schemas/chat-schema';
import type { AI } from '@/llm/actions';
import { useActions, useUIState } from 'ai/rsc';
import {
  PlusIcon,
  SendIcon,
  Sparkles,
  Home,
  ArrowRight,
  Lightbulb,
  Keyboard,
  Wallet,
  LineChart,
  History,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatList } from '@/components/chat/chat-list';
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor';
import { useRouter } from 'next/navigation';
import Logo from '@/components/common/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const PROMPT_EXAMPLES = [
  {
    category: 'Wallet Operations',
    icon: <Wallet className="h-4 w-4 text-primary" />,
    examples: [
      'Connect my wallet',
      'Send 1 DUCK to 0x...',
      'Check my wallet balance',
    ],
  },
  {
    category: 'Market Data',
    icon: <LineChart className="h-4 w-4 text-primary" />,
    examples: [
      'What is the price of BTC?',
      'Show DUCK market stats',
      'Compare DUCK and BTC prices',
    ],
  },
  {
    category: 'Transaction History',
    icon: <History className="h-4 w-4 text-primary" />,
    examples: [
      'Show my recent transactions',
      'Find transactions with address 0x...',
      'Export transaction history',
    ],
  },
  {
    category: 'Help & Support',
    icon: <HelpCircle className="h-4 w-4 text-primary" />,
    examples: [
      'How do I stake DUCK?',
      'Explain gas fees',
      'What are the network fees?',
    ],
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [chatKey, setChatKey] = useState(Date.now());
  const form = useForm<ChatInputs>();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)
      ) {
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

  const sidebarItems = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'New Chat',
      onClick: handleNewChat,
    },
    {
      icon: <History className="h-5 w-5" />,
      label: 'History',
      onClick: () => {},
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      onClick: () => {},
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: 'Help',
      onClick: () => {},
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 text-xl font-bold">
          <div
            className={cn(
              'h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center',
              !sidebarOpen && !isHovering && 'ml-[-12.5px]'
            )}
          >
            <Logo className="h-6 w-6" />
          </div>
          <span
            className={cn(
              'transition-opacity duration-200',
              !sidebarOpen && !isHovering && 'opacity-0'
            )}
          >
            DuckStrike AI
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Prompt Categories */}
        {PROMPT_EXAMPLES.map((category, idx) => (
          <div key={idx} className="space-y-3">
            <div
              className={cn(
                'flex items-center gap-2',
                !sidebarOpen && !isHovering && 'justify-center'
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {category.icon}
              </div>
              <span
                className={cn(
                  'text-sm font-medium transition-opacity duration-200',
                  !sidebarOpen && !isHovering && 'opacity-0 w-0'
                )}
              >
                {category.category}
              </span>
            </div>
            {(sidebarOpen || isHovering) && (
              <div className="grid gap-2 pl-10">
                {category.examples.map((example, index) => (
                  <div
                    key={index}
                    className="inline-flex w-full items-center gap-2 text-sm bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => {
                      form.setValue('message', example);
                      inputRef.current?.focus();
                    }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    {example}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Keyboard Shortcuts - Only show when expanded */}
        {(sidebarOpen || isHovering) && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Keyboard className="h-4 w-4" />
              Keyboard Shortcuts
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Focus chat input</span>
                <kbd className="px-2 py-0.5 text-xs bg-muted rounded-md">/</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Send message</span>
                <kbd className="px-2 py-0.5 text-xs bg-muted rounded-md">
                  ⌘ + ↵
                </kbd>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex h-full bg-muted/30 border-r flex-col relative group"
        animate={{
          width: sidebarOpen || isHovering ? '300px' : '60px',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          <SidebarContent />
        </div>
        {/* <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute right-2 top-4 p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </button> */}
      </motion.div>

      {/* Mobile Header */}
      <div className="h-16 md:hidden flex items-center justify-between px-4 border-b bg-background/95 backdrop-blur fixed top-0 left-0 right-0 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={() => router.push('/')}
        >
          <Home className=" h-5 w-5 text-primary" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Logo className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">DuckStrike AI</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-background z-50 md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Logo className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">DuckStrike AI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full md:h-screen">
        {/* Desktop Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
          <div className="container flex h-16 items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              onClick={() => router.push('/')}
            >
              <Home className="ml-5 h-5 w-5 text-primary" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Logo className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  DuckStrike AI Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your intelligent crypto companion
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto mr-5 h-9 hover:bg-primary/10 rounded-lg text-xs gap-2 border-primary/20 hover:border-primary/30"
              onClick={handleNewChat}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline ">New Chat</span>
            </Button>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden mt-16 md:mt-0">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div key={chatKey} className="relative h-full">
                <ChatList messages={messages} />
                <ChatScrollAnchor trackVisibility={true} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container py-4">
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(submitHandler)}
                  className="relative flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto"
                >
                  <TextareaAutosize
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
