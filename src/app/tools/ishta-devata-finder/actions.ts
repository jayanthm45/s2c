'use server';

import {
  findIshtaDevata,
  type IshtaDevataInput,
  type IshtaDevataOutput,
} from '@/ai/flows/ishta-devata-finder';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: IshtaDevataOutput;
  issues?: string[];
};

export async function ishtaDevataAction(
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
    const input: IshtaDevataInput = parsed.data;
    const result = await findIshtaDevata(input);

    if (result) {
      return {
        message: 'Ishta Devata found successfully.',
        result,
      };
    } else {
      return { message: 'Failed to find Ishta Devata. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
