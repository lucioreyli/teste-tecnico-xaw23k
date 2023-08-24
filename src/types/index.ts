import { z } from 'zod';

export const productSchema = z
  .object({
    name: z.string({
      required_error: 'Campo necessário',
      invalid_type_error: 'Tipo informado inválido',
    }),
    unit: z.enum(['lt', 'kg', 'un'], {
      required_error: 'Campo necessário',
      invalid_type_error: "Tipo inválido, apenas 'lt', kg' o un'",
    }),
    quantity: z
      .string({
        required_error: 'Campo necessário',
        invalid_type_error: 'Tipo informado inválido',
      })
      .optional()
      .refine((num) => z.number().int().safeParse(Number(num)).success),
    price: z
      .string({
        required_error: 'Campo necessário',
        invalid_type_error: 'Tipo informado inválido',
      })
      .optional()
      .refine((num) => z.number().int().safeParse(Number(num)).success),
    perishable: z.boolean().default(false),
    validationDate: z.string().datetime().optional(),
    fabricationDate: z
      .string({
        required_error: 'Campo necessário',
        invalid_type_error: 'Tipo informado inválido',
      })
      .datetime(),
  })
  .refine(
    (data) => {
      if (data.perishable) {
        return z.string().datetime().safeParse(data.validationDate).success;
      }
      return true;
    },
    { message: 'Data de validade necessária', path: ['validationDate'] },
  );

export type Product = z.infer<typeof productSchema>;

export const data: Product[] = [
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: true,
    validationDate: '2003-07-08T23:10:58',
  },
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: false,
    validationDate: '2003-07-08T23:10:58',
  },
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: true,
    validationDate: '2003-07-08T23:10:58',
  },
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: false,
    validationDate: '2003-07-08T23:10:58',
  },
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: false,
    validationDate: '2003-07-08T23:10:58',
  },
  {
    name: 'peixe',
    unit: 'kg',
    quantity: '300',
    fabricationDate: '2003-07-08T03:04:05',
    perishable: false,
    validationDate: '2003-07-08T23:10:58',
  },
];
