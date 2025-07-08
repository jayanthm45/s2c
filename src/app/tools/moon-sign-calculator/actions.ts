'use server';

import {
  findMoonSign,
  type MoonSignInput,
  type MoonSignOutput,
} from '@/ai/flows/moon-sign-calculator';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: MoonSignOutput;
  issues?: string[];
};

export async function moonSignAction(
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
    const input: MoonSignInput = parsed.data;
    const result = await findMoonSign(input);

    if (result) {
      return {
        message: 'Moon Sign found successfully.',
        result,
      };
    } else {
      return { message: 'Failed to find Moon Sign. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
