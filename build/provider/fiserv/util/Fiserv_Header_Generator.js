"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Header_Generator = void 0;
const Fiserv_Config_1 = __importDefault(require("../model/Fiserv_Config"));
const uuid_1 = require("uuid");
const YCPGW_Lib_Internal_1 = require("../../../model/YCPGW_Lib_Internal");
const YCPGW_General_Method_1 = require("../../../util_common/YCPGW_General_Method");
class Fiserv_Header_Generator extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    constructor() {
        super();
        this.apiKey = Fiserv_Config_1.default.FISERV_API_KEY;
        this.apiSecret = Fiserv_Config_1.default.FISERV_API_SECRET;
    }
    fetchHeader(requestBody) {
        const msgSign = this.fetchMessageSignature(requestBody);
        return {
            headers: {
                "Content-Type": "application/json",
                "Client-Request-Id": this.clientReqId,
                "Api-Key": this.apiKey,
                "Timestamp": this.timestampMs,
                "Message-Signature": msgSign
            }
        };
    }
    fetchMessageSignature(requestBody) {
        this.clientReqId = (0, uuid_1.v4)();
        this.timestampMs = new Date().getTime();
        let rawSignature;
        if (requestBody)
            rawSignature = this.apiKey + this.clientReqId + this.timestampMs + JSON.stringify(requestBody);
        else
            rawSignature = this.apiKey + this.clientReqId + this.timestampMs;
        //DEBUG
        if (this.DEBUG_MODE)
            this.deBugMode(requestBody);
        var computedHmac = (0, YCPGW_General_Method_1.createHashBase64)(rawSignature, this.apiSecret, this.GENERAL_SHA256);
        return computedHmac;
    }
    deBugMode(requestBody) {
        console.log("::> Fiserv > apiKey: ", this.apiKey);
        console.log("::> Fiserv > apiSecret: ", this.apiSecret);
        console.log("::> Fiserv > clientReqId: ", this.clientReqId);
        console.log("::> Fiserv > timestampMs: ", this.timestampMs);
        console.log("::> Fiserv > requestBody: ", JSON.stringify(requestBody));
    }
}
exports.Fiserv_Header_Generator = Fiserv_Header_Generator;
