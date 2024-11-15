"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringEmptyToUndefined = exports.removeSpace = exports.padFullYear = exports.fetchExcludeMainDomain = exports.fetchMainDomain = exports.decimalPlace = exports.numberPad = exports.fetchStringStopFromTarget = exports.fetchRestStringIncludeTarget = exports.createSHA512 = exports.createHashBase64 = exports.hasValues = exports.isType_YCPGW_Provider_Info = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
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
const isType_YCPGW_Provider_Info = (object) => "provider_type" in object;
exports.isType_YCPGW_Provider_Info = isType_YCPGW_Provider_Info;
const hasValues = (obj) => Object.values(obj).some(v => v !== null && typeof v !== "undefined");
exports.hasValues = hasValues;
const createHashBase64 = (encodeBody, apiSecret, SHAType) => {
    let type;
    switch (SHAType) {
        case 256:
            type = crypto_js_1.default.algo.SHA256; // Fiserv 
            break;
        case 512:
            type = crypto_js_1.default.algo.SHA512; // Till
            break;
    }
    var computedHash = crypto_js_1.default.algo.HMAC.create(type, apiSecret.toString());
    computedHash.update(encodeBody);
    let computedHashFin = computedHash.finalize();
    return crypto_js_1.default.enc.Base64.stringify(computedHashFin);
};
exports.createHashBase64 = createHashBase64;
const createSHA512 = (target) => crypto_js_1.default.SHA512(target).toString();
exports.createSHA512 = createSHA512;
/**
 * @param message "http://google.com/api/v2"
 * @param target  "/api"
 * @returns "/api/v2"
 */
const fetchRestStringIncludeTarget = (message, target) => message.substring(message.indexOf(target));
exports.fetchRestStringIncludeTarget = fetchRestStringIncludeTarget;
/**
 * @param message "http://google.com/api/v2"
 * @param target "/api"
 * @returns "http://google.com"
 */
const fetchStringStopFromTarget = (message, target) => message.substring(0, message.indexOf(target));
exports.fetchStringStopFromTarget = fetchStringStopFromTarget;
/**
 * @param targetNum "7" --   "5"
 * @param padNum    "2" --   "3"
 * @returns        "07" -- "005"
 */
const numberPad = (targetNum, padNum = 2) => {
    targetNum = Number(targetNum);
    padNum = Number(padNum);
    return (new Array(padNum).join('0').slice((padNum) * -1) + targetNum).slice(-2);
};
exports.numberPad = numberPad;
/**
 * @param targetNumber "123.456"
 * @param place "2"
 * @returns "123.45"
 */
const decimalPlace = (targetNumber, place) => targetNumber.toFixed(place);
exports.decimalPlace = decimalPlace;
const fetchMainDomain = (url) => {
    var pathRegex = /(.+?\:\/\/.+?)(\/|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : '';
};
exports.fetchMainDomain = fetchMainDomain;
const fetchExcludeMainDomain = (url) => {
    var pathRegex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : '';
};
exports.fetchExcludeMainDomain = fetchExcludeMainDomain;
const padFullYear = (year) => year ? (new Date()).getFullYear().toString().substring(0, (4 - year.length)) + year : year;
exports.padFullYear = padFullYear;
const removeSpace = (target) => target.replace(/\s/g, "");
exports.removeSpace = removeSpace;
const convertStringEmptyToUndefined = (target) => !target ? target : undefined;
exports.convertStringEmptyToUndefined = convertStringEmptyToUndefined;
