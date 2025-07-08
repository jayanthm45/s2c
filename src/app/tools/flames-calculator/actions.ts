'use server';

import { z } from 'zod';

const namesSchema = z.object({
  name1: z.string().min(1, 'First name is required.'),
  name2: z.string().min(1, 'Second name is required.'),
});

const flamesResultMap = {
    F: 'Friendship',
    L: 'Love',
    A: 'Affection',
    M: 'Marriage',
    E: 'Enemy',
    S: 'Siblings',
} as const;
type FlamesResult = typeof flamesResultMap[keyof typeof flamesResultMap];

export type FlamesFormState = {
  message: string;
  result?: FlamesResult;
  names?: { name1: string, name2: string };
  issues?: string[];
};

const calculateFlames = (name1: string, name2: string): FlamesResult | null => {
  let name1Arr = name1.toLowerCase().replace(/ /g, '').split('');
  let name2Arr = name2.toLowerCase().replace(/ /g, '').split('');

  for (let i = 0; i < name1Arr.length; i++) {
    const char = name1Arr[i];
    const indexInName2 = name2Arr.indexOf(char);
    if (indexInName2 !== -1) {
      name1Arr.splice(i, 1);
      name2Arr.splice(indexInName2, 1);
      i--;
    }
  }

  const count = name1Arr.length + name2Arr.length;
  if (count === 0) return null;
  
  const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
  let startIndex = 0;
  
  while (flames.length > 1) {
    const removeIndex = (startIndex + count - 1) % flames.length;
    flames.splice(removeIndex, 1);
    startIndex = removeIndex;
    if (startIndex >= flames.length) {
      startIndex = 0;
    }
  }

  return flamesResultMap[flames[0] as keyof typeof flamesResultMap];
}

export async function flamesAction(
  prevState: FlamesFormState,
  data: FormData
): Promise<FlamesFormState> {
  const formData = Object.fromEntries(data);
  const parsed = namesSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return { message: 'Invalid form data', issues };
  }

  try {
    const { name1, name2 } = parsed.data;
    const result = calculateFlames(name1, name2);

    if (!result) {
        return { message: "Could not calculate FLAMES. Try different names." };
    }

    return {
      message: 'FLAMES calculated successfully.',
      result,
      names: { name1, name2 }
    };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.' };
  }
}
