export interface InterfaceResponseGetAuthData {
    readonly uuid?: string, // Уникальный идентификатор сгенерированных случайных данных
    readonly data?: string // Случайная строка данных
}

export interface InterfaceRequestCheckAuthData {
    readonly uuid: string, // Уникальный идентификатор подписанных случайных данных
    readonly signedData: string, // Подписанные УКЭП зарегистрированного УОТ случайные данные в base64 (ЭП присоединенная)
}

export interface InterfaceResponseCheckAuthData {
    readonly token?: string, // Аутентификационный токен (Параметр обязательный в случае успешного ответа)
    readonly code?: string, // Код ошибки (Параметр обязательный в случае не успешного ответа)
    readonly error_message: string, // Сообщение об ошибке
    readonly description?: string // Описание ошибки
}