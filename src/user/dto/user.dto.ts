import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { createProfileDto, UpdateProfileDto } from './profile.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateNested()
  @Type(() => createProfileDto)
  @IsNotEmpty()
  profile?: createProfileDto;
}

// usando la libreria PartialType de nestjs,
// podemos crear un Dto que herede de otro Dto
// y solo tenga los campos que queramos actualizar
export class UpdateUserDto extends PartialType(
  // Omitimos el campo profile del CreateUserDto es el DcreateprofileDto para que  no interfiera
  //la validacion de los campos del profile en el UpdateUserDto
  OmitType(CreateUserDto, ['profile']),
) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile?: UpdateProfileDto;
}

// export class UpdateUserDto {
//   @IsString()
//   @IsOptional()
//   @MinLength(8)
//   password?: string;

//   @IsEmail()
//   @IsOptional()
//   email?: string;
// }
