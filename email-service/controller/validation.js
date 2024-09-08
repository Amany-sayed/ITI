const joi = require('joi');
const Types = require('mongoose');
const reqMethods = ["body", "query", "params", "headers", "file", "files"];

const ObjectIdValidation = (value, helpers) => {
    return Types.ObjectId.isValid(value) ? value : helpers.error("Invalid Id");
};

// Define general fields like email, password, _id, etc.
const generalFields = {
    email: joi
        .string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
    password: joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
            "string.pattern.base": "Password regex fail",
        })
        .required(),
    _id: joi.string().custom(ObjectIdValidation),
};

// Define the validation core function
const validationCoreFunction = (schema) => {
    return (req, res, next) => {
        const validationErrorArr = [];
        for (const key of reqMethods) {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], {
                    abortEarly: false,
                });

                if (validationResult.error) {
                    validationErrorArr.push(validationResult.error.details);
                }
            }
        }

        if (validationErrorArr.length) {
            req.validationErrorArr = validationErrorArr;
            return next(new Error("", { cause: 400 }));
        }
        next();
    };
};

module.exports = {
    generalFields,
    validationCoreFunction,
};