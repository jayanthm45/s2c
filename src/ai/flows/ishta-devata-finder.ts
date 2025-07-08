'use server';
/**
 * @fileOverview An Ishta Devata finding AI agent.
 *
 * - findIshtaDevata - A function that handles finding the Ishta Devata.
 * - IshtaDevataInput - The input type for the findIshtaDevata function.
 * - IshtaDevataOutput - The return type for the findIshtaDevata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IshtaDevataInputSchema = z.object({
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
export type IshtaDevataInput = z.infer<typeof IshtaDevataInputSchema>;

const IshtaDevataOutputSchema = z.object({
  atmakaraka: z.string().describe('The Atmakaraka planet (soul planet).'),
  ishtaDevata: z.string().describe('The name of the Ishta Devata (personal deity).'),
  description: z.string().describe('A brief, encouraging description of the deity and why connecting with them is beneficial for spiritual progress.'),
});
export type IshtaDevataOutput = z.infer<typeof IshtaDevataOutputSchema>;


export async function findIshtaDevata(input: IshtaDevataInput): Promise<IshtaDevataOutput> {
  return ishtaDevataFinderFlow(input);
}


const prompt = ai.definePrompt({
  name: 'ishtaDevataPrompt',
  input: { schema: IshtaDevataInputSchema },
  output: { schema: IshtaDevataOutputSchema },
  prompt: `You are an expert Vedic astrologer. Your task is to determine the user's Ishta Devata (personal deity) and Atmakaraka (soul planet) based on their birth details. 

The Ishta Devata is related to the 12th house from the Atmakaraka's position in the Navamsa (D9) chart. The Atmakaraka is the planet with the highest longitude in the birth chart.

Based on the birth details provided, first determine the Atmakaraka planet. Then, determine the Ishta Devata. Finally, provide a brief, encouraging description of the deity and explain why connecting with them is beneficial for the user's spiritual progress.

Birth Date: {{{birthDate}}}
Birth Time: {{{birthTime}}}
Birth Location: {{{birthLocation}}}
`,
});

const ishtaDevataFinderFlow = ai.defineFlow(
  {
    name: 'ishtaDevataFinderFlow',
    inputSchema: IshtaDevataInputSchema,
    outputSchema: IshtaDevataOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
