import { z } from 'zod';

const FormBuilderSchema = z.object({
  title: z.string().nonempty('Title is required'),
  price: z.string().nonempty('Price is required'),
  sections: z
    .array(
      z.object({
        name: z.string().nonempty('Name is required'),
        fields: z.array(
          z
            .object({
              label: z.string().nonempty('Field label is required'),
              type: z.enum(
                [
                  'text',
                  'number',
                  'email',
                  'date',
                  'select',
                  'checkbox',
                  'radio',
                  'attachment',
                ],
                {
                  message: 'Type is required',
                },
              ),
              required: z.boolean({ message: 'Select yes or no' }),
              metadata: z
                .object({
                  allowRegex: z.boolean().optional(),
                  min: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  max: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  minLength: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  maxLength: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  allowedDomain: z.string().optional(),
                  minDate: z.string().optional(),
                  maxDate: z.string().optional(),
                  minItems: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  maxItems: z.preprocess(
                    val => (val ? Number(val) : undefined),
                    z.number().optional(),
                  ),
                  allowMultiple: z.boolean().optional(),
                  maxFileSize: z.string().optional(),
                  allowedTypes: z.array(z.string()).optional(),
                  options: z
                    .array(
                      z.object({
                        value: z.string(),
                        id: z.string().optional(),
                      }),
                    )
                    .optional(),
                })
                .optional(),
            })
            .superRefine((field, ctx) => {
              const { type, metadata } = field;

              if (type === 'text') {
                if (metadata?.allowRegex === '') {
                  ctx.addIssue({
                    path: ['metadata', 'allowRegex'],
                    message: 'allowRegex is required',
                  });
                }
                if (metadata?.minLength === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'minLength'],
                    message: 'minLength is required',
                  });
                }
                if (metadata?.maxLength === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'maxLength'],
                    message: 'maxLength is required',
                  });
                }
                if (metadata?.minLength > metadata?.maxLength) {
                  ctx.addIssue({
                    path: ['metadata', 'minLength'],
                    message:
                      'minLength must be less than or equal to maxLength',
                  });
                }
              }

              if (type === 'number') {
                if (metadata?.min === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'min'],
                    message: 'min is required',
                  });
                }
                if (metadata?.max === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'max'],
                    message: 'max is required',
                  });
                }
                if (metadata?.min > metadata?.max) {
                  ctx.addIssue({
                    path: ['metadata', 'min'],
                    message: 'min must be less than or equal to max',
                  });
                }
                if (metadata?.minLength === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'minLength'],
                    message: 'minLength is required',
                  });
                }
                if (metadata?.maxLength === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'maxLength'],
                    message: 'maxLength is required',
                  });
                }
                if (metadata?.minLength > metadata?.maxLength) {
                  ctx.addIssue({
                    path: ['metadata', 'minLength'],
                    message:
                      'minLength must be less than or equal to maxLength',
                  });
                }
              }

              if (type === 'email') {
                if (metadata?.allowedDomain === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'allowedDomain'],
                    message: 'Allowed Domain is required',
                  });
                }
              }

              if (type === 'date') {
                const { minDate, maxDate } = metadata || {};

                if (metadata?.maxDate === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'maxDate'],
                    message: 'maxDate is required',
                  });
                }
                if (metadata?.minDate === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'minDate'],
                    message: 'minDate is required',
                  });
                }

                if (minDate && maxDate) {
                  if (new Date(minDate) > new Date(maxDate)) {
                    ctx.addIssue({
                      path: ['metadata', 'minDate'],
                      message: 'minDate must be less than or equal to maxDate',
                    });
                  }
                }
              }

              if (type === 'select') {
                const { minItems, maxItems, allowMultiple, options } =
                  metadata || {};
                if (allowMultiple === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'allowMultiple'],
                    message: 'allowMultiple is required',
                  });
                }
                if (maxItems === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'maxItems'],
                    message: 'maxItems is required',
                  });
                }
                if (minItems === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'minItems'],
                    message: 'minItems is required',
                  });
                }

                if (minItems !== undefined && maxItems !== undefined) {
                  if (minItems > maxItems) {
                    ctx.addIssue({
                      path: ['metadata', 'minItems'],
                      message:
                        'minItems must be less than or equal to maxItems',
                    });
                  }
                }
                console.log('options', options);

                if (options && options.length === 0) {
                  ctx.addIssue({
                    path: ['metadata', 'options'],
                    message:
                      'At least one option is required for the select field',
                  });
                }
              }

              if (type === 'radio') {
                const { options } = metadata || {};
                if (options && options.length === 0) {
                  ctx.addIssue({
                    path: ['metadata', 'options'],
                    message:
                      'At least one option is required for the select field',
                  });
                }
              }

              if (type === 'attachment') {
                const { allowedTypes, allowMultiple, maxFileSize } =
                  metadata || {};
                if (!allowedTypes || allowedTypes.length === 0) {
                  ctx.addIssue({
                    path: ['metadata', 'allowedTypes'],
                    message: 'At least one allowed type is required',
                  });
                }

                const validTypes = ['image', 'pdf', 'video', 'file'];
                const invalidTypes = allowedTypes?.filter(
                  type => !validTypes.includes(type),
                );

                if (invalidTypes?.length > 0) {
                  ctx.addIssue({
                    path: ['metadata', 'allowedTypes'],
                    message: `Invalid type(s) found: ${invalidTypes.join(', ')}`,
                  });
                }

                if (allowMultiple === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'allowMultiple'],
                    message: 'allowMultiple is required',
                  });
                }

                if (maxFileSize === undefined) {
                  ctx.addIssue({
                    path: ['metadata', 'maxFileSize'],
                    message: 'File size is required',
                  });
                }
              }
            }),
        ),
      }),
    )
    .nonempty('At least one field is required'),
});

export default FormBuilderSchema;
