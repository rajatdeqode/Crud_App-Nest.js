const Joi = require('joi');

export const createUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.ref('password'),
});

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
