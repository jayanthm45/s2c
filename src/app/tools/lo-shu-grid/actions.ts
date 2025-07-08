'use server';

import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
});

// The structure of the Lo Shu Grid
const loShuGridCells = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export type FormState = {
  message: string;
  grid?: (string)[][];
  psychicNumber?: number;
  destinyNumber?: number;
  missingNumbers?: number[];
  issues?: string[];
};

// Helper function to sum digits until a single digit is left
const reduceToSingleDigit = (num: number): number => {
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22) { // Master numbers are not reduced
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};


export async function loShuGridAction(
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
    const birthDate = new Date(parsed.data.birthDate);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const dobDigitsString = `${day}${month}${year}`;
    const dobDigits = dobDigitsString.replace(/0/g, '').split('').map(Number);

    // Calculate Psychic Number (Mulank)
    const psychicNumber = reduceToSingleDigit(day);

    // Calculate Destiny Number
    const destinyNumber = reduceToSingleDigit(
      dobDigitsString.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0)
    );
    
    // Count occurrences of each number (1-9) in the date of birth
    const numberCounts: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
    
    dobDigits.forEach(digit => {
        if (digit > 0 && digit <= 9) {
            numberCounts[digit]++;
        }
    });

    // Create the grid for display
    const grid = loShuGridCells.map(row => 
        row.map(cellNumber => {
            const count = numberCounts[cellNumber];
            return count > 0 ? `${cellNumber}`.repeat(count) : '';
        })
    );

    // Find missing numbers
    const missingNumbers = Object.entries(numberCounts)
        .filter(([, count]) => count === 0)
        .map(([num]) => parseInt(num));


    return {
      message: 'Lo Shu Grid calculated successfully.',
      grid,
      psychicNumber,
      destinyNumber,
      missingNumbers,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
