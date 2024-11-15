import CryptoJS from "crypto-js";

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

export const isType_YCPGW_Provider_Info = (object: any): object is YCPGW_Provider_Info => "provider_type" in object;
export const hasValues = (obj: any) => Object.values(obj).some(v => v !== null && typeof v !== "undefined");
export const createHashBase64 = (encodeBody: string, apiSecret: string, SHAType: number) =>
{
    let type: any;
    switch (SHAType)
    {
        case 256:
            type = CryptoJS.algo.SHA256; // Fiserv 
            break;
        case 512:
            type = CryptoJS.algo.SHA512; // Till
            break;
    }

    var computedHash = CryptoJS.algo.HMAC.create(type, apiSecret.toString());
    computedHash.update(encodeBody);
    let computedHashFin = computedHash.finalize();
    return CryptoJS.enc.Base64.stringify(computedHashFin);
};
export const createSHA512 = (target: string) => CryptoJS.SHA512(target).toString();
/**
 * @param message "http://google.com/api/v2"
 * @param target  "/api"
 * @returns "/api/v2"
 */
export const fetchRestStringIncludeTarget = (message: string, target: string) => message.substring(message.indexOf(target));
/**
 * @param message "http://google.com/api/v2"
 * @param target "/api"
 * @returns "http://google.com"
 */
export const fetchStringStopFromTarget = (message: string, target: string) => message.substring(0, message.indexOf(target));
/**
 * @param targetNum "7" --   "5"
 * @param padNum    "2" --   "3"
 * @returns        "07" -- "005"
 */
export const numberPad = (targetNum: any, padNum: any = 2) =>
{
    targetNum = Number(targetNum);
    padNum = Number(padNum);
    return (new Array(padNum).join('0').slice((padNum) * -1) + targetNum).slice(-2);
}
/**
 * @param targetNumber "123.456"
 * @param place "2"
 * @returns "123.45"
 */
export const decimalPlace = (targetNumber: number, place: number) => targetNumber.toFixed(place);
export const fetchMainDomain = (url: string) =>
{
    var pathRegex = /(.+?\:\/\/.+?)(\/|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : '';
}
export const fetchExcludeMainDomain = (url: string) =>
{
    var pathRegex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : '';
}
export const padFullYear = (year: string) => year ? (new Date()).getFullYear().toString().substring(0,(4-year.length)) + year : year;
export const removeSpace = (target: string) => target.replace(/\s/g, "");
export const convertStringEmptyToUndefined = (target: string) => !target?target:undefined;