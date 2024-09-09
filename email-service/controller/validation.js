const joi = require('joi');
const { Types } = require('mongoose'); // Correct import for ObjectId
const reqMethods = ["body", "query", "params", "headers", "file", "files"];

// ObjectId validation
const ObjectIdValidation = (value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid ObjectId");
    }
    return value;
};

// Define general fields like email, password, _id, etc.
const generalFields = {
    email: joi
        .string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
    password: joi
        .string()
        .min(8)
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
            "string.pattern.base": "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
            "string.min": "Password must be at least 8 characters",
        })
        .required(),
    _id: joi.string().custom(ObjectIdValidation), 
};

// Validation core function
const validationCoreFunction = (schema) => {
    return (req, res, next) => {
        const validationErrors = [];
        for (const key of reqMethods) {
            if (schema[key]) {
                const { error } = schema[key].validate(req[key], {
                    abortEarly: false,
                });
                if (error) {
                    validationErrors.push(...error.details);
                }
            }
        }

        if (validationErrors.length) {
            req.validationErrors = validationErrors;
            return next(new Error("Validation error", { cause: 400 }));
        }
        next();
    };
};

module.exports = {
    generalFields,
    validationCoreFunction,
};
