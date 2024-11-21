"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configModule = void 0;
const config_1 = require("@nestjs/config");
const Joi = require("joi");
exports.configModule = config_1.ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.${process.env.NODE_ENV}.env`,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev'),
    }),
});
//# sourceMappingURL=config.module.js.map