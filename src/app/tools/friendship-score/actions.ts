'use server';

import { z } from 'zod';

// --- Schemas ---
const namesSchema = z.object({
  name1: z.string().min(1, 'First name is required.'),
  name2: z.string().min(1, 'Second name is required.'),
});

export type FriendshipFormState = {
  message: string;
  score?: number;
  names?: { name1: string, name2: string };
  issues?: string[];
};

// --- Friendship Score ---
const calculateFriendshipScore = (name1: string, name2: string): number => {
    const combined = (name1 + 'friends' + name2).toLowerCase();
    let score = 0;
    for (let i = 0; i < combined.length; i++) {
        score = (score + combined.charCodeAt(i) * (i + 1)) % 101;
    }
     if(score < 50) {
        score = score + 40;
    }
     if (score > 100) {
        score = 100 - (score % 10);
    }
    return score;
}

export async function friendshipScoreAction(
  prevState: FriendshipFormState,
  data: FormData
): Promise<FriendshipFormState> {
  const formData = Object.fromEntries(data);
  const parsed = namesSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return { message: 'Invalid form data', issues };
  }

  try {
    const { name1, name2 } = parsed.data;
    const score = calculateFriendshipScore(name1, name2);
    return { message: 'Score calculated successfully.', score, names: { name1, name2 } };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.' };
  }
}
