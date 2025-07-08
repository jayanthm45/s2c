'use server';

import {
  analyzePastLife,
  type PastLifeAnalysisInput,
  type PastLifeAnalysisOutput,
} from '@/ai/flows/past-life-analysis-flow';
import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  birthTime: z.string().min(1, 'Birth time is required.'),
  birthLocation: z.string().min(1, 'Birth location is required.'),
});

export type FormState = {
  message: string;
  result?: PastLifeAnalysisOutput;
  issues?: string[];
};

export async function pastLifeAnalysisAction(
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
    const input: PastLifeAnalysisInput = parsed.data;
    const result = await analyzePastLife(input);

    if (result) {
      return {
        message: 'Past life analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze past life. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
