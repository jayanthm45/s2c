'use server';

import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required.'),
});

export type FormState = {
  message: string;
  psychicNumber?: number;
  vehicleSingleDigit?: number;
  isLucky?: boolean;
  luckyNumbers?: number[];
  issues?: string[];
};

// --- Helper Functions ---
const reduceToSingleDigit = (num: number): number => {
  let sum = num;
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

// Map Psychic Number to its lucky numbers
const luckyNumberMap: Record<number, number[]> = {
    1: [1, 2, 3, 9],
    2: [1, 2, 4, 7],
    3: [1, 3, 6, 9],
    4: [2, 4, 7],
    5: [5, 6],
    6: [3, 5, 6, 9],
    7: [2, 4, 7],
    8: [4, 5, 6], // 8 has complex relationships, these are considered neutral/safer
    9: [1, 3, 6, 9]
};


export async function luckyVehicleNumberAction(
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
    const { birthDate: dobString, vehicleNumber } = parsed.data;
    
    // Calculate Psychic Number
    const birthDate = new Date(dobString);
    const day = birthDate.getDate();
    const psychicNumber = reduceToSingleDigit(day);

    // Calculate Vehicle Number's single digit
    const vehicleDigits = vehicleNumber.match(/\d/g);
    if (!vehicleDigits) {
        return { message: "Vehicle number must contain digits." };
    }
    const vehicleSum = vehicleDigits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    const vehicleSingleDigit = reduceToSingleDigit(vehicleSum);
    
    // Determine if lucky
    const luckyNumbers = luckyNumberMap[psychicNumber];
    const isLucky = luckyNumbers.includes(vehicleSingleDigit);

    return {
      message: 'Calculation complete.',
      psychicNumber,
      vehicleSingleDigit,
      isLucky,
      luckyNumbers,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
