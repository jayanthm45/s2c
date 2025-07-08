'use server';
/**
 * @fileOverview A referral email sending agent.
 *
 * - sendReferralEmail - A function that handles sending a referral email.
 * - SendReferralEmailInput - The input type for the sendReferralEmail function.
 * - SendReferralEmailOutput - The return type for the sendReferralEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendReferralEmailInputSchema = z.object({
  email: z.string().email().describe("The recipient's email address."),
  referralLink: z.string().url().describe('The referral link to be included in the email.'),
});
export type SendReferralEmailInput = z.infer<typeof SendReferralEmailInputSchema>;

const SendReferralEmailOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was sent successfully.'),
});
export type SendReferralEmailOutput = z.infer<typeof SendReferralEmailOutputSchema>;

const GeneratedEmailSchema = z.object({
    subject: z.string().describe("The subject line of the email."),
    body: z.string().describe("The body of the email. It should be friendly and inviting, encouraging the user to sign up using the referral link."),
});

export async function sendReferralEmail(input: SendReferralEmailInput): Promise<SendReferralEmailOutput> {
  return sendReferralEmailFlow(input);
}

const emailGenerationPrompt = ai.definePrompt({
    name: 'generateReferralEmailPrompt',
    input: { schema: SendReferralEmailInputSchema },
    output: { schema: GeneratedEmailSchema },
    prompt: `You are an assistant for an astrology app called "Seabed2Crest Astrotalk".
Your task is to generate a friendly and enticing referral email.
The user wants to invite a friend to the app.

The email should be addressed to a friend, contain the referral link, and briefly explain the benefits of joining (like talking to expert astrologers, getting daily horoscopes, etc.).
The referral link is: {{{referralLink}}}

Generate a compelling subject and body for the email. The body should be plain text.
`,
});

const sendReferralEmailFlow = ai.defineFlow(
  {
    name: 'sendReferralEmailFlow',
    inputSchema: SendReferralEmailInputSchema,
    outputSchema: SendReferralEmailOutputSchema,
  },
  async (input) => {
    console.log(`Generating referral email for: ${input.email}`);
    
    const { output: emailContent } = await emailGenerationPrompt(input);

    if (!emailContent) {
        console.error("Failed to generate email content.");
        return { success: false };
    }
    
    // In a real application, you would integrate an email service like SendGrid or Nodemailer here
    // to send the generated email. For this prototype, we'll log the email to the console.
    
    console.log("\n--- SIMULATED EMAIL SENT ---");
    console.log(`To: ${input.email}`);
    console.log(`Subject: ${emailContent.subject}`);
    console.log("--- Body ---");
    console.log(emailContent.body);
    console.log("--------------------------\n");

    return { success: true };
  }
);
