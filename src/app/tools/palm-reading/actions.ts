'use server';

import {
  analyzePalm,
  type PalmReadingInput,
  type PalmReadingOutput,
} from '@/ai/flows/palm-reading-flow';
import { z } from 'zod';

const formSchema = z.object({
  imageDataUri: z.string().min(1, 'An image is required.'),
});

export type FormState = {
  message: string;
  result?: PalmReadingOutput;
  issues?: string[];
};

export async function palmReadingAction(
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
    const input: PalmReadingInput = {
      photoDataUri: parsed.data.imageDataUri,
    };
    const result = await analyzePalm(input);

    if (result) {
      return {
        message: 'Palm analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze palm. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
