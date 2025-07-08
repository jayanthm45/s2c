'use server';

import {
  getZodiacCompatibility,
  type ZodiacCompatibilityInput,
  type ZodiacCompatibilityOutput,
} from '@/ai/flows/zodiac-compatibility';
import { z } from 'zod';

const formSchema = z.object({
  sign1: z.string().min(1, 'First sign is required.'),
  sign2: z.string().min(1, 'Second sign is required.'),
});

export type FormState = {
  message: string;
  result?: ZodiacCompatibilityOutput;
  inputSigns?: { sign1: string, sign2: string };
  issues?: string[];
};

export async function zodiacCompatibilityAction(
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
    if (parsed.data.sign1 === parsed.data.sign2) {
      return {
        message: 'Please select two different zodiac signs for comparison.',
      }
    }
    const input: ZodiacCompatibilityInput = parsed.data;
    const result = await getZodiacCompatibility(input);

    if (result) {
      return {
        message: 'Compatibility analysis complete.',
        result,
        inputSigns: parsed.data,
      };
    } else {
      return { message: 'Failed to analyze compatibility. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
