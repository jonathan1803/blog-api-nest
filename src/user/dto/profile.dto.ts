import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class createProfileDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;
}

// export class UpdateProfileDto {
//   @IsString()
//   @IsOptional()
//   @MinLength(8)
//   password?: string;

//   @IsEmail()
//   @IsOptional()
//   email?: string;

//   @ValidateNested()
//   @Type(() => createProfileDto)
//   @IsNotEmpty()
//   profile?: createProfileDto;
// }
export class UpdateProfileDto extends PartialType(createProfileDto) {}
