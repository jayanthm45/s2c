'use server';
/**
 * @fileOverview A general horoscope generator AI agent.
 *
 * - generateGeneralHoroscope - A function that generates a daily horoscope for a zodiac sign.
 * - GeneralHoroscopeInput - The input type for the generateGeneralHoroscope function.
 * - GeneralHoroscopeOutput - The return type for the generateGeneralHoroscope function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralHoroscopeInputSchema = z.object({
  sign: z.string().describe('The zodiac sign (e.g., Aries, Taurus).'),
  period: z.string().describe("The time period for the horoscope (e.g., 'Today', 'Yesterday', 'Tomorrow', 'Weekly', 'Monthly', 'Yearly')."),
  type: z.string().describe("The type of horoscope (e.g., 'General', 'Love')."),
});
export type GeneralHoroscopeInput = z.infer<typeof GeneralHoroscopeInputSchema>;

const GeneralHoroscopeOutputSchema = z.object({
  horoscope: z.string().describe('The generated horoscope for the specified sign, period, and type.'),
});
export type GeneralHoroscopeOutput = z.infer<typeof GeneralHoroscopeOutputSchema>;

export async function generateGeneralHoroscope(
  input: GeneralHoroscopeInput
): Promise<GeneralHoroscopeOutput> {
  return generateGeneralHoroscopeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generalHoroscopePrompt',
  input: {schema: GeneralHoroscopeInputSchema},
  output: {schema: GeneralHoroscopeOutputSchema},
  prompt: `You are a professional astrologer. Generate a {{type}} horoscope for the zodiac sign {{sign}} for the period: {{period}}.

The horoscope should be insightful, positive, and about 3-4 sentences long.
If the period is 'Yearly', assume the user is asking about the current year. For example, if it's 2024, generate for 2024.
If the period is 'Weekly', 'Monthly', provide for the current week/month.

Horoscope:
`,
});

const generateGeneralHoroscopeFlow = ai.defineFlow(
  {
    name: 'generateGeneralHoroscopeFlow',
    inputSchema: GeneralHoroscopeInputSchema,
    outputSchema: GeneralHoroscopeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
