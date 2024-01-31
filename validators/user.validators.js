const joi = require("joi");

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string().required(),
  // .pattern(new RegExp("^[a-zA-Z0-9]{3,13}$"))
  confirmPassword: joi.ref("password"),
});

const loginSchema = joi.object({
  email: joi.string(),
  password: joi.string(),
});

module.exports = { signUpSchema, loginSchema };
