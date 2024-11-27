import { z } from 'zod';

export const RoleSchema = z.object({
  name: z.string().min(1, { message: 'Role Name  is required.' }),
  type: z.string().min(1, { message: 'Platform is required.' }),
  permission: z
    .array(z.string())
    .min(1, { message: 'At least one Permission is required.' }),
});
