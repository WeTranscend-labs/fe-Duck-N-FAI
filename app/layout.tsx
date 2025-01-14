import { ThemeProvider } from '@/components/theme-provider';
import { AI } from '@/llm/actions';
import WalletProvider from '@/providers/WalletProvider';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DuckStrike - Smart Crypto Transaction Extension',
  description:
    'Manage your crypto transactions with ease using DuckStrike Chrome extension',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AI>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <WalletProvider>{children}</WalletProvider>
            </TooltipProvider>
          </ThemeProvider>
        </AI>
      </body>
    </html>
  );
}
