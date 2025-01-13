'use client';

import { useEffect, useRef, useState } from 'react';
import type { UIState } from '@/llm/actions';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatList({ messages }: { messages: UIState[number][] }) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMessageCount, setNewMessageCount] = useState(0);

  // Hàm cuộn xuống đáy
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
    if (isNearBottom) {
      setNewMessageCount(0);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const observer = new MutationObserver(() => {
      if (isAtBottom) {
        scrollToBottom('auto');
      }
    });

    observer.observe(chatContainer, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isAtBottom]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [messages, isAtBottom]);

  return (
    <div
      className="relative overflow-y-auto h-[300px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent custom-scrollbar"
      ref={chatContainerRef}
    >
      <div className="relative w-full px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full mb-2">
              {message.display}
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 right-0 transition-all duration-300 ease-in-out inline-block">
          {!isAtBottom && (
            <div className="opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="sm"
                className={cn(
                  'rounded-full shadow-lg flex items-center gap-2 pr-4 transition-transform hover:translate-y-[-2px] hover:scale-105',
                  newMessageCount > 0 && 'bg-primary text-primary-foreground'
                )}
                onClick={() => scrollToBottom('smooth')}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <ChevronDown className="h-4 w-4" />
                </span>
                {newMessageCount > 0 ? (
                  <span>
                    {newMessageCount} new message
                    {newMessageCount > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span>Scroll to bottom</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
