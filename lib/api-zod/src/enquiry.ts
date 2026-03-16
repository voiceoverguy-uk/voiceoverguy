import { z } from 'zod';

function countWords(s: string): number {
  return s.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

export const EnquiryInput = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(1, 'Message is required')
    .refine((s) => countWords(s) >= 8, {
      message: 'Please write at least 8 words in your message',
    }),
  pageTitle: z.string(),
  pageUrl: z.string(),
  website: z.string().optional().default(''),
});

export type EnquiryInputType = z.infer<typeof EnquiryInput>;
