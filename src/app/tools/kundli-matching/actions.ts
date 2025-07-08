'use server';

import {
  calculateKundliMatch,
  type KundliMatchingInput,
  type KundliMatchingOutput,
} from '@/ai/flows/kundli-matching';
import { z } from 'zod';

const formSchema = z.object({
  boyName: z.string().min(1, "Boy's name is required."),
  boyBirthDate: z.string().min(1, "Boy's birth date is required."),
  boyBirthTime: z.string().min(1, "Boy's birth time is required."),
  boyBirthLocation: z.string().min(1, "Boy's birth location is required."),
  girlName: z.string().min(1, "Girl's name is required."),
  girlBirthDate: z.string().min(1, "Girl's birth date is required."),
  girlBirthTime: z.string().min(1, "Girl's birth time is required."),
  girlBirthLocation: z.string().min(1, "Girl's birth location is required."),
});

export type FormState = {
  message: string;
  result?: KundliMatchingOutput;
  issues?: string[];
};

export async function kundliMatchingAction(
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
    const input: KundliMatchingInput = {
      boy: {
        name: parsed.data.boyName,
        birthDate: parsed.data.boyBirthDate,
        birthTime: parsed.data.boyBirthTime,
        birthLocation: parsed.data.boyBirthLocation,
      },
      girl: {
        name: parsed.data.girlName,
        birthDate: parsed.data.girlBirthDate,
        birthTime: parsed.data.girlBirthTime,
        birthLocation: parsed.data.girlBirthLocation,
      },
    };
    
    const result = await calculateKundliMatch(input);

    if (result) {
      return {
        message: 'Kundli match analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze the match. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
