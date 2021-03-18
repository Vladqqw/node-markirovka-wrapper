class JWT {

    token: string;
    exp: number;

    constructor(token: string) {
        this.token = token;
        this.exp = new Date().valueOf();
    }

    /**
     * Действует ли еще токен
     *
     * @return bool
     */
    isValid() {
        return this.getValidTo(this.exp).valueOf() > new Date().valueOf();
    }

    /**
     * До какого времени действует токен
     *
     * @return Date
     */
    protected getValidTo(timestamp: number) {
        return new Date(timestamp);
    }
}

export {JWT}