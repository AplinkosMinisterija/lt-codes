"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.validate = void 0;
const moment_1 = __importDefault(require("moment"));
const common_1 = require("./common");
const randomDate = (start, end) => {
    const endTime = +(0, moment_1.default)(end);
    const randomNumber = (to, from = 0) => Math.floor(Math.random() * (to - from) + from);
    if (start) {
        const startTime = +(0, moment_1.default)(start);
        if (startTime > endTime) {
            throw new Error('End date is before start date!');
        }
        return (0, moment_1.default)(randomNumber(endTime, startTime));
    }
    return (0, moment_1.default)(randomNumber(endTime));
};
const getPersonControlNumber = (value) => {
    const numbersArray = value.split('').map((i) => Number(i));
    const firstControlNumber = (0, common_1.getControlNumber)(numbersArray);
    if (firstControlNumber < 10) {
        return firstControlNumber;
    }
    let secondControlNumber = (0, common_1.getControlNumber)(numbersArray, 3);
    if (secondControlNumber === 10) {
        secondControlNumber = 0;
    }
    return secondControlNumber;
};
function validate(code) {
    if (!code) {
        return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.EMPTY);
    }
    if (!/^[1-6,9][0-9]{10}$/.test(code)) {
        return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID);
    }
    const regex = new RegExp('^([1-6,9])([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9])$', 'gi');
    const [_, centurySex, yearShort, month, day, controlNumber] = regex.exec(code);
    let year;
    if (Number(centurySex) < 3) {
        year = `18${yearShort}`;
    }
    else if (Number(centurySex) < 5) {
        year = `19${yearShort}`;
    }
    else if (Number(centurySex) < 7) {
        year = `20${yearShort}`;
    }
    const monthDayException = !Number(month) || !Number(day);
    if (!year || monthDayException) {
        return (0, common_1.resultHandler)('', true);
    }
    const dateIsValid = (0, moment_1.default)(`${year}-${month}-${day}`, 'YYYY-MM-DD').isValid();
    if (!dateIsValid) {
        return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID_DATE);
    }
    const generatedControlNumber = getPersonControlNumber(code.slice(0, code.length - 1));
    if (generatedControlNumber === Number(controlNumber)) {
        return (0, common_1.resultHandler)();
    }
    return (0, common_1.resultHandler)(common_1.VALIDATION_ERRORS.INVALID_CONTROL_NUMBER);
}
exports.validate = validate;
function generate() {
    const randDate = randomDate('1900-01-01', (0, moment_1.default)());
    const randSex = Math.floor(Math.random() * 2);
    let sexes = [5, 6];
    if (randDate.year() < 2000) {
        sexes = [3, 4];
    }
    const randQueueNumber = (0, common_1.randomNumberToString)(3);
    const date = randDate.format('YYMMDD');
    const withoutControlNumber = `${sexes[randSex]}${date}${randQueueNumber}`;
    const generatedControlNumber = getPersonControlNumber(withoutControlNumber);
    return `${withoutControlNumber}${generatedControlNumber}`;
}
exports.generate = generate;
//# sourceMappingURL=person.js.map