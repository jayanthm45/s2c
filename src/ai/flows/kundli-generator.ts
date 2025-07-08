'use server';
/**
 * @fileOverview A Kundli (Vedic Birth Chart) generating AI agent.
 *
 * - generateKundli - A function that handles generating the Kundli.
 * - KundliGeneratorInput - The input type for the generateKundli function.
 * - KundliGeneratorOutput - The return type for the generateKundli function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KundliGeneratorInputSchema = z.object({
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
export type KundliGeneratorInput = z.infer<typeof KundliGeneratorInputSchema>;

const PlanetInfoSchema = z.object({
  planet: z.string().describe('Name of the planet (e.g., Sun, Moon, Mars).'),
  sign: z.string().describe('The zodiac sign the planet is in.'),
  house: z.number().int().min(1).max(12).describe('The house number the planet occupies.'),
  degrees: z.number().describe('The degrees of the planet within the sign.'),
  isRetrograde: z.boolean().describe('Whether the planet is in retrograde motion.').optional(),
});

const HouseInfoSchema = z.object({
  house: z.number().int().min(1).max(12),
  sign: z.string().describe('The zodiac sign occupying the cusp of this house.'),
  planets: z.array(z.string()).describe('List of planets in this house (names).'),
});

const VimshottariDashaSchema = z.object({
    planet: z.string().describe('The Dasha lord planet.'),
    startDate: z.string().describe('Start date of the major Dasha period (YYYY-MM-DD).'),
    endDate: z.string().describe('End date of the major Dasha period (YYYY-MM-DD).'),
});

const KundliGeneratorOutputSchema = z.object({
  ascendant: z.string().describe('The Ascendant (Lagna) sign.'),
  sunSign: z.string().describe('The Sun Sign.'),
  moonSign: z.string().describe('The Moon Sign (Rashi).'),
  nakshatra: z.string().describe('The birth Nakshatra, including the Pada (quarter).'),
  planetaryPositions: z.array(PlanetInfoSchema).describe('The positions of the nine grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu).'),
  housePositions: z.array(HouseInfoSchema).describe('Details of each of the 12 houses (Bhavas).'),
  vimshottariDasha: z.array(VimshottariDashaSchema).describe('A list of the upcoming 5-7 major Vimshottari Dasha periods.'),
  basicInterpretation: z.string().describe("A brief, high-level interpretation (2-3 paragraphs) of the user's personality and life path based on their Ascendant, Sun, and Moon signs.")
});
export type KundliGeneratorOutput = z.infer<typeof KundliGeneratorOutputSchema>;

export async function generateKundli(input: KundliGeneratorInput): Promise<KundliGeneratorOutput> {
  return kundliGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kundliGeneratorPrompt',
  input: { schema: KundliGeneratorInputSchema },
  output: { schema: KundliGeneratorOutputSchema },
  prompt: `You are an expert Vedic astrologer with deep knowledge of Jyotish. Your task is to generate a detailed Kundli (birth chart) based on the user's birth details.

You must perform the necessary astrological calculations to determine all the required parameters accurately.

Birth Details:
- Date: {{{birthDate}}}
- Time: {{{birthTime}}}
- Location: {{{birthLocation}}}

Please provide the output in the specified structured format. Include the following:
1.  **Core Details**: Ascendant (Lagna), Sun Sign, Moon Sign (Rashi), and Nakshatra (including Pada).
2.  **Planetary Positions**: For all nine grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu), provide their zodiac sign, house placement, degrees, and retrograde status (if applicable).
3.  **House Positions**: For each of the 12 houses, list the sign on the cusp and any planets residing within it.
4.  **Vimshottari Dasha**: List the next 5-7 major dasha periods, including the ruling planet and the start/end dates.
5.  **Basic Interpretation**: Write a brief (2-3 paragraph) summary of the user's core characteristics based on their Ascendant, Sun, and Moon signs.
`,
});

const kundliGeneratorFlow = ai.defineFlow(
  {
    name: 'kundliGeneratorFlow',
    inputSchema: KundliGeneratorInputSchema,
    outputSchema: KundliGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
