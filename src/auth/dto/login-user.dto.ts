const Joi = require('joi');

export const loginUserValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});

export interface LoginUserDto {
  email: string;
  password: string;
}
