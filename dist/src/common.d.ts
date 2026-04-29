export declare function getControlNumber(numbers: number[], firstMultiplier?: number): number;
export declare function resultHandler(errorType?: string, isException?: boolean): {
    isValid: boolean;
    isException: boolean;
    error?: undefined;
} | {
    isValid: boolean;
    error: string;
    isException?: undefined;
};
export declare function randomNumberToString(length?: number): string;
export declare const VALIDATION_ERRORS: {
    EMPTY: string;
    INVALID: string;
    INVALID_CONTROL_NUMBER: string;
    INVALID_DATE: string;
};
