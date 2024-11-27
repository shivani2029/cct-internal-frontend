import { z } from 'zod';

export const EditCheckRequest = z.object({
  vendorId: z.string().min(1, { message: 'Name is required.' }),
});
