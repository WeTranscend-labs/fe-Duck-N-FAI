'use client';

import { UserMessage } from '@/components/llm-crypto/message';
import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/hooks/use-enter-submit';
import { useForm } from '@/hooks/use-form';
import type { ChatInputs } from '@/lib/schemas/chat-schema';
import type { AI } from '@/llm/actions';
import { useActions, useUIState } from 'ai/rsc';
import { ArrowDownIcon, PlusIcon, SendIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatList } from '../chat/chat-list';
import { ChatScrollAnchor } from '../chat/chat-scroll-anchor';

export function DemoSection() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<ChatInputs>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (
          e.target &&
          ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);

  const submitHandler: SubmitHandler<ChatInputs> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    // Add user message UI
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: 'user',
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      // Submit and get response message
      const responseMessage = await sendMessage(value);
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      // You may want to show a toast or trigger an error state.
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="pt-4 pb-20">
        <div className="mx-auto px-4">
          <ChatList messages={messages} />
          <ChatScrollAnchor trackVisibility={true} />
        </div>
      </div>

      <div className="w-full bg-gradient-to-t from-background via-background/90 to-background/50 pb-3 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4">
          <div className="relative rounded-xl border bg-card/50 p-2 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
            <form ref={formRef} onSubmit={form.handleSubmit(submitHandler)}>
              <div className="relative flex items-center gap-2">
                <TextareaAutosize
                  // ref={inputRef}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message... (Press / to focus)"
                  className="min-h-[48px] w-full resize-none rounded-lg bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 dark:bg-muted/50"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  {...form.register('message')}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={form.watch('message') === ''}
                    className="h-8 w-8 shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50"
                  >
                    <SendIcon className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-lg hover:bg-muted/50"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">New Chat</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
