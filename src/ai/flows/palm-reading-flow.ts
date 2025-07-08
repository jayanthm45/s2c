'use server';
/**
 * @fileOverview A palm reading AI agent.
 *
 * - analyzePalm - A function that handles the palm reading process.
 * - PalmReadingInput - The input type for the analyzePalm function.
 * - PalmReadingOutput - The return type for the analyzePalm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PalmReadingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person's palm, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PalmReadingInput = z.infer<typeof PalmReadingInputSchema>;

const LineInterpretationSchema = z.object({
    interpretation: z.string().describe("A detailed interpretation of the line, explaining its meaning for the person's life, personality, and future. This should be 2-3 sentences long."),
});

const PalmReadingOutputSchema = z.object({
  heartLine: LineInterpretationSchema.describe("Analysis of the Heart Line, which indicates emotional stability, romantic perspectives, depression, and cardiac health."),
  headLine: LineInterpretationSchema.describe("Analysis of the Head Line, which represents a person's learning style, communication approach, intellectualism, and thirst for knowledge."),
  lifeLine: LineInterpretationSchema.describe("Analysis of the Life Line, which reflects physical health, general well-being, and major life changes."),
  fateLine: LineInterpretationSchema.describe("Analysis of the Fate Line (if visible), which indicates the degree to which a person's life is affected by external circumstances beyond their control."),
  overallAnalysis: z.string().describe("A summary of the person's personality, potential strengths, weaknesses, and life path based on the combination of their palm lines. This should be a comprehensive summary of 2-3 paragraphs."),
});
export type PalmReadingOutput = z.infer<typeof PalmReadingOutputSchema>;

export async function analyzePalm(input: PalmReadingInput): Promise<PalmReadingOutput> {
  return palmReadingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'palmReadingPrompt',
  input: {schema: PalmReadingInputSchema},
  output: {schema: PalmReadingOutputSchema},
  prompt: `You are an expert palmist, skilled in the art of palm reading (Chiromancy).
Analyze the provided photograph of a person's palm. Based on their palm lines, provide a detailed analysis.

Identify the key lines: the Heart Line, Head Line, Life Line, and Fate Line (if visible). For each line, provide a detailed interpretation.

Finally, provide a comprehensive overall analysis that synthesizes the findings from individual lines into a cohesive personality profile, including potential life path insights.

Photo: {{media url=photoDataUri}}`,
});

const palmReadingFlow = ai.defineFlow(
  {
    name: 'palmReadingFlow',
    inputSchema: PalmReadingInputSchema,
    outputSchema: PalmReadingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
