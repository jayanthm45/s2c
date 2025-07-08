'use server';

import { z } from 'zod';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, differenceInCalendarDays, format } from 'date-fns';


const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
});

type Age = {
    years: number;
    months: number;
    days: number;
}

type NextBirthday = {
    date: string;
    daysUntil: number;
}

export type FormState = {
  message: string;
  age?: Age;
  nextBirthday?: NextBirthday;
  issues?: string[];
};

export async function ageCalculatorAction(
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
    const today = new Date();

    if (birthDate > today) {
        return { message: 'Birth date cannot be in the future.' };
    }
    
    let years = differenceInYears(today, birthDate);
    let months = differenceInMonths(today, birthDate) % 12;
    
    // Adjust days calculation
    let tempDateForDays = addYears(birthDate, years);
    if (differenceInMonths(today, tempDateForDays) > months) {
       // This condition might not be perfect, let's refine
    }
    
    // A more reliable way to calculate remaining months and days
    let monthCalcDate = addYears(birthDate, years);
    if(monthCalcDate > today) {
        years--;
        monthCalcDate = addYears(birthDate, years);
    }
    months = differenceInMonths(today, monthCalcDate);
    
    let dayCalcDate = addYears(birthDate, years);
    dayCalcDate = new Date(dayCalcDate.setMonth(dayCalcDate.getMonth() + months));
    
    let days = differenceInDays(today, dayCalcDate);

    // Find next birthday
    let nextBirthdayDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if(nextBirthdayDate < today) {
        nextBirthdayDate.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilNextBirthday = differenceInCalendarDays(nextBirthdayDate, today);

    return {
      message: 'Age calculated successfully.',
      age: { years, months, days },
      nextBirthday: {
        date: format(nextBirthdayDate, 'EEEE, MMMM d, yyyy'),
        daysUntil: daysUntilNextBirthday,
      }
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
