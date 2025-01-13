import type { UIState } from '@/llm/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ChatList({ messages }: { messages: UIState[number][] }) {
  return (
    <div className="relative mx-auto max-w-2xl px-4 h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
      <div className="space-y-6 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 w-full',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={
                  message.role === 'user'
                    ? '/placeholder-user.png'
                    : '/placeholder-ai.png'
                }
                alt={message.role}
              />
              <AvatarFallback>
                {message.role === 'user' ? 'U' : 'AI'}
              </AvatarFallback>
            </Avatar>

            <Card
              className={cn(
                'w-full max-w-[80%]',
                message.role === 'user'
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-white border'
              )}
            >
              <CardContent className="p-4">{message.display}</CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
