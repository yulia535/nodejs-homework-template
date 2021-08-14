const Joi = require('joi')

module.exports = Joi.object({
  password: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ru', 'ua'] },
    })
    .pattern(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    )
    .required()
})
