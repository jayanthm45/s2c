'use server';

import {
  generateGeneralHoroscope,
  type GeneralHoroscopeInput,
} from '@/ai/flows/general-horoscope';
import { z } from 'zod';

const actionSchema = z.object({
  sign: z.string(),
  period: z.string(),
  type: z.string(),
});

export async function getGeneralHoroscope(input: GeneralHoroscopeInput): Promise<{
  horoscope?: string;
  message?: string;
}> {
  const parsed = actionSchema.safeParse(input);

  if (!parsed.success) {
    return { message: 'Invalid input.' };
  }

  try {
    const result = await generateGeneralHoroscope(parsed.data);
    if (result.horoscope) {
      return { horoscope: result.horoscope };
    } else {
      return { message: 'Failed to generate horoscope. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
