const Joi = require('joi');
import { ApiProperty } from '@nestjs/swagger';
export const signupUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.ref('password'),
});

export class SignupDto {
  @ApiProperty({ type: String, required: true })
  name: string;
  @ApiProperty({ type: String, required: true })
  email: string;
  @ApiProperty({ type: String, required: true })
  password: string;
  @ApiProperty({ type: String, required: true })
  repeatPassword: string;
}
export interface SignupUserDto {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
