import { 
    IsEmail, 
    IsString, 
    IsNotEmpty, 
    MinLength, 
    Matches 
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{10}$/, {
    message: 'Le numéro de téléphone doit être valide (10 chiffres)',
  })
  phone: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;
}