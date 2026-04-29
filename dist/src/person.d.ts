export declare function validate(code: string): {
    isValid: boolean;
    isException: boolean;
    error?: undefined;
} | {
    isValid: boolean;
    error: string;
    isException?: undefined;
};
export declare function generate(): string;
