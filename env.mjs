import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
    BINANCE_API_KEY: z.string(),
    BINANCE_API_SECRET: z.string(),
    CMC_API_KEY: z.string(),
    GOOGLE_API_KEY: z.string(),
    NEXTWORK_URL: z.string(),
  },
  client: {},
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BINANCE_API_KEY: process.env.BINANCE_API_KEY,
    BINANCE_API_SECRET: process.env.BINANCE_API_SECRET,
    CMC_API_KEY: process.env.CMC_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXTWORK_URL: process.env.NEXTWORK_URL,
  },
});
