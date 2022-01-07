const Joi = require('joi');

export const signupUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.ref('password'),
});

export interface SignupUserDto {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
