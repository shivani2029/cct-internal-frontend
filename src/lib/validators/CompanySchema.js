import { z } from 'zod';

export const EditCompanySchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email().min(1, { message: 'Email is required.' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'mobile number is required.' })
    .min(10, { message: 'Must be a valid mobile number' })
    .max(10, { message: 'Must be a valid mobile number' }),
  websiteLink: z.string().min(1, { message: 'Website Link is required.' }),
  noOfEmployees: z
    .string()
    .min(1, { message: 'number of employee is required.' }),
});
