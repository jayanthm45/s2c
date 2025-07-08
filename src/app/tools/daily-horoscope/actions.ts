'use server';

import {
  generateDailyHoroscope,
  type DailyHoroscopeInput,
} from '@/ai/flows/daily-horoscope';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  horoscope?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function getHoroscopeAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data',
      issues,
    };
  }

  try {
    const horoscopeInput: DailyHoroscopeInput = parsed.data;
    const result = await generateDailyHoroscope(horoscopeInput);

    if (result.horoscope) {
      return {
        message: 'Horoscope generated successfully.',
        horoscope: result.horoscope,
      };
    } else {
      return { message: 'Failed to generate horoscope. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
