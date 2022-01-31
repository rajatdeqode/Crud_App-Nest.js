const Joi = require('joi');
import { ApiProperty } from '@nestjs/swagger';

export const loginUserValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});

export class LoginDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
export interface LoginUserDto {
  email: string;
  password: string;
}
