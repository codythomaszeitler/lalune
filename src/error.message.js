class ErrorMessage {
    constructor(message) {
        this.isError = true;
        this.message = message;
    }
};

module.exports = {
    ErrorMessage : ErrorMessage
}