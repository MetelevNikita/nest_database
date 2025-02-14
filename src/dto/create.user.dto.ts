import { IsNumber, IsString, IsEmail, MinLength } from "class-validator";


export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;
}