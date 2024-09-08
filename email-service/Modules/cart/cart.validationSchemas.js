const Joi = require('joi');
const { generalFields } = require('../../controller/validation.js');

const addToCartSchema = {
    body: Joi.object({
        productId: generalFields._id.required(),  // _id from generalFields
        quantity: Joi.number().positive().required(),
    }).required(),
};

const deleteFromCartSchema = {
    body: Joi.object({
        productId: generalFields._id.required(),  // _id from generalFields
    }).required(),
};

module.exports = {
    addToCartSchema,
    deleteFromCartSchema,
};
