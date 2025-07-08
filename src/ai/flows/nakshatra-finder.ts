'use server';
/**
 * @fileOverview A Nakshatra (Birth Star) finding AI agent.
 *
 * - findNakshatra - A function that handles finding the Nakshatra.
 * - NakshatraInput - The input type for the findNakshatra function.
 * - NakshatraOutput - The return type for the findNakshatra function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NakshatraInputSchema = z.object({
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
export type NakshatraInput = z.infer<typeof NakshatraInputSchema>;

const NakshatraOutputSchema = z.object({
  nakshatra: z.string().describe('The name of the Nakshatra (birth star).'),
  pada: z.number().int().min(1).max(4).describe('The Pada (quarter) of the Nakshatra.'),
  description: z.string().describe('A brief, insightful description of the Nakshatra and its characteristics.'),
});
export type NakshatraOutput = z.infer<typeof NakshatraOutputSchema>;


export async function findNakshatra(input: NakshatraInput): Promise<NakshatraOutput> {
  return nakshatraFinderFlow(input);
}


const prompt = ai.definePrompt({
  name: 'nakshatraFinderPrompt',
  input: { schema: NakshatraInputSchema },
  output: { schema: NakshatraOutputSchema },
  prompt: `You are an expert Vedic astrologer. Your task is to determine the user's Nakshatra (birth star) and its Pada (quarter) based on their birth details.

The Nakshatra is one of the 27 lunar mansions in Hindu astrology.

Based on the birth details provided, calculate the user's Nakshatra and its Pada. Then, provide a brief, insightful description of the Nakshatra's characteristics, including its ruling planet, symbol, and general personality traits.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const nakshatraFinderFlow = ai.defineFlow(
  {
    name: 'nakshatraFinderFlow',
    inputSchema: NakshatraInputSchema,
    outputSchema: NakshatraOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
