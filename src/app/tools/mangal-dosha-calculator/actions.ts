'use server';

import {
  findMangalDosha,
  type MangalDoshaInput,
  type MangalDoshaOutput,
} from '@/ai/flows/mangal-dosha-calculator';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: MangalDoshaOutput;
  issues?: string[];
};

export async function mangalDoshaAction(
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
    const input: MangalDoshaInput = parsed.data;
    const result = await findMangalDosha(input);

    if (result) {
      return {
        message: 'Mangal Dosha analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze Mangal Dosha. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
