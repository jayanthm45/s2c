'use server';

import {
  calculateSadeSati,
  type SadeSatiInput,
  type SadeSatiOutput,
} from '@/ai/flows/sade-sati-calculator';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: SadeSatiOutput;
  issues?: string[];
};

export async function sadeSatiAction(
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
    const input: SadeSatiInput = parsed.data;
    const result = await calculateSadeSati(input);

    if (result) {
      return {
        message: 'Sade Sati analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze Sade Sati. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
