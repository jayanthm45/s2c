'use server';

import { z } from 'zod';

// --- Helper Functions ---

const reduceToSingleDigit = (num: number): number => {
  let sum = num;
  // Master numbers 11, 22, 33 are not reduced
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

const nameToNumberMap: { [key: string]: number } = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};


// --- Name Number Calculator ---
const nameSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
});

export type NameNumberFormState = {
  message: string;
  nameNumber?: number;
  name?: string;
  issues?: string[];
};

export async function calculateNameNumberAction(
  prevState: NameNumberFormState,
  data: FormData
): Promise<NameNumberFormState> {
  const formData = Object.fromEntries(data);
  const parsed = nameSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: 'Invalid form data', issues: parsed.error.issues.map(i => i.message) };
  }

  try {
    const { name } = parsed.data;
    const lowerCaseName = name.toLowerCase();
    let sum = 0;
    for (const char of lowerCaseName) {
      if (nameToNumberMap[char]) {
        sum += nameToNumberMap[char];
      }
    }
    
    const nameNumber = reduceToSingleDigit(sum);

    return {
      message: 'Name Number calculated successfully.',
      nameNumber,
      name,
    };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.' };
  }
}

// --- Destiny & Psychic Number Calculator ---
const dobSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
});

// Destiny Number
export type DestinyNumberFormState = {
  message: string;
  destinyNumber?: number;
  issues?: string[];
};

export async function calculateDestinyNumberAction(
  prevState: DestinyNumberFormState,
  data: FormData
): Promise<DestinyNumberFormState> {
  const formData = Object.fromEntries(data);
  const parsed = dobSchema.safeParse(formData);

  if (!parsed.success) {
      return { message: 'Invalid form data', issues: parsed.error.issues.map(i => i.message) };
  }

  try {
    const birthDate = new Date(parsed.data.birthDate);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const fullDateString = `${day}${month}${year}`;
    const sum = fullDateString.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    const destinyNumber = reduceToSingleDigit(sum);

    return {
      message: 'Destiny Number calculated successfully.',
      destinyNumber,
    };
  } catch (error) {
      console.error(error);
      return { message: 'An unexpected error occurred.' };
  }
}


// Psychic Number (Moolank)
export type PsychicNumberFormState = {
  message: string;
  psychicNumber?: number;
  issues?: string[];
};

export async function calculatePsychicNumberAction(
  prevState: PsychicNumberFormState,
  data: FormData
): Promise<PsychicNumberFormState> {
  const formData = Object.fromEntries(data);
  const parsed = dobSchema.safeParse(formData);

  if (!parsed.success) {
      return { message: 'Invalid form data', issues: parsed.error.issues.map(i => i.message) };
  }

  try {
    const birthDate = new Date(parsed.data.birthDate);
    const day = birthDate.getDate();
    const psychicNumber = reduceToSingleDigit(day);

    return {
      message: 'Psychic Number calculated successfully.',
      psychicNumber,
    };
  } catch (error) {
      console.error(error);
      return { message: 'An unexpected error occurred.' };
  }
}
