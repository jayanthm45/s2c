'use server';


import { sendReferralEmail } from '@/ai/flows/send-referral-email';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  referralLink: z.string().url(),
});

export type FormState = {
  message: string;
  success?: boolean;
  issues?: string[];
};

export async function sendInviteAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid data provided.',
      issues,
      success: false,
    };
  }

  try {
    const result = await sendReferralEmail(parsed.data);

    if (result.success) {
      return {
        message: `Invite sent successfully to ${parsed.data.email}!`,
        success: true,
      };
    } else {
      return { message: 'Failed to send invite. Please try again.', success: false };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}
