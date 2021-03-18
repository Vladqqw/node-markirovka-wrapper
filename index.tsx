import axios from "axios";
import {Exception} from "./lib/Exception";
import {JWT} from "./lib/JWT";
import {
    InterfaceRequestCheckAuthData,
    InterfaceResponseCheckAuthData,
    InterfaceResponseGetAuthData
} from "./interfaces/InterfaceApi";

class CrptApi {

    protected baseURL: string;
    protected headers: object;
    protected axios: any;

    constructor(test: boolean = false, headers: object = {}) {

        this.baseURL = test
            ? 'https://markirovka.demo.crpt.tech'
            : 'https://markirovka.crpt.ru';

        this.headers = headers;

        this.axios = axios.create();

        this.axios.defaults.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            ...this.headers
        };

    }

    /**
     * Получить JWT-токен в ЦРПТ
     */
    getJwt(certificateThumbprint: string, callback: any, callbackError: any): void {

        this.getAuthData((authDataResponse: InterfaceResponseGetAuthData) => {
            console.log(authDataResponse)
        }, callbackError);

    }

    /**
     * Получить данные для подписи
     */
    protected getAuthData(callback: any, callbackError: any): void {

        this.axios({
            method: 'get',
            baseURL: this.baseURL,
            url: '/auth/cert/key',
        }).then((response: InterfaceResponseGetAuthData) => {

            if (!response.uuid || !response.data) {
                this.callbackErrorOrThrowException('get_auth_data', callbackError)
            } else {
                callback(response);
            }

        }).catch((error: any) => {

            this.callbackErrorOrThrowException('catch', callbackError, error);

        });

    }

    /**
     * Проверить подписанные данные для авторизации
     */
    protected checkAuthData(data: InterfaceRequestCheckAuthData, callback: any, callbackError: any): void {

        this.axios({
            method: 'get',
            baseURL: this.baseURL,
            url: '/auth/cert/key',
            data: data,
        }).then((response: InterfaceResponseCheckAuthData) => {

            if (!response.token) {
                this.callbackErrorOrThrowException('check_auth_data', callbackError, {
                    code: response.code,
                    error_message: response.error_message,
                    description: response.description,
                })
            } else {
                callback(new JWT(response.token));
            }

        }).catch((error: any) => {

            this.callbackErrorOrThrowException('catch', callbackError, error);

        });

    }

    protected callbackErrorOrThrowException(error_code: string|number, callbackError: any, error?: any): void {
        const exception = new Exception(error_code, error);

        if (!!callbackError && typeof callbackError === 'function') {
            callbackError(exception);
        } else {
            throw exception;
        }
    }
}

export default CrptApi;
export { CrptApi };