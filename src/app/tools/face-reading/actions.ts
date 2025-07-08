'use server';

import {
  analyzeFace,
  type FaceReadingInput,
  type FaceReadingOutput,
} from '@/ai/flows/face-reading-flow';
import { z } from 'zod';

const formSchema = z.object({
  imageDataUri: z.string().min(1, 'An image is required.'),
});

export type FormState = {
  message: string;
  result?: FaceReadingOutput;
  issues?: string[];
};

export async function faceReadingAction(
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
    const input: FaceReadingInput = {
      photoDataUri: parsed.data.imageDataUri,
    };
    const result = await analyzeFace(input);

    if (result) {
      return {
        message: 'Face analysis complete.',
        result,
      };
    } else {
      return { message: 'Failed to analyze face. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred. Please try again later.',
    };
  }
}
