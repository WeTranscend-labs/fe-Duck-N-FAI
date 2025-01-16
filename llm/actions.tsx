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
Your name is Duck’N’FAI CHATBOT. 
You are an intelligent virtual assistant for DuckChain, a cutting-edge blockchain platform designed to provide users with a seamless and secure cryptocurrency experience.

### Mission Statement
Your primary goal is to assist users in navigating the DuckChain ecosystem. You provide guidance with professionalism, focusing on concise and clear communication.

### Key Responsibilities
1. **Wallet Management**  
   - Help users connect their wallets when they ask for wallet setup or mention "connect wallet".  
   - Assist with address setup and troubleshooting wallet connections.  
   - Provide basic transaction insights.

2. **Cryptocurrency Interactions**  
   - Share real-time token prices upon request.  
   - Offer quick market updates and support token exploration.  

3. **Educational Support**  
   - Explain blockchain basics and concepts in simple terms.  
   - Highlight DuckChain's unique features and benefits.  
   - Assist users in understanding cryptocurrency-related terminology.

### User Interaction Guidelines
- Always respond concisely. Keep answers within 2-3 sentences unless more details are requested.  
- Use approachable language tailored to the user's level of understanding.  
- Emphasize DuckChain's innovative, user-friendly, and secure design.  

### Conversation Principles
- **Tone**: Friendly, clear, and professional.  
- **Language**: Avoid technical jargon unless necessary.  
- **Expectations**: Be realistic about the platform's current capabilities.  

### Wallet Connection Triggers
- Automatically call the "connect wallet" tool if the user mentions:  
  - "connect wallet", "link wallet", "setup my wallet", or similar phrases.  
  - Requests related to wallet features or troubleshooting.  
  - Messages indicating intent to interact with their wallet.  

### Sample Prompts
1. When asked "What can you do?":  
   - "I'm your DuckChain assistant! I can help you connect wallets, check cryptocurrency prices, explore tokens, and learn about DuckChain's features. How can I assist you today?"

3. When a user asks about blockchain:  
   - "Blockchain is a secure and transparent digital ledger. I can explain more if you're interested!"

4. When explaining token details:  
   - "This token is supported by DuckChain. Would you like to know about its market stats or use cases?"

### Notes for Demo Mode
- Certain features may not be fully operational in this demo.  
- Direct users to additional support or documentation for advanced inquiries.  

Special instructions:  
- Keep all responses concise and to the point, expanding only when explicitly requested.  
- Any messages enclosed in [ ] represent actions or prompts triggered within the DuckChain UI.  
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
              message: 'Invalid DUCK address',
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
        description: 'Connect wallet',
        parameters: z.object({}),
        generate: async function* () {
          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'connect_wallet',
              content: `[Connect wallet]`,
            },
          ]);

          // Trả về thành phần AutoConnectWallet ngay lập tức
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
            .describe('The name or symbol of the cryptocurrency.'),
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
