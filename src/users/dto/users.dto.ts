import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsPasswordPolicy } from 'src/validators/password-policy.validation';

export class UserPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsPasswordPolicy)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  roleId: number;
}
