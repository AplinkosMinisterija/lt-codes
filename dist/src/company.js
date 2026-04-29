"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.validate = void 0;
const common_1 = require("./common");
const person_1 = require("./person");
const NATURAL_PERSON_PREFIX = 'FA_';
const NATURAL_PERSON_REGEX = /^FA_(\d{11})$/;
function validate(code) {
    if (!code) {
        return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.EMPTY);
    }
    if (code.startsWith(NATURAL_PERSON_PREFIX)) {
        const match = NATURAL_PERSON_REGEX.exec(code);
        if (!match) {
            return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID);
        }
        const personResult = (0, person_1.validate)(match[1]);
        if (!personResult.isValid) {
            return personResult;
        }
        return (0, common_1.resultHandler)('', true);
    }
    if (!/^[0-9]{9}$/.test(code)) {
        return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID);
    }
    const regex = new RegExp('^([0-9]{8})([0-9])$', 'gi');
    const [_, __, controlNumber] = regex.exec(code);
    const numbersArray = code
        .slice(0, code.length - 1)
        .split('')
        .map((i) => Number(i));
    const generatedControlNumber = (0, common_1.getControlNumber)(numbersArray);
    if (generatedControlNumber === Number(controlNumber)) {
        return (0, common_1.resultHandler)();
    }
    return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID_CONTROL_NUMBER);
}
exports.validate = validate;
function generate() {
    const withoutControlNumber = (0, common_1.randomNumberToString)(8);
    const numbersArray = withoutControlNumber
        .split('')
        .map((i) => Number(i));
    const generatedControlNumber = (0, common_1.getControlNumber)(numbersArray);
    if (generatedControlNumber < 10) {
        return `${withoutControlNumber}${generatedControlNumber}`;
    }
    return generate();
}
exports.generate = generate;
//# sourceMappingURL=company.js.map