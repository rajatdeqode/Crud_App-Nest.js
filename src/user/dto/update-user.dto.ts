import Joi = require('joi');

export const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
});

export interface UpdateUserDto {
  name: string;
  email: string;
}
