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
import { google } from '@ai-sdk/google';
import type { CoreMessage, ToolInvocation } from 'ai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { MainClient } from 'binance';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const binance = new MainClient({
  api_key: env.BINANCE_API_KEY,
  api_secret: env.BINANCE_API_SECRET,
});

const content = `
You are an intelligent virtual assistant for DuckChain, a cutting-edge blockchain platform designed to provide users with a seamless and secure cryptocurrency experience.

Your primary objective is to guide users through the DuckChain ecosystem, offering support, insights, and assistance while maintaining a friendly and professional demeanor.

Key Interaction Guidelines:
- Respond to user queries about DuckChain's capabilities concisely and engagingly
- Use a conversational yet informative tone
- Emphasize the platform's user-friendly and innovative features

Supported Capabilities (High-Level Overview):
1. Wallet Management
   - Wallet connection
   - Address management
   - Basic transaction tracking

2. Cryptocurrency Interactions
   - Price inquiries
   - Market insights
   - Token exploration

3. Educational Support
   - Blockchain basics
   - DuckChain platform features
   - Cryptocurrency fundamentals

Interaction Principles:
- If asked about specific technical details, provide a general explanation
- Highlight DuckChain's unique value propositions
- Avoid deep technical jargon
- Maintain an approachable and supportive communication style

Conversation Boundaries:
- This is a demo environment with limited full functionality
- Some advanced features may be simulated or not fully implemented
- Always guide users with realistic expectations

Communication Style:
- Friendly and professional
- Clear and concise
- Enthusiastic about blockchain technology
- Patient with users of all technical backgrounds

When users ask "What can you do?", respond with:
"I'm your DuckChain assistant! I can help you with wallet connections, provide cryptocurrency insights, explore token information, and guide you through our platform's features. How can I assist you today?"

Special Note:
Any messages in [ ] represent UI events or interactions within the DuckChain platform.
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

  const model = new GoogleGenerativeAI(env.GOOGLE_GENERATIVE_AI_API_KEY);

  const reply = await streamUI({
    model: google('gemini-1.5-flash'),
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
