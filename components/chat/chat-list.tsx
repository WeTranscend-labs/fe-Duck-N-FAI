import { useEffect, useRef, useState } from 'react';
import type { UIState } from '@/llm/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatList({ messages }: { messages: UIState[number][] }) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [contentHeight, setContentHeight] = useState(300); // Chiều cao ban đầu

  // Hàm cuộn xuống đáy khi có tin nhắn mới
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
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    setIsAtBottom(isNearBottom);
    if (isNearBottom) {
      setNewMessageCount(0);
    }
  };

  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Tăng chiều cao khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0) {
      if (isAtBottom) {
        scrollToBottom('smooth');
      } else {
        setNewMessageCount((prev) => prev + 1);
      }

      // Cập nhật chiều cao container bên trong khi có tin nhắn mới
      setContentHeight((prev) => prev + 50); // Điều chỉnh giá trị tùy thuộc vào chiều cao mỗi tin nhắn
    }
  }, [messages, isAtBottom]);

  return (
    <div
      className="relative overflow-y-auto h-[300px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      ref={chatContainerRef}
    >
      {/* Container của tin nhắn */}
      <div
        className="relative w-full px-4"
        style={{ height: `${contentHeight}px` }} // Cập nhật chiều cao động
      >
        <motion.div
          initial={{ height: 300 }}
          animate={{ height: contentHeight }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-4 py-4"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full mb-2"
            >
              {message.display}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Nút Scroll to Bottom */}
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 right-8"
          >
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                'rounded-full shadow-lg flex items-center gap-2 pr-4 transition-transform hover:translate-y-[-2px]',
                newMessageCount > 0 && 'bg-primary text-primary-foreground'
              )}
              onClick={() => scrollToBottom('smooth')}
            >
              <span className="flex h-6 w-6 items-center justify-center">
                <ChevronDown className="h-4 w-4" />
              </span>
              {newMessageCount > 0 ? (
                <span>
                  {newMessageCount} new message{newMessageCount > 1 ? 's' : ''}
                </span>
              ) : (
                <span>Scroll to bottom</span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
