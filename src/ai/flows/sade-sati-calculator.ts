'use server';
/**
 * @fileOverview A Sade Sati Calculator AI agent.
 *
 * - calculateSadeSati - A function that handles calculating Sade Sati periods.
 * - SadeSatiInput - The input type for the calculateSadeSati function.
 * - SadeSatiOutput - The return type for the calculateSadeSati function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SadeSatiInputSchema = z.object({
  birthDate: z
    .string()
    .describe("The user's birth date in ISO 8601 format (YYYY-MM-DD)."),
  birthTime: z
    .string()
    .describe("The user's birth time in HH:mm format (24-hour clock)."),
  birthLocation: z
    .string()
    .describe("The user's birth location (city, country)."),
});
export type SadeSatiInput = z.infer<typeof SadeSatiInputSchema>;

const SadeSatiPeriodSchema = z.object({
    startDate: z.string().describe('Start date of the Sade Sati period (YYYY-MM-DD).'),
    endDate: z.string().describe('End date of the Sade Sati period (YYYY-MM-DD).'),
    peakDate: z.string().describe('Date when the peak effect is expected (YYYY-MM-DD).').optional(),
});

const SadeSatiOutputSchema = z.object({
  moonSign: z.string().describe("The user's Moon Sign (Rashi)."),
  isCurrentlyInSadeSati: z.boolean().describe('Whether the user is currently in a Sade Sati period.'),
  currentSadeSatiDetails: SadeSatiPeriodSchema.optional().describe('Details of the current Sade Sati period, if applicable.'),
  pastSadeSatiPeriods: z.array(SadeSatiPeriodSchema).describe('A list of past Sade Sati periods.'),
  futureSadeSatiPeriods: z.array(SadeSatiPeriodSchema).describe('A list of upcoming Sade Sati periods.'),
  description: z.string().describe('A detailed explanation of what Sade Sati is, the findings for the user, and what each phase means.'),
  remedies: z.array(z.string()).describe('A list of suggested remedies to mitigate the effects of Sade Sati, especially if a period is current or approaching.'),
});
export type SadeSatiOutput = z.infer<typeof SadeSatiOutputSchema>;


export async function calculateSadeSati(input: SadeSatiInput): Promise<SadeSatiOutput> {
  return sadeSatiCalculatorFlow(input);
}


const prompt = ai.definePrompt({
  name: 'sadeSatiCalculatorPrompt',
  input: { schema: SadeSatiInputSchema },
  output: { schema: SadeSatiOutputSchema },
  prompt: `You are an expert Vedic astrologer. Your task is to calculate and analyze the user's Sade Sati periods based on their birth details.

Sade Sati is the 7.5-year period when the planet Saturn (Shani) transits through the 12th, 1st, and 2nd houses from the user's natal Moon. Each transit lasts about 2.5 years.

Based on the birth details provided:
1.  Determine the user's Moon Sign (Rashi).
2.  Calculate all past, current, and future Sade Sati periods for a typical human lifespan (around 90 years).
3.  Determine if the user is currently in Sade Sati. If so, provide the start and end dates of the current period.
4.  Provide lists for past and future Sade Sati periods.
5.  Write a detailed 'description' explaining what Sade Sati is, the user's specific situation (whether they are in it, have passed it, or will face it), and the general nature of the three phases (12th, 1st, 2nd house transits).
6.  Provide a list of practical astrological 'remedies' to help mitigate the challenges of Sade Sati. This is important regardless of whether they are currently in the period.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const sadeSatiCalculatorFlow = ai.defineFlow(
  {
    name: 'sadeSatiCalculatorFlow',
    inputSchema: SadeSatiInputSchema,
    outputSchema: SadeSatiOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
