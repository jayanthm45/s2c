'use server';
/**
 * @fileOverview An astrologer chat AI agent.
 *
 * - chatWithAstrologer - A function that handles the chat with an astrologer.
 * - ChatWithAstrologerInput - The input type for the chatWithAstrologer function.
 * - ChatWithAstrologerOutput - The return type for the chatWithAstrologer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  id: z.string(),
  sender: z.enum(['user', 'astrologer']),
  text: z.string(),
  timestamp: z.string(),
});

const AstrologerSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  skills: z.array(z.string()),
  experience: z.number(),
  rating: z.number(),
  reviews: z.number(),
  price: z.number(),
  language: z.string(),
  status: z.enum(['online', 'busy', 'away']),
  bio: z.string(),
});

const ChatWithAstrologerInputSchema = z.object({
  astrologer: AstrologerSchema,
  messages: z.array(ChatMessageSchema).describe("The history of the conversation, where the last message is from the user."),
});
export type ChatWithAstrologerInput = z.infer<typeof ChatWithAstrologerInputSchema>;

const ChatWithAstrologerOutputSchema = z.object({
  response: z.string().describe('The astrologer AI response.'),
});
export type ChatWithAstrologerOutput = z.infer<typeof ChatWithAstrologerOutputSchema>;


export async function chatWithAstrologer(
  input: ChatWithAstrologerInput
): Promise<ChatWithAstrologerOutput> {
  return chatWithAstrologerFlow(input);
}


const prompt = ai.definePrompt({
  name: 'chatWithAstrologerPrompt',
  input: { schema: ChatWithAstrologerInputSchema },
  output: { schema: ChatWithAstrologerOutputSchema },
  prompt: `You are an AI assistant role-playing as an astrologer. Your persona is defined by the following details:

Name: {{{astrologer.name}}}
Skills: {{#each astrologer.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Experience: {{{astrologer.experience}}} years
Bio: {{{astrologer.bio}}}

You are engaging in a conversation with a user. The user is seeking astrological guidance. Be friendly, empathetic, and professional.

Here is the chat history:
{{#each messages}}
{{sender}}: {{text}}
{{/each}}

Based on the last message from the user, provide the next response from the astrologer.
Astrologer's response:`,
});

const chatWithAstrologerFlow = ai.defineFlow(
  {
    name: 'chatWithAstrologerFlow',
    inputSchema: ChatWithAstrologerInputSchema,
    outputSchema: ChatWithAstrologerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
