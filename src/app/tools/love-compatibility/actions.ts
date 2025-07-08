'use server';

import { z } from 'zod';

// --- Base Schema ---
const namesSchema = z.object({
  name1: z.string().min(1, 'First name is required.'),
  name2: z.string().min(1, 'Second name is required.'),
});


// --- Love Compatibility ---

export type LoveFormState = {
  message: string;
  score?: number;
  names?: { name1: string, name2: string };
  issues?: string[];
};

const calculateLoveScore = (name1: string, name2: string): number => {
    const combined = (name1 + 'loves' + name2).toLowerCase();
    const counts: { [key: string]: number } = {};

    for (const char of combined) {
        if (char >= 'a' && char <= 'z') {
            counts[char] = (counts[char] || 0) + 1;
        }
    }
    
    let numberString = '';
    for (const char of 'loves') {
        numberString += counts[char] || 0;
    }

    while (numberString.length > 2) {
        let nextNumberString = '';
        let left = 0;
        let right = numberString.length - 1;

        while(left <= right) {
            if (left === right) {
                nextNumberString += numberString[left];
                break;
            }
            const sum = parseInt(numberString[left], 10) + parseInt(numberString[right], 10);
            nextNumberString += sum.toString();
            left++;
            right--;
        }
        numberString = nextNumberString;
    }
    
    let finalScore = parseInt(numberString, 10);

    // Ensure score is not too low, make it feel more "fun"
    if(finalScore < 40) {
        finalScore = finalScore + 40;
    }
    if (finalScore > 100) {
        finalScore = 100 - (finalScore % 10);
    }

    return finalScore;
}


export async function loveCompatibilityAction(
  prevState: LoveFormState,
  data: FormData
): Promise<LoveFormState> {
  const formData = Object.fromEntries(data);
  const parsed = namesSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data',
      issues,
    };
  }

  try {
    const { name1, name2 } = parsed.data;
    const score = calculateLoveScore(name1, name2);

    return {
      message: 'Score calculated successfully.',
      score,
      names: { name1, name2 }
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
