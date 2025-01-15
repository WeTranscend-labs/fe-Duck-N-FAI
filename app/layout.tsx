import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AI } from '@/llm/actions';
import WalletProvider from '@/providers/WalletProvider';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import '@rainbow-me/rainbowkit/styles.css';
import logo from '@/public/imgs/logo.webp';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'DuckStrike - Smart Crypto Transaction Extension',
  description:
    'Manage your crypto transactions with ease using DuckStrike Chrome extension',
  icons: {
    icon: '/images/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
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
