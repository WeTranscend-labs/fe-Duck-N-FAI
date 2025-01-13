'use client';

import { cn } from '@/lib/utils';
import { Sparkle, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function UserMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="group relative flex items-start justify-end md:-mr-12">
      <div className="flex-1 space-y-2 overflow-hidden px-1 max-w-[calc(100%-4rem)] ml-auto text-right">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'inline-block rounded-lg p-2 shadow-md ml-auto',
            theme === 'dark'
              ? 'bg-blue-800 text-blue-100'
              : 'bg-blue-500 text-white'
          )}
        >
          {children}
        </motion.div>
      </div>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border ml-2',
          theme === 'dark'
            ? 'border-blue-700 bg-blue-900/30 text-blue-400'
            : 'border-blue-500 bg-blue-100 text-blue-600'
        )}
      >
        <UserIcon />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 p-2">
      <motion.span
        className="h-2 w-2 rounded-full bg-current opacity-60"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-current opacity-60"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-current opacity-60"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6 }}
      />
    </div>
  );
}

export function BotMessage({
  children,
  className,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border mr-2',
          theme === 'dark'
            ? 'border-green-700 bg-green-900/30 text-green-400'
            : 'border-green-500 bg-green-100 text-green-600'
        )}
      >
        <Sparkle className="animate-pulse" />
      </motion.div>
      <div className="flex-1 space-y-2 overflow-hidden px-1 max-w-[calc(100%-4rem)] mr-auto text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={cn(
            'inline-block rounded-lg shadow-md mr-auto',
            theme === 'dark'
              ? 'bg-zinc-800 border border-zinc-700 text-zinc-200'
              : 'bg-white border border-gray-300 text-gray-800',
            isLoading ? 'min-w-[60px]' : 'p-2'
          )}
        >
          {isLoading ? <TypingIndicator /> : children}
        </motion.div>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex items-start md:-ml-12"
    >
      {showAvatar && (
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border',
            theme === 'dark'
              ? 'border-green-700 bg-green-900/30 text-green-400'
              : 'border-green-500 bg-green-100 text-green-600'
          )}
        >
          <Sparkle className="animate-pulse" />
        </div>
      )}
      <div className="flex-1 space-y-2 overflow-hidden px-1 ml-4 mr-auto">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'rounded-lg p-2 shadow-md max-w-full',
            theme === 'dark'
              ? 'bg-zinc-800 border border-zinc-700 text-zinc-200'
              : 'bg-white border border-gray-300 text-gray-800'
          )}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function AssistantMessage({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"
    >
      <div
        className={cn(
          'max-w-[600px] flex-initial px-2 py-2 rounded-lg shadow-sm',
          theme === 'dark'
            ? 'bg-zinc-800 text-zinc-300'
            : 'bg-gray-100 text-gray-600'
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
