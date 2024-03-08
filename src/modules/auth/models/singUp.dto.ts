import { Transform } from "class-transformer";
import { IsString, MinLength, IsEmail } from "class-validator";

export class SingUpDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MinLength(1)
  document_number?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
