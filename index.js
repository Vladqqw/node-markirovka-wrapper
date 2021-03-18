"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrptApi = void 0;
var axios_1 = __importDefault(require("axios"));
var Exception_1 = require("./lib/Exception");
var JWT_1 = require("./lib/JWT");
var CrptApi = /** @class */ (function () {
    function CrptApi(test, headers) {
        if (test === void 0) { test = false; }
        if (headers === void 0) { headers = {}; }
        this.baseURL = test
            ? 'https://markirovka.demo.crpt.tech'
            : 'https://markirovka.crpt.ru';
        this.headers = headers;
        this.axios = axios_1.default.create();
        this.axios.defaults.headers = __assign({ 'Content-Type': 'application/json;charset=UTF-8' }, this.headers);
    }
    /**
     * Получить JWT-токен в ЦРПТ
     */
    CrptApi.prototype.getJwt = function (certificateThumbprint, callback, callbackError) {
        this.getAuthData(function (authDataResponse) {
            console.log(authDataResponse);
        }, callbackError);
    };
    /**
     * Получить данные для подписи
     */
    CrptApi.prototype.getAuthData = function (callback, callbackError) {
        var _this = this;
        this.axios({
            method: 'get',
            baseURL: this.baseURL,
            url: '/auth/cert/key',
        }).then(function (response) {
            if (!response.uuid || !response.data) {
                _this.callbackErrorOrThrowException('get_auth_data', callbackError);
            }
            else {
                callback(response);
            }
        }).catch(function (error) {
            _this.callbackErrorOrThrowException('catch', callbackError, error);
        });
    };
    /**
     * Проверить подписанные данные для авторизации
     */
    CrptApi.prototype.checkAuthData = function (data, callback, callbackError) {
        var _this = this;
        this.axios({
            method: 'get',
            baseURL: this.baseURL,
            url: '/auth/cert/key',
            data: data,
        }).then(function (response) {
            if (!response.token) {
                _this.callbackErrorOrThrowException('check_auth_data', callbackError, {
                    code: response.code,
                    error_message: response.error_message,
                    description: response.description,
                });
            }
            else {
                callback(new JWT_1.JWT(response.token));
            }
        }).catch(function (error) {
            _this.callbackErrorOrThrowException('catch', callbackError, error);
        });
    };
    CrptApi.prototype.callbackErrorOrThrowException = function (error_code, callbackError, error) {
        var exception = new Exception_1.Exception(error_code, error);
        if (!!callbackError && typeof callbackError === 'function') {
            callbackError(exception);
        }
        else {
            throw exception;
        }
    };
    return CrptApi;
}());
exports.CrptApi = CrptApi;
exports.default = CrptApi;
