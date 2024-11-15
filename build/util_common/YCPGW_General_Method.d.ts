/**
 * function isType_YCPGW_Provider_Info      ::> check the object type === YCPGW_Provider_Info
 * function hasValues                       ::> check any value in a object
 * function createHashBase64                ::> for signature at headers
 * function createSHA512                    ::> N/A
 * function fetchRestStringIncludeTarget    ::> fetch rest string by target
 * function fetchStringStopFromTarget       ::> fetch all string before target
 * function numberPad                       ::> pad 0 at front
 * function decimalPlace                    ::> N/A
 * function fetchMainDomain                 ::> N/A
 * function fetchExcludeMainDomain          ::> N/A
 * function padFullYear                     ::> 23 --> 2023
 * function removeSpace                     ::> "12 23" --> "1223"
 * function convertStringEmptyToUndefined   ::> "" --> undefined
 */
export declare const isType_YCPGW_Provider_Info: (object: any) => object is YCPGW_Provider_Info;
export declare const hasValues: (obj: any) => boolean;
export declare const createHashBase64: (encodeBody: string, apiSecret: string, SHAType: number) => string;
export declare const createSHA512: (target: string) => string;
/**
 * @param message "http://google.com/api/v2"
 * @param target  "/api"
 * @returns "/api/v2"
 */
export declare const fetchRestStringIncludeTarget: (message: string, target: string) => string;
/**
 * @param message "http://google.com/api/v2"
 * @param target "/api"
 * @returns "http://google.com"
 */
export declare const fetchStringStopFromTarget: (message: string, target: string) => string;
/**
 * @param targetNum "7" --   "5"
 * @param padNum    "2" --   "3"
 * @returns        "07" -- "005"
 */
export declare const numberPad: (targetNum: any, padNum?: any) => string;
/**
 * @param targetNumber "123.456"
 * @param place "2"
 * @returns "123.45"
 */
export declare const decimalPlace: (targetNumber: number, place: number) => string;
export declare const fetchMainDomain: (url: string) => string;
export declare const fetchExcludeMainDomain: (url: string) => string;
export declare const padFullYear: (year: string) => string;
export declare const removeSpace: (target: string) => string;
export declare const convertStringEmptyToUndefined: (target: string) => string | undefined;
