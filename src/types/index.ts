import { z } from 'zod';

export const productSchema = z
  .object({
    name: z
      .string({
        required_error: 'Campo necessário',
        invalid_type_error: 'Tipo informado inválido',
      })
      .nonempty({ message: 'Campo necessário' }),
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
      .refine(
        (value) => {
          if (!value) return true;
          const validator = z.number().int();
          const num = value.replaceAll(/\D/g, '');
          return validator.safeParse(Number(num)).success;
        },
        { message: 'Quantidade inválida' },
      ),
    price: z
      .string({
        required_error: 'Campo necessário',
        invalid_type_error: 'Tipo informado inválido',
      })
      .nonempty({ message: 'Campo necessário' })
      .refine((value: string) => {
        const validator = z.number().int();
        const num = value.replaceAll(/\D/g, '');
        return validator.safeParse(Number(num)).success;
      }),
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
      if (!data.perishable) {
        return true;
      }
      if (!data.validationDate) {
        return false;
      }
      const existsValidationDate = z
        .string()
        .datetime()
        .safeParse(data.validationDate).success;
      return existsValidationDate;
    },
    { message: 'Data de validade necessária', path: ['validationDate'] },
  )
  .refine(
    (data) => {
      if (!data.perishable) {
        return true;
      }
      if (!data.validationDate) {
        return false;
      }
      const validationDateTimestamp = new Date(data.validationDate).getTime();
      const fabricationDateTimestamp = new Date(data.fabricationDate).getTime();
      return validationDateTimestamp >= fabricationDateTimestamp;
    },
    { message: 'Data de validade inválida', path: ['validationDate'] },
  )
  .refine(
    (data) => {
      if (!data.perishable) {
        return true;
      }
      if (!data.validationDate) {
        return false;
      }
      const [todayWithoutTime] = new Date().toISOString().split('T');
      const todayTimestamp = new Date(todayWithoutTime).getTime();
      const validationDateTimestamp = new Date(data.validationDate).getTime();
      return todayTimestamp <= validationDateTimestamp;
    },
    { message: 'Data de validade vencida', path: ['validationDate'] },
  );

export type Product = z.infer<typeof productSchema>;
