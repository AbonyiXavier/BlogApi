import Joi from "joi";

const articleValidation = data => {
  const schema = {
    userId: Joi.number()
      .integer()
      .min(1)
      .required(),
    author: Joi.string()
      .min(4)
      .max(50)
      .trim()
      .required(),
    category: Joi.string()
      .trim()
      .min(4)
      .max(50)
      .required(),
    title: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    description: Joi.string()
      .min(5)
      .max(1000)
      .trim()
      .required()
  };
  return Joi.validate(data, schema);
};

export default articleValidation;
