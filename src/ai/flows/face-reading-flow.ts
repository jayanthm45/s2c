'use server';
/**
 * @fileOverview A face reading AI agent.
 *
 * - analyzeFace - A function that handles the face reading process.
 * - FaceReadingInput - The input type for the analyzeFace function.
 * - FaceReadingOutput - The return type for the analyzeFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaceReadingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FaceReadingInput = z.infer<typeof FaceReadingInputSchema>;

const FaceReadingOutputSchema = z.object({
  faceShape: z.object({
    shape: z.string().describe("The identified shape of the face (e.g., Oval, Round, Square, Heart, Diamond, Long)."),
    interpretation: z.string().describe("The personality traits associated with this face shape."),
  }),
  forehead: z.object({
    type: z.string().describe("The identified type of forehead (e.g., High, Broad, Narrow, Rounded, Straight)."),
    interpretation: z.string().describe("The personality traits associated with this forehead type."),
  }),
  eyes: z.object({
    type: z.string().describe("The identified type of eyes (e.g., Large, Small, Almond-shaped, Deep-set)."),
    interpretation: z.string().describe("The personality traits associated with the eyes."),
  }),
  nose: z.object({
      type: z.string().describe("The identified type of nose (e.g., Long, Short, Pointed, Broad)."),
      interpretation: z.string().describe("The personality traits associated with the nose."),
  }),
  lips: z.object({
      type: z.string().describe("The identified type of lips (e.g., Full, Thin, Balanced)."),
      interpretation: z.string().describe("The personality traits associated with the lips."),
  }),
  overallAnalysis: z.string().describe("A summary of the person's personality, potential strengths, weaknesses, and life path based on the combination of their facial features. This should be a comprehensive summary of 2-3 paragraphs."),
});
export type FaceReadingOutput = z.infer<typeof FaceReadingOutputSchema>;

export async function analyzeFace(input: FaceReadingInput): Promise<FaceReadingOutput> {
  return faceReadingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faceReadingPrompt',
  input: {schema: FaceReadingInputSchema},
  output: {schema: FaceReadingOutputSchema},
  prompt: `You are an expert physiognomist, skilled in the art of face reading.
Analyze the provided photograph of a person's face. Based on their facial features, provide a detailed analysis.

Identify the key features like face shape, forehead, eyes, nose, and lips. For each feature, provide the type and a brief interpretation.

Finally, provide a comprehensive overall analysis that synthesizes the findings from individual features into a cohesive personality profile, including potential strengths, challenges, and life path insights.

Photo: {{media url=photoDataUri}}`,
});

const faceReadingFlow = ai.defineFlow(
  {
    name: 'faceReadingFlow',
    inputSchema: FaceReadingInputSchema,
    outputSchema: FaceReadingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
