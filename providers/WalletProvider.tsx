'use client';

import walletConfig from '@/configs/WalletConfig';
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { ReactNode, useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { network } from '@/configs/WalletConfig';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function WalletProvider({ children }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();
  const [rainbowKitTheme, setRainbowKitTheme] = useState(
    darkTheme({
      accentColor: '#ff8800',
      accentColorForeground: 'white',
      borderRadius: 'none',
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const newTheme =
      theme === 'dark'
        ? darkTheme({
            accentColor: '#ff8800',
            accentColorForeground: 'white',
            borderRadius: 'none',
          })
        : lightTheme({
            accentColor: '#ff8800',
            accentColorForeground: 'white',
            borderRadius: 'none',
          });

    setRainbowKitTheme(newTheme);
  }, [theme]);

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={network}
          showRecentTransactions={true}
          theme={rainbowKitTheme}
          locale="en-US"
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
