'use server';
/**
 * @fileOverview A Past Life Analysis AI agent.
 *
 * - analyzePastLife - A function that handles the past life analysis.
 * - PastLifeAnalysisInput - The input type for the analyzePastLife function.
 * - PastLifeAnalysisOutput - The return type for the analyzePastLife function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PastLifeAnalysisInputSchema = z.object({
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
export type PastLifeAnalysisInput = z.infer<typeof PastLifeAnalysisInputSchema>;

const PastLifeAnalysisOutputSchema = z.object({
  era: z.string().describe("The historical era or approximate century of the past life."),
  location: z.string().describe("The geographical region or country of the past life."),
  profession: z.string().describe("The profession or primary role in that past life."),
  story: z.string().describe("A brief, narrative story (2-3 paragraphs) of the past life, highlighting key events, relationships, and the life's overall theme."),
  karmicLesson: z.string().describe("The primary karmic lesson or unresolved issue from that life that is being carried into the current life."),
});
export type PastLifeAnalysisOutput = z.infer<typeof PastLifeAnalysisOutputSchema>;


export async function analyzePastLife(input: PastLifeAnalysisInput): Promise<PastLifeAnalysisOutput> {
  return pastLifeAnalysisFlow(input);
}


const prompt = ai.definePrompt({
  name: 'pastLifeAnalysisPrompt',
  input: { schema: PastLifeAnalysisInputSchema },
  output: { schema: PastLifeAnalysisOutputSchema },
  prompt: `You are an expert karmic astrologer specializing in past life regression analysis. Based on the user's birth details, you will analyze their chart to determine the most significant past life influencing their current incarnation. Focus on the positions of Ketu (the South Node of the Moon) and Saturn, as well as the 12th house, to infer the story of their past janma (birth).

Birth Details:
- Date: {{{birthDate}}}
- Time: {{{birthTime}}}
- Location: {{{birthLocation}}}

Based on this, construct a plausible and insightful past life analysis.
1.  **Era & Location**: Determine a likely historical period and geographical location for this past life.
2.  **Profession**: Identify a probable profession or role (e.g., healer, warrior, scholar, farmer, artist).
3.  **Story**: Weave a brief narrative about this past life. Describe their character, key relationships, and the main challenges or successes they faced.
4.  **Karmic Lesson**: Most importantly, identify the key unresolved lesson or karmic debt from that life that the soul is working to resolve in this lifetime.

Provide the output in the specified structured format. The tone should be wise, insightful, and constructive.`,
});

const pastLifeAnalysisFlow = ai.defineFlow(
  {
    name: 'pastLifeAnalysisFlow',
    inputSchema: PastLifeAnalysisInputSchema,
    outputSchema: PastLifeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
