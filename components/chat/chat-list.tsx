"use client";

import { useEffect, useRef, useState } from 'react';
import type { UIState } from '@/llm/actions';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatList({ messages }: { messages: UIState[number][] }) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMessageCount, setNewMessageCount] = useState(0);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior,
      });
      setNewMessageCount(0);
    }
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(isNearBottom);
    if (isNearBottom) setNewMessageCount(0);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const observer = new MutationObserver(() => {
      if (isAtBottom) scrollToBottom('auto');
    });

    observer.observe(chatContainer, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isAtBottom]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !isAtBottom) {
      setNewMessageCount((prev) => prev + 1);
    }
  }, [messages.length, isAtBottom]);

  return (
    <div className="relative h-full">
      {messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-sm mx-auto px-4">
            <div className="bg-primary/10 p-3 rounded-xl inline-flex mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Welcome to DuckChain AI</h3>
            <p className="text-sm text-muted-foreground">
              Ask me anything about DuckChain transactions, wallet management, or crypto operations.
            </p>
          </div>
        </div>
      )}

      <div
        ref={chatContainerRef}
        className="h-full overflow-y-auto px-4 md:px-0"
      >
        <div className="px-6 mx-auto space-y-2 py-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative transition-all duration-200 hover:translate-x-0.5 break-words"
              >
                {message.display}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 transition-all duration-300"
          >
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                'h-8 text-xs rounded-full shadow-lg flex items-center gap-1.5 px-3 transition-all duration-200 hover:translate-y-[-1px]',
                newMessageCount > 0 && 'bg-primary text-primary-foreground'
              )}
              onClick={() => scrollToBottom('smooth')}
            >
              <ChevronDown className="h-3.5 w-3.5" />
              {newMessageCount > 0 ? (
                <span>
                  {newMessageCount} new{newMessageCount > 1 ? ' messages' : ' message'}
                </span>
              ) : (
                <span>Bottom</span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}