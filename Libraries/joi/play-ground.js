const Joi = require('joi');

/*
const schema = {
  a: Joi.number()
};

const value = {
  a: '123'
};

Joi.validate(value, schema, (err, value) => {
  console.log(value);
});
// err -> null
// value.a -> 123 (number, not string)

// or
const result = Joi.validate(value, schema);
// result.error -> null
// result.value -> { "a" : 123 }

console.log(result);

// or
const promise = Joi.validate(value, schema);
promise.then(value => {
  // value -> { "a" : 123 }
});
*/

//-------- complie -----
/*
const definition = ['key', 5, { a: true, b: [/^a/, 'boom'] }];
const schema = Joi.compile(definition);

// Same as:

const schema = Joi.alternatives().try([
  Joi.string().valid('key'),
  Joi.number().valid(5),
  Joi.object().keys({
    a: Joi.boolean().valid(true),
    b: Joi.alternatives().try([
      Joi.string().regex(/^a/),
      Joi.string().valid('boom')
    ])
  })
]);
*/


// -----------------

var schema = Joi.object().keys({
  id: Joi.string().guid().required(),
  username: Joi.string().alphanum().min(8).required(),
  timeCreated: Joi.date().timestamp('javascript'),
  type: Joi.string().valid(['member', 'admin']).required(),
  contact: Joi.object().keys({
    email: Joi.string().email(),
    phone: Joi.string().regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
  })

});


var document = {
  id: "1ef1b0b0-b02d-4eb5-8644-1dac68466ed8",
  username: "thai12345",
  type: "member",
  contact: {
    email: "thai@gmail.com",
    phone: "408-608-5237"
  }
};

Joi.validate(document, schema,  (err, value) => {
  console.log(value);
  if (err) {
    console.log("Error: ", err.details[0].message);
  }
});
