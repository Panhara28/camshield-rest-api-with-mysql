import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
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

  @IsNotEmpty()
  profilePicture: string;
}

export class UpdateUserPayloadDto {
  @IsOptional()
  @IsString()
  name?: string;
}
