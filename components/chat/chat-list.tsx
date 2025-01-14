"use client";

import { useEffect, useRef, useState } from 'react';
import type { UIState } from '@/llm/actions';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div
        ref={chatContainerRef}
        className="h-full overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="relative transition-all duration-200 hover:translate-x-0.5 break-words"
          >
            {message.display}
          </div>
        ))}
      </div>

      {!isAtBottom && (
        <div className="absolute bottom-3 right-3 transition-all duration-300">
          <Button
            variant="secondary"
            size="sm"
            className={cn(
              'h-7 text-xs rounded-full shadow-lg flex items-center gap-1.5 px-2 transition-all duration-200 hover:translate-y-[-1px]',
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
        </div>
      )}
    </div>
  );
}