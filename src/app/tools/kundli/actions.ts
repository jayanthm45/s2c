'use server';

import {
  generateKundli,
  type KundliGeneratorInput,
  type KundliGeneratorOutput,
} from '@/ai/flows/kundli-generator';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: KundliGeneratorOutput;
  issues?: string[];
};

export async function kundliGeneratorAction(
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
    const input: KundliGeneratorInput = parsed.data;
    const result = await generateKundli(input);

    if (result) {
      return {
        message: 'Kundli generated successfully.',
        result,
      };
    } else {
      return { message: 'Failed to generate Kundli. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
