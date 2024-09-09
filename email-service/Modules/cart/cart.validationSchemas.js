const Joi = require('joi');
const { generalFields } = require('../../controller/validation.js');

const addToCartSchema = {
    body: Joi.object({
        productId: generalFields._id.required(),
        quantity: Joi.number().positive().required(),
    }).required(),
};

const deleteFromCartSchema = {
    body: Joi.object({
        productId: generalFields._id.required(),
    }).required(),
};

const updateCartSchema = {
    body: Joi.object({
        productId: generalFields._id.required(),  
        newQuantity: Joi.number().positive().required(),  
    }).required(),
};

const showCartSchema = {
    params: Joi.object({
        userId: generalFields._id.required(),  
    }).optional(), 
};

module.exports = {
    addToCartSchema,
    deleteFromCartSchema,
    updateCartSchema,
    showCartSchema,
};
