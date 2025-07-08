// src/ai/flows/daily-horoscope.ts
'use server';

/**
 * @fileOverview A daily horoscope generator AI agent.
 *
 * - generateDailyHoroscope - A function that generates a daily horoscope.
 * - DailyHoroscopeInput - The input type for the generateDailyHoroscope function.
 * - DailyHoroscopeOutput - The return type for the generateDailyHoroscope function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyHoroscopeInputSchema = z.object({
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
export type DailyHoroscopeInput = z.infer<typeof DailyHoroscopeInputSchema>;

const DailyHoroscopeOutputSchema = z.object({
  horoscope: z.string().describe('The daily horoscope for the user.'),
});
export type DailyHoroscopeOutput = z.infer<typeof DailyHoroscopeOutputSchema>;

export async function generateDailyHoroscope(
  input: DailyHoroscopeInput
): Promise<DailyHoroscopeOutput> {
  return generateDailyHoroscopeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyHoroscopePrompt',
  input: {schema: DailyHoroscopeInputSchema},
  output: {schema: DailyHoroscopeOutputSchema},
  prompt: `You are a professional astrologer. Generate a daily horoscope for the user based on their birth details.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}

Horoscope:
`,
});

const generateDailyHoroscopeFlow = ai.defineFlow(
  {
    name: 'generateDailyHoroscopeFlow',
    inputSchema: DailyHoroscopeInputSchema,
    outputSchema: DailyHoroscopeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
