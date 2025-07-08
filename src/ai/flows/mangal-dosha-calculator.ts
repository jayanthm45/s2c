'use server';
/**
 * @fileOverview A Mangal Dosha (Kuja Dosha) finding AI agent.
 *
 * - findMangalDosha - A function that handles finding Mangal Dosha.
 * - MangalDoshaInput - The input type for the findMangalDosha function.
 * - MangalDoshaOutput - The return type for the findMangalDosha function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MangalDoshaInputSchema = z.object({
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
export type MangalDoshaInput = z.infer<typeof MangalDoshaInputSchema>;

const MangalDoshaOutputSchema = z.object({
  hasDosha: z.boolean().describe('Whether Mangal Dosha is present in the birth chart.'),
  description: z.string().describe('A detailed explanation of the findings, including the house where Mars is placed if Dosha is present, and its implications. If no dosha, confirm it and explain why.'),
  remedies: z.array(z.string()).describe('A list of suggested remedies if Mangal Dosha is present. This should be an empty array if hasDosha is false.'),
});
export type MangalDoshaOutput = z.infer<typeof MangalDoshaOutputSchema>;


export async function findMangalDosha(input: MangalDoshaInput): Promise<MangalDoshaOutput> {
  return mangalDoshaFinderFlow(input);
}


const prompt = ai.definePrompt({
  name: 'mangalDoshaFinderPrompt',
  input: { schema: MangalDoshaInputSchema },
  output: { schema: MangalDoshaOutputSchema },
  prompt: `You are an expert Vedic astrologer. Your task is to determine if the user has Mangal Dosha (also known as Kuja Dosha or Manglik Dosha) in their birth chart based on their birth details.

Mangal Dosha occurs when Mars (Mangal) is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house from the Ascendant (Lagna). Some astrologers also consider these placements from the Moon and Venus. For this calculation, primarily consider the placement from the Ascendant.

Based on the birth details provided, analyze the birth chart.
1.  Determine if Mangal Dosha is present by checking the position of Mars. Set the 'hasDosha' field to true or false.
2.  Provide a detailed 'description' of your findings. If Dosha is present, specify which house Mars is in and explain the general implications of that specific placement. If Dosha is not present, confirm this and briefly explain why (e.g., "Mars is in the 5th house, which does not cause Mangal Dosha").
3.  If 'hasDosha' is true, provide a list of at least 3-4 common astrological 'remedies'. If 'hasDosha' is false, return an empty array for remedies.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const mangalDoshaFinderFlow = ai.defineFlow(
  {
    name: 'mangalDoshaFinderFlow',
    inputSchema: MangalDoshaInputSchema,
    outputSchema: MangalDoshaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
