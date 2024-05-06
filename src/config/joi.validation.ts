

import * as Joi from "joi";


export const JoiValidationSchema=Joi.object({
    MONGODB_DATABASE:Joi.required(),
    MONGO_INITDB_ROOT_USERNAME:Joi.required(),
    MONGO_INITDB_ROOT_PASSWORD:Joi.required(),
    MONGO_DB:Joi.required(),
    PORT:Joi.required().default(3006),
})