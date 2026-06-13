import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(/^(\+?61|0)[2-578]\d{8}$/, {
    message:
      'phone must be a valid Australian phone number (e.g. 0412345678 or +61412345678)',
  })
  phone: string;

  @IsOptional()
  @IsString()
  note?: string;
}
