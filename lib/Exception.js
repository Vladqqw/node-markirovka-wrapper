"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var Exception = /** @class */ (function () {
    /**
     * @param error_code Внутрений код ошибки
     * @param error Тело ошибки
     */
    function Exception(error_code, error) {
        var messages = {
            not_found: 'Текст ошибки не найден',
            get_auth_data: 'Не корректный ответ запроса получения данных для подписи',
            check_auth_data: 'Невозможно получить JWT-токен в ЦРПТ с использованием указанной подписи',
            catch: 'Ошибка при запросе',
        };
        this.error_code = error_code;
        this.error_message = messages.hasOwnProperty(this.error_code)
            // @ts-ignore
            ? messages[this.error_code]
            : messages.not_found;
        this.error = error;
    }
    return Exception;
}());
exports.Exception = Exception;
