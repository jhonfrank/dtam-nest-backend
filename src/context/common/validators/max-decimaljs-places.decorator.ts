import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import Decimal from 'decimal.js';

export function MaxDecimaljsPlaces(
  maxDecimals: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDecimaljs',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxDecimals],
      validator: {
        validate(value: any, args: ValidationArguments) {
          try {
            const decimalValue = new Decimal(value);
            const decimalPlaces = decimalValue.decimalPlaces();
            return decimalPlaces <= args.constraints[0];
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} has more than ${args.constraints[0]} allowed decimals.`;
        },
      },
    });
  };
}
