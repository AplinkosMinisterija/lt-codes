"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_ERRORS = exports.randomNumberToString = exports.resultHandler = exports.getControlNumber = void 0;
function getControlNumber(numbers, firstMultiplier = 1) {
    return (numbers
        .map((item, index) => item * (((index + firstMultiplier - 1) % 9) + 1))
        .reduce((acc, item) => acc + item, 0) % 11);
}
exports.getControlNumber = getControlNumber;
function resultHandler(errorType = '', isException = false) {
    if (!errorType) {
        return { isValid: true, isException };
    }
    return {
        isValid: false,
        error: errorType,
    };
}
exports.resultHandler = resultHandler;
function randomNumberToString(length = 3) {
    const maxNumber = Math.pow(10, length);
    const randNumber = Math.floor(Math.random() * maxNumber).toString();
    return randNumber.padStart(length, '0');
}
exports.randomNumberToString = randomNumberToString;
exports.VALIDATION_ERRORS = {
    EMPTY: 'EMPTY',
    INVALID: 'INVALID',
    INVALID_CONTROL_NUMBER: 'INVALID_CONTROL_NUMBER',
    INVALID_DATE: 'INVALID_DATE',
};
//# sourceMappingURL=common.js.map