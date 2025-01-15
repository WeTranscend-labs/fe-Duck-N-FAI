import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { defineChain } from 'viem';
import { http } from 'wagmi';

const DuckChain = defineChain({
  id: 202105,
  name: 'DuckChain Testnet',
  nativeCurrency: {
    name: 'Dev',
    symbol: 'TON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.duckchain.io'],
    },
  },
  testnet: true,
});

const { wallets } = getDefaultWallets();

const walletConfig = getDefaultConfig({
  appName: 'DuckAI',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [DuckChain],
  transports: {
    [DuckChain.id]: http(),
  },
  ssr: true,
});

export default walletConfig;
export { DuckChain as network };
