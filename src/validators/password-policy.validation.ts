/* eslint-disable @typescript-eslint/no-unused-vars */
// validators/is-strong-password.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordPolicy', async: false })
export class IsPasswordPolicy implements ValidatorConstraintInterface {
  validate(password: string, _args: ValidationArguments) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Password too weak. Must include uppercase, lowercase, number, special character, and be at least 8 characters.';
  }
}
