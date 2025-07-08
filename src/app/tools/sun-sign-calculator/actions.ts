'use server';

import { z } from 'zod';

const formSchema = z.object({
  birthDate: z.string().min(1, 'Birth date is required.'),
});

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

type ZodiacInfo = {
    sign: ZodiacSign;
    dateRange: string;
    symbol: string;
}

export type FormState = {
  message: string;
  zodiacInfo?: ZodiacInfo;
  issues?: string[];
};

const getZodiacSign = (date: Date): ZodiacInfo => {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return { sign: 'Aquarius', dateRange: 'Jan 20 - Feb 18', symbol: '♒' };
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return { sign: 'Pisces', dateRange: 'Feb 19 - Mar 20', symbol: '♓' };
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return { sign: 'Aries', dateRange: 'Mar 21 - Apr 19', symbol: '♈' };
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return { sign: 'Taurus', dateRange: 'Apr 20 - May 20', symbol: '♉' };
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return { sign: 'Gemini', dateRange: 'May 21 - Jun 20', symbol: '♊' };
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return { sign: 'Cancer', dateRange: 'Jun 21 - Jul 22', symbol: '♋' };
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return { sign: 'Leo', dateRange: 'Jul 23 - Aug 22', symbol: '♌' };
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return { sign: 'Virgo', dateRange: 'Aug 23 - Sep 22', symbol: '♍' };
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return { sign: 'Libra', dateRange: 'Sep 23 - Oct 22', symbol: '♎' };
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return { sign: 'Scorpio', dateRange: 'Oct 23 - Nov 21', symbol: '♏' };
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return { sign: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', symbol: '♐' };
    // Capricorn
    return { sign: 'Capricorn', dateRange: 'Dec 22 - Jan 19', symbol: '♑' };
};


export async function sunSignAction(
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
    const zodiacInfo = getZodiacSign(birthDate);

    return {
      message: 'Sun Sign calculated successfully.',
      zodiacInfo,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
