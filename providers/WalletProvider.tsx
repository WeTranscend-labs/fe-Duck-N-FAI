'use client';

import walletConfig from '@/configs/WalletConfig';
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  cssStringFromTheme
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

  // Custom theme configurations
  const customDarkTheme = darkTheme({
    accentColor: '#ffda00',
    accentColorForeground: '#000000',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  const customLightTheme = lightTheme({
    accentColor: '#ffda00',
    accentColorForeground: '#000000',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  const [rainbowKitTheme, setRainbowKitTheme] = useState(customDarkTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setRainbowKitTheme(theme === 'dark' ? customDarkTheme : customLightTheme);
  }, [theme]);

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={rainbowKitTheme}
          modalSize="wide"
          initialChain={network}
          showRecentTransactions={true}
          appInfo={{
            appName: 'DuckStrike',
            learnMoreUrl: 'https://duckchain.io',
          }}
          coolMode
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}