'use server';
/**
 * @fileOverview An Atmakaraka and Darakaraka finding AI agent.
 *
 * - findKarakas - A function that handles finding the Atmakaraka and Darakaraka.
 * - KarakaFinderInput - The input type for the findKarakas function.
 * - KarakaFinderOutput - The return type for the findKarakas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KarakaFinderInputSchema = z.object({
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
export type KarakaFinderInput = z.infer<typeof KarakaFinderInputSchema>;

const KarakaFinderOutputSchema = z.object({
  atmakaraka: z.string().describe('The Atmakaraka planet (soul planet).'),
  darakaraka: z.string().describe('The Darakaraka planet (spouse signifier).'),
  atmakarakaDescription: z.string().describe('A brief, insightful description of the Atmakaraka and its role in the user\'s life path.'),
  darakarakaDescription: z.string().describe('A brief, insightful description of the Darakaraka and what it signifies about the user\'s future spouse and relationships.'),
});
export type KarakaFinderOutput = z.infer<typeof KarakaFinderOutputSchema>;


export async function findKarakas(input: KarakaFinderInput): Promise<KarakaFinderOutput> {
  return karakaFinderFlow(input);
}


const prompt = ai.definePrompt({
  name: 'karakaFinderPrompt',
  input: { schema: KarakaFinderInputSchema },
  output: { schema: KarakaFinderOutputSchema },
  prompt: `You are an expert Vedic astrologer specializing in Jaimini astrology. Your task is to determine the user's Atmakaraka (soul planet) and Darakaraka (spouse signifier) from their birth details.

- The Atmakaraka is the planet that has the highest degree of longitude in any sign in the birth chart.
- The Darakaraka is the planet that has the lowest degree of longitude in any sign in the birth chart.
- Consider the 7 main planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) and the lunar node Rahu for these calculations. Do not consider Ketu.

Based on the birth details provided, analyze the birth chart:
1.  Identify the Atmakaraka and Darakaraka planets.
2.  Provide a brief, insightful description for each. For the Atmakaraka, explain its role in the user's soul purpose and life lessons. For the Darakaraka, explain what it indicates about the qualities of their future spouse and the nature of their partnerships.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const karakaFinderFlow = ai.defineFlow(
  {
    name: 'karakaFinderFlow',
    inputSchema: KarakaFinderInputSchema,
    outputSchema: KarakaFinderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
