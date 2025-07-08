'use server';
/**
 * @fileOverview A Zodiac Compatibility analysis AI agent.
 *
 * - getZodiacCompatibility - A function that handles the compatibility analysis.
 * - ZodiacCompatibilityInput - The input type for the function.
 * - ZodiacCompatibilityOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ZodiacCompatibilityInputSchema = z.object({
  sign1: z.string().describe('The first zodiac sign.'),
  sign2: z.string().describe('The second zodiac sign.'),
});
export type ZodiacCompatibilityInput = z.infer<typeof ZodiacCompatibilityInputSchema>;

const ZodiacCompatibilityOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('An overall compatibility score from 0 to 100.'),
  summary: z.string().describe('A brief, 2-3 sentence summary of the relationship\'s dynamic, pros, and cons.'),
  love: z.string().describe('A detailed paragraph on love and romance compatibility.'),
  friendship: z.string().describe('A detailed paragraph on friendship compatibility.'),
  communication: z.string().describe('A detailed paragraph on communication styles and work compatibility.'),
});
export type ZodiacCompatibilityOutput = z.infer<typeof ZodiacCompatibilityOutputSchema>;

export async function getZodiacCompatibility(input: ZodiacCompatibilityInput): Promise<ZodiacCompatibilityOutput> {
  return zodiacCompatibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'zodiacCompatibilityPrompt',
  input: { schema: ZodiacCompatibilityInputSchema },
  output: { schema: ZodiacCompatibilityOutputSchema },
  prompt: `You are an expert astrologer specializing in synastry and relationship compatibility.
Analyze the compatibility between {{sign1}} and {{sign2}}.

Provide a detailed analysis covering the following aspects:
1.  **Overall Score**: An integer score from 0 to 100 representing the overall compatibility. Be realistic. Not all pairs are 90+.
2.  **Summary**: A concise overview of the relationship's strengths and challenges.
3.  **Love**: How they connect in a romantic relationship.
4.  **Friendship**: How they connect as friends.
5.  **Communication & Work**: How they communicate, collaborate, and handle conflicts.

Provide the output in the specified structured format.
`,
});

const zodiacCompatibilityFlow = ai.defineFlow(
  {
    name: 'zodiacCompatibilityFlow',
    inputSchema: ZodiacCompatibilityInputSchema,
    outputSchema: ZodiacCompatibilityOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
