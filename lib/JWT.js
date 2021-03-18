"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
var JWT = /** @class */ (function () {
    function JWT(token) {
        this.token = token;
        this.exp = new Date().valueOf();
    }
    /**
     * Действует ли еще токен
     *
     * @return bool
     */
    JWT.prototype.isValid = function () {
        return this.getValidTo(this.exp).valueOf() > new Date().valueOf();
    };
    /**
     * До какого времени действует токен
     *
     * @return Date
     */
    JWT.prototype.getValidTo = function (timestamp) {
        return new Date(timestamp);
    };
    return JWT;
}());
exports.JWT = JWT;
