import { z } from 'zod';

export const EditBcasSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email().min(1, { message: 'Email is required.' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'mobile number is required.' })
    .min(10, { message: 'Must be a valid mobile number' })
    .max(10, { message: 'Must be a valid mobile number' }),
  websiteLink: z.string().min(1, { message: 'Website Link is required.' }),
  registrationNo: z.preprocess(
    val => Number(val),
    z.number().min(1, { message: 'Registration No is required.' }),
  ),
  address1: z.string().min(1, { message: 'Address is required.' }),
  address2: z.string().min(1, { message: 'Address is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  zipCode: z.string().min(1, { message: 'Zip Code is required.' }),
  state: z.string().min(1, { message: 'State is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  employeeCount: z.preprocess(
    val => Number(val),
    z.number().min(1, { message: 'number of employee is required.' }),
  ),
});
export const BcaConfiguration = z.object({
  appUrl: z.string().nonempty({ message: 'App url is required.' }),
  publicUserLink: z
    .string()
    .min(1, { message: 'Public user Link is required.' }),
  userSignUp: z.string().min(1, { message: 'User Signup is required.' }),
  vendorManagement: z
    .string()
    .min(1, { message: 'Vender Management is required.' }),
  webForms: z.string().min(1, { message: 'Webforms is required.' }),
  clientAlias: z.string().min(1, { message: 'Client Allas is required.' }),
  reportPrefix: z.string().min(1, { message: 'Report Prefix is required.' }),
  logoURL: z
    .string()
    .url({ message: 'Logo URL must be a valid URL.' })
    .nonempty({ message: 'Logo URL is required.' }),
  tagLine: z.string().min(1, { message: 'Tagline is required.' }),
  priorityTableColumns: z
    .array(z.string())
    .min(1, { message: 'Priority Table Columns is required.' }),
  caseTableColumns: z
    .array(z.string())
    .min(1, { message: 'Case Table Columns is required.' }),
  companyTableColumns: z
    .array(z.string())
    .min(1, { message: 'At least one Company Table Column is required.' }),
});
