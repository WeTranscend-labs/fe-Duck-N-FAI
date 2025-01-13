'use server';

import { BotCard, BotMessage } from '@/components/llm-crypto/message';
import { Price } from '@/components/llm-crypto/price';
import { PriceSkeleton } from '@/components/llm-crypto/price-skeleton';
import { Stats } from '@/components/llm-crypto/stats';
import { StatsSkeleton } from '@/components/llm-crypto/stats-skeleton';
import { AutoConnectWallet } from '@/components/llm-wallet/AutoConnectWallet';
import TokenTransferComponent from '@/components/llm-wallet/TokenTransferComponent';
import { env } from '@/env.mjs';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage, ToolInvocation } from 'ai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { MainClient } from 'binance';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { z } from 'zod';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const binance = new MainClient({
  api_key: env.BINANCE_API_KEY,
  api_secret: env.BINANCE_API_SECRET,
});

const content = `
You are an intelligent virtual assistant specializing in cryptocurrencies, designed to provide users with seamless, secure, and efficient access to information and digital asset management. 

Your role is to support users in a variety of tasks, including but not limited to exploring market insights, tracking prices, and assisting with wallet-related actions. 

When interacting with users:
- Any messages enclosed in [ ] represent a UI element or a user-triggered event. For example:
  - "[BTC price displayed: $69,000]" means the interface shows the current price of Bitcoin.
  - "[Wallet connected]" signifies that the user's wallet has been successfully linked.

When a user requests to:
- Connect their wallet, invoke \`connect_wallet\` to initiate the wallet connection modal.
- Retrieve the price of a cryptocurrency, use \`get_crypto_price\` to display the relevant information.
- Access market stats or data for a specific cryptocurrency, invoke \`get_crypto_stats\`.
- Send tokens, utilize \`send_token\` to process the transfer securely.

For any requests beyond these capabilities, politely inform the user that this is a demo and the requested action is beyond its scope.

Remember to communicate in a friendly, helpful, and professional manner at all times, ensuring the user feels valued and supported throughout their experience.
`;

export async function sendMessage(message: string): Promise<{
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
}> {
  const history = getMutableAIState<typeof AI>();

  history.update([
    ...history.get(),
    {
      role: 'user',
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'system',
        content,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done)
        history.done([...history.get(), { role: 'assistant', content }]);

      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      send_token: {
        description: 'Send a specified amount of tokens to a given address',
        parameters: z.object({
          amount: z.number().positive().describe('Amount of tokens to send'),
          toAddress: z
            .string()
            .refine((addr) => /^0x[a-fA-F0-9]{40}$/.test(addr), {
              message: 'Invalid Ethereum address',
            })
            .describe('Recipient wallet address'),
        }),
        generate: async function* (params: {
          amount: number;
          toAddress: string;
        }) {
          // Type assertion để đảm bảo địa chỉ là `0x${string}`
          const toAddress = params.toAddress as `0x${string}`;

          yield (
            <BotCard>
              <BotMessage>
                Preparing to send {params.amount} to {toAddress}...
              </BotMessage>
            </BotCard>
          );

          return (
            <BotCard>
              <TokenTransferComponent
                amount={params.amount}
                toAddress={toAddress}
              />
            </BotCard>
          );
        },
      },
      connect_wallet: {
        description: 'Trigger wallet connection interface',
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <BotCard>
              <BotMessage>
                Please connect your wallet. A connection modal will open
                shortly.
              </BotMessage>
              <div
                data-wallet-connect-trigger="true"
                className="cursor-pointer"
              >
                Click to Connect Wallet
              </div>
            </BotCard>
          );

          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'connect_wallet',
              content: `[Wallet connection triggered]`,
            },
          ]);

          return (
            <BotCard>
              <AutoConnectWallet />
            </BotCard>
          );
        },
      },
      get_crypto_price: {
        description:
          'Get the current price of a given cryptocurrency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL.'
            ),
        }),
        generate: async function* ({ symbol }: { symbol: string }) {
          yield (
            <BotCard>
              <PriceSkeleton />
            </BotCard>
          );

          const stats = await binance.get24hrChangeStatististics({
            symbol: `${symbol}USDT`,
          });
          // get the last price
          const price = Number(stats.lastPrice);
          // extract the delta
          const delta = Number(stats.priceChange);

          await sleep(1000);

          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'get_crypto_price',
              content: `[Price of ${symbol} = ${price}]`,
            },
          ]);

          return (
            <BotCard>
              <Price name={symbol} price={price} delta={delta} />
            </BotCard>
          );
        },
      },
      get_crypto_stats: {
        description:
          'Get the current stats of a given cryptocurrency. Use this to show the stats to the user.',
        parameters: z.object({
          slug: z
            .string()
            .describe(
              'The full name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana.'
            ),
        }),
        generate: async function* ({ slug }: { slug: string }) {
          yield (
            <BotCard>
              <StatsSkeleton />
            </BotCard>
          );

          const url = new URL(
            'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail'
          );

          // set the query params which are required
          url.searchParams.append('slug', slug);
          url.searchParams.append('limit', '1');
          url.searchParams.append('sortBy', 'market_cap');

          const response = await fetch(url, {
            headers: {
              // set the headers
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CMC_PRO_API_KEY': env.CMC_API_KEY,
            },
          });

          if (!response.ok) {
            return <BotMessage>Crypto not found!</BotMessage>;
          }

          const res = (await response.json()) as {
            data: {
              id: number;
              name: string;
              symbol: string;
              volume: number;
              volumeChangePercentage24h: number;
              statistics: {
                rank: number;
                totalSupply: number;
                marketCap: number;
                marketCapDominance: number;
              };
            };
          };

          const data = res.data;
          const stats = res.data.statistics;

          const marketStats = {
            name: data.name,
            volume: data.volume,
            volumeChangePercentage24h: data.volumeChangePercentage24h,
            rank: stats.rank,
            marketCap: stats.marketCap,
            totalSupply: stats.totalSupply,
            dominance: stats.marketCapDominance,
          };

          await sleep(1000);

          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'get_crypto_price',
              content: `[Stats of ${data.symbol}]`,
            },
          ]);

          return (
            <BotCard>
              <Stats {...marketStats} />
            </BotCard>
          );
        },
      },
    },
    temperature: 0,
  });

  return {
    id: Date.now(),
    role: 'assistant' as const,
    display: reply.value,
  };
}
// Define the AI state and UI state types
export type AIState = Array<{
  id?: number;
  name?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});
