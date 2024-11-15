"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Till_Header_Generator = void 0;
const YCPGW_Lib_Internal_1 = require("../../../model/YCPGW_Lib_Internal");
const YCPGW_General_Method_1 = require("../../../util_common/YCPGW_General_Method");
const Till_Config_1 = __importDefault(require("../model/Till_Config"));
class Till_Header_Generator extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    constructor() {
        super();
        this.apiSecret = Till_Config_1.default.TILL_API_SECRET;
        this.apiUser = Till_Config_1.default.TILL_API_USER;
        this.apiPsd = Till_Config_1.default.TILL_API_PSD;
        this.testMode = Till_Config_1.default.TILL_API_TEST_MODE;
    }
    fetchHeader(requestBody, endpoint) {
        const authApi = this.fetchAuth();
        const msgSign = this.fetchMessageSignature(requestBody, endpoint);
        //DEBUG
        if (this.DEBUG_MODE)
            this.deBugMode(requestBody, endpoint, authApi);
        let headerApi = {
            headers: {
                "Authorization": authApi,
                "Content-Type": this.HEADER_CONTENT_TYPE_UTF8,
                "Date": this.timestamp,
                "X-Signature": msgSign
            }
        };
        if (this.testMode)
            headerApi.headers["X-Environment"] = "Sandbox";
        return headerApi;
    }
    fetchMessageSignature(requestBody, endpoint) {
        const method = this.HEADER_TILL_METHOD_POST;
        const reqBodySHA512 = (0, YCPGW_General_Method_1.createSHA512)(JSON.stringify(requestBody));
        const contentType = this.HEADER_CONTENT_TYPE_UTF8;
        this.timestamp = new Date().toUTCString();
        const rawSignature = (new Array(method, reqBodySHA512, contentType, this.timestamp, endpoint)).join("\n");
        const computedHmac = (0, YCPGW_General_Method_1.createHashBase64)(rawSignature, this.apiSecret, this.GENERAL_SHA512);
        return computedHmac;
    }
    fetchAuth() {
        let authApiAry = new Array(this.HEADER_TILL_AUTH);
        let userAndPsdStr = (new Array(this.apiUser, this.apiPsd)).join(":");
        authApiAry.push(Buffer.from(userAndPsdStr).toString(this.GENERAL_BASE64));
        return authApiAry.join(" ");
    }
    deBugMode(...ary) {
        console.log("::> Till > endpoint: ", ary[1]);
        console.log("::> Till > authApi: ", ary[2]);
        console.log("::> Till > apiSecret: ", this.apiSecret);
        console.log("::> Till > timestamp: ", this.timestamp);
        console.log("::> Till > requestBody: ", JSON.stringify(ary[0]));
    }
}
exports.Till_Header_Generator = Till_Header_Generator;
