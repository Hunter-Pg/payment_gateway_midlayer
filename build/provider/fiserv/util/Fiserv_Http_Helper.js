"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Http_Helper = void 0;
const YCPGW_Transaction_Result_1 = require("../../../model/YCPGW_Transaction_Result");
const YCPGW_Http_Helper_1 = require("../../../util_common/YCPGW_Http_Helper");
const Fiserv_Config_1 = __importDefault(require("../model/Fiserv_Config"));
class Fiserv_Http_Helper extends YCPGW_Http_Helper_1.YCPGW_Http_Helper {
    constructor() {
        super(...arguments);
        this.API_URL = Fiserv_Config_1.default.FISERV_API_URL;
    }
    //override
    executePost(action, body, header, fingerprint) {
        const _super = Object.create(null, {
            executePost: { get: () => super.executePost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = this.API_URL + action;
                const result = yield _super.executePost.call(this, endpoint, body, header);
                switch (action) {
                    case this.ENDPOINT_FISERV_PAYMENTS:
                        return this.createPaymentResponseResult(result);
                    case this.ENDPOINT_FISERV_PAYMENT_TOKENS:
                        return this.createCardTokenResponseResult(result, fingerprint);
                    default: // REFUND RESULT
                        return this.createPaymentResponseResult(result);
                }
            }
            catch (error) {
                console.log("::> Fiserv > error: ", error);
            }
        });
    }
    //override
    executeGet(transactionId, header) {
        const _super = Object.create(null, {
            executeGet: { get: () => super.executeGet }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = `${this.API_URL}${this.ENDPOINT_FISERV_PAYMENTS}/${transactionId}`;
                return yield _super.executeGet.call(this, endpoint, header);
            }
            catch (error) {
                console.log("::>  Fiserv > error: ", error);
            }
        });
    }
    //override
    executePatch() {
    }
    /**
     * structure of response ::
     * ::> success : result.status
     * ::> error   : result.response.status
     */
    createPaymentResponseResult(result) {
        if (result.status)
            return this.createPaymentResponseResultSuccessful(result);
        else
            return this.createPaymentResponseResultFailed(result);
    }
    createPaymentResponseResultSuccessful(result) {
        if (this.DEBUG_MODE)
            console.log("::>  Fiserv > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let status;
        let description;
        transactionId = result.data.ipgTransactionId;
        status = result.data.transactionStatus;
        description = result.data.processor.responseMessage;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createPaymentResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::>  Fiserv > response: ", result.response);
        if (!result.response.data)
            throw new Error(this.RESPONSE_ERROR_GENERAL);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = false;
        let status;
        let description;
        transactionId = result.response.data.ipgTransactionId;
        if (result.response.data.errorMessage) {
            status = result.response.data.ipgTransactionId;
            status = result.response.data.transactionStatus;
            description = result.response.data.errorMessage;
        }
        else {
            status = result.response.data.responseType;
            if (result.response.data.error.details)
                description = result.response.data.error.details[0].message;
            else
                description = result.response.data.error.message;
        }
        status = this.RESPONSE_STATUS_ARRAY.includes(status) ? status : this.RESPONSE_STATUS_ARRAY[2];
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createCardTokenResponseResult(result, fingerprint) {
        if (result.status === 200)
            return this.createCardTokenResponseResultSuccessful(result, fingerprint);
        else
            return this.createCardTokenResponseResultFailed(result);
    }
    createCardTokenResponseResultSuccessful(result, fingerprint) {
        if (this.DEBUG_MODE)
            console.log("::>  Fiserv > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let cardToken;
        let description;
        transactionId = result.data.ipgTransactionId;
        cardToken = result.data.paymentToken.value;
        description = result.data.requestStatus;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
    createCardTokenResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::>  Fiserv > response: ", result.response);
        if (!result.response.data)
            throw new Error(this.RESPONSE_ERROR_GENERAL);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = false;
        let cardToken = this.GENERAL_NONE;
        let fingerprint = this.GENERAL_NONE;
        let description;
        transactionId = result.response.data.ipgTransactionId;
        if (result.response.data.error.details)
            description = result.response.data.error.details[0].message;
        else
            description = result.response.data.error.message;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
}
exports.Fiserv_Http_Helper = Fiserv_Http_Helper;
