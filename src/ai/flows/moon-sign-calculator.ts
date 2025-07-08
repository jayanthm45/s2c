'use server';
/**
 * @fileOverview A Moon Sign (Rashi) finding AI agent.
 *
 * - findMoonSign - A function that handles finding the Moon Sign.
 * - MoonSignInput - The input type for the findMoonSign function.
 * - MoonSignOutput - The return type for the findMoonSign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const zodiacSymbols: Record<string, string> = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓'
};

const MoonSignInputSchema = z.object({
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
export type MoonSignInput = z.infer<typeof MoonSignInputSchema>;

const MoonSignOutputSchema = z.object({
  moonSign: z.string().describe('The name of the Moon Sign (Rashi).'),
  lord: z.string().describe('The ruling planet of the Moon Sign.'),
  symbol: z.string().describe('The unicode symbol for the zodiac sign.'),
  description: z.string().describe('A brief, encouraging description of the Moon Sign and its characteristics.'),
});
export type MoonSignOutput = z.infer<typeof MoonSignOutputSchema>;


export async function findMoonSign(input: MoonSignInput): Promise<MoonSignOutput> {
  const result = await moonSignFinderFlow(input);
  // Ensure the correct symbol is returned
  if (zodiacSymbols[result.moonSign]) {
    result.symbol = zodiacSymbols[result.moonSign];
  }
  return result;
}


const prompt = ai.definePrompt({
  name: 'moonSignPrompt',
  input: { schema: MoonSignInputSchema },
  output: { schema: MoonSignOutputSchema },
  prompt: `You are an expert Vedic astrologer. Your task is to determine the user's Moon Sign (Rashi) based on their birth details. The Moon Sign is the zodiac sign where the Moon was positioned at the time of birth.

Based on the birth details provided, calculate the Moon Sign. Then, provide the name of the sign, its ruling planet (Lord), and a brief, encouraging description of the sign's characteristics. Finally, provide the unicode symbol for the sign.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const moonSignFinderFlow = ai.defineFlow(
  {
    name: 'moonSignFinderFlow',
    inputSchema: MoonSignInputSchema,
    outputSchema: MoonSignOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
