'use server';

import {
  findKarakas,
  type KarakaFinderInput,
  type KarakaFinderOutput,
} from '@/ai/flows/karaka-finder';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: KarakaFinderOutput;
  issues?: string[];
};

export async function karakaFinderAction(
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
    const input: KarakaFinderInput = parsed.data;
    const result = await findKarakas(input);

    if (result) {
      return {
        message: 'Karakas found successfully.',
        result,
      };
    } else {
      return { message: 'Failed to find Karakas. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
