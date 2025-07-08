'use server';
/**
 * @fileOverview A Kundli Matching (Matchmaking) AI agent.
 *
 * - calculateKundliMatch - A function that handles Kundli matching between two individuals.
 * - KundliMatchingInput - The input type for the calculateKundliMatch function.
 * - KundliMatchingOutput - The return type for the calculateKundliMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonDetailsSchema = z.object({
  name: z.string().describe("The person's name."),
  birthDate: z.string().describe("The person's birth date in ISO 8601 format (YYYY-MM-DD)."),
  birthTime: z.string().describe("The person's birth time in HH:mm format (24-hour clock)."),
  birthLocation: z.string().describe("The person's birth location (city, country)."),
});

const KundliMatchingInputSchema = z.object({
  boy: PersonDetailsSchema,
  girl: PersonDetailsSchema,
});
export type KundliMatchingInput = z.infer<typeof KundliMatchingInputSchema>;

const KootaScoreSchema = z.object({
  name: z.string().describe('Name of the Koota (e.g., Varna, Vashya).'),
  description: z.string().describe('Brief description of what this Koota represents.'),
  boyKoota: z.string().describe("The boy's attribute for this Koota."),
  girlKoota: z.string().describe("The girl's attribute for this Koota."),
  receivedPoints: z.number().describe('Points received for this Koota.'),
  totalPoints: z.number().describe('Total possible points for this Koota.'),
});

const KundliMatchingOutputSchema = z.object({
  totalScore: z.number().describe('The total Guna Milan score out of 36.'),
  compatibilityMessage: z.string().describe('A message summarizing the compatibility (e.g., Excellent Match, Average Match).'),
  kootaScores: z.array(KootaScoreSchema).describe('An array containing the scores and details for each of the 8 Kootas.'),
  mangalDoshaAnalysis: z.object({
    boyHasDosha: z.boolean().describe("Whether the boy has Mangal Dosha."),
    girlHasDosha: z.boolean().describe("Whether the girl has Mangal Dosha."),
    isCancelled: z.boolean().describe("Whether the Dosha is considered cancelled due to planetary positions."),
    conclusion: z.string().describe("A summary of the Mangal Dosha findings and its impact on the match."),
  }),
  conclusion: z.string().describe("A final, overall conclusion about the match, considering both Guna Milan and other factors like Mangal Dosha."),
});
export type KundliMatchingOutput = z.infer<typeof KundliMatchingOutputSchema>;

export async function calculateKundliMatch(input: KundliMatchingInput): Promise<KundliMatchingOutput> {
  return kundliMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kundliMatchingPrompt',
  input: { schema: KundliMatchingInputSchema },
  output: { schema: KundliMatchingOutputSchema },
  prompt: `You are an expert Vedic astrologer specializing in horoscope matching (Kundli Milan) for marriage. Your task is to analyze the birth details of a boy and a girl and provide a detailed compatibility report.

Boy's Details:
- Name: {{{boy.name}}}
- Birth Date: {{{boy.birthDate}}}
- Birth Time: {{{boy.birthTime}}}
- Location: {{{boy.birthLocation}}}

Girl's Details:
- Name: {{{girl.name}}}
- Birth Date: {{{girl.birthDate}}}
- Birth Time: {{{girl.birthTime}}}
- Location: {{{girl.birthLocation}}}

Perform the following analysis:
1.  **Ashtakoota Milan (Guna Milan)**: Calculate the compatibility score out of 36 based on the 8 Kootas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi).
    - For each Koota, provide the name, a brief description, the boy's and girl's attributes, the points received, and the total possible points.
2.  **Mangal Dosha Analysis**: Determine if either partner has Mangal Dosha (Kuja Dosha). Check for any cancellations of the dosha and provide a conclusion on its impact on the match.
3.  **Overall Conclusion**: Provide a total score, a summary message (e.g., "Excellent Match" if score > 24, "Good Match" if 18-24, "Average Match" if < 18), and a final, detailed conclusion summarizing the entire analysis.
`,
});

const kundliMatchingFlow = ai.defineFlow(
  {
    name: 'kundliMatchingFlow',
    inputSchema: KundliMatchingInputSchema,
    outputSchema: KundliMatchingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
