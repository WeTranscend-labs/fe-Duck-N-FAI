import { AI } from '@/llm/actions';

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AI>{children}</AI>;
}