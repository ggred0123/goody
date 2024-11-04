"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    use(request, response, next) {
        const generateRequestLog = () => {
            const now = Date.now();
            return {
                userAgent: request.get('user-agent'),
                method: request.method,
                url: request.originalUrl,
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
                contentLength: response.get('content-length'),
                responseTime: Date.now() - now,
                contentType: request.get('content-type') || request.get('Content-type'),
                accept: request.get('accept'),
                ip: request.get('x-forwarded-for') || request.ip,
                timestamp: new Date().toISOString(),
            };
        };
        response.on('finish', () => {
            this.apiLog(generateRequestLog());
        });
        next();
    }
    apiLog(message) {
        const level = 'API_REQUEST';
        console.log(JSON.stringify({ level, ...message }));
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map