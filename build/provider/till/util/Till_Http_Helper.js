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
exports.Till_Http_Helper = void 0;
const YCPGW_Transaction_Result_1 = require("../../../model/YCPGW_Transaction_Result");
const util_common_1 = require("../../../util_common");
const Till_Config_1 = __importDefault(require("../model/Till_Config"));
class Till_Http_Helper extends util_common_1.YCPGW_Http_Helper {
    constructor() {
        super(...arguments);
        this.API_URL = (0, util_common_1.fetchMainDomain)(Till_Config_1.default.TILL_API_URL);
    }
    //override
    executePost(action, body, header) {
        const _super = Object.create(null, {
            executePost: { get: () => super.executePost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = this.API_URL + action;
                const result = yield _super.executePost.call(this, endpoint, body, header);
                if (action.includes(this.ENDPOINT_TILL_TRANSACTION_DEBIT))
                    return this.createPaymentResponseResult(result);
                else if (action.includes(this.ENDPOINT_TILL_TRANSACTION_REGISTER))
                    return this.createCardTokenResponseResult(result);
                else if (action.includes(this.ENDPOINT_TILL_TRANSACTION_REFUND))
                    return this.createRefundResponseResult(result);
            }
            catch (error) {
                console.log("::> Till > error: ", error);
            }
        });
    }
    //override
    executeGet(transactionId, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log("::> Till > error: ", error);
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
        if (result.data)
            return this.createPaymentResponseResultSuccessful(result);
        else
            return this.createPaymentResponseResultFailed(result);
    }
    createPaymentResponseResultSuccessful(result) {
        if (this.DEBUG_MODE)
            console.log("::> Till > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let status;
        let description;
        const resData = result.data;
        transactionId = resData.uuid;
        status = resData.returnType;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createPaymentResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::> Till > response: ", result.response);
        if (!result.response.data)
            throw new Error(this.RESPONSE_ERROR_GENERAL);
        let userId = this.GENERAL_NONE;
        let transactionId = this.GENERAL_NONE;
        let successful = false;
        let status;
        let description;
        const resData = result.response;
        status = resData.statusText;
        if (resData.data.errorMessage)
            description = resData.data.errorMessage;
        else
            description = resData.data.error.message;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createCardTokenResponseResult(result) {
        if (result.data)
            return this.createCardTokenResponseResultSuccessful(result);
        else
            return this.createCardTokenResponseResultFailed(result);
    }
    createCardTokenResponseResultSuccessful(result) {
        if (this.DEBUG_MODE)
            console.log("::> Till > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let cardToken;
        let fingerprint;
        let description;
        const resData = result.data;
        transactionId = resData.purchaseId;
        cardToken = resData.uuid;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;
        fingerprint = resData.returnData.merchantFingerprint;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
    createCardTokenResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::> Till > response: ", result.response);
        if (!result.response.data)
            throw new Error(this.RESPONSE_ERROR_GENERAL);
        let userId = this.GENERAL_NONE;
        let transactionId = this.GENERAL_NONE;
        let successful = false;
        let cardToken = this.GENERAL_NONE;
        let fingerprint = this.GENERAL_NONE;
        let description;
        const resData = result.response;
        if (resData.data.errorMessage)
            description = resData.data.errorMessage;
        else
            description = resData.data.error.message;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
    createRefundResponseResult(result) {
        if (result.data)
            return this.createRefundponseResultSuccessful(result);
        else
            return this.createRefundResponseResultFailed(result);
    }
    createRefundponseResultSuccessful(result) {
        return this.createPaymentResponseResultSuccessful(result);
    }
    createRefundResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::> Till > response: ", result.response);
        if (!result.data)
            throw new Error(this.RESPONSE_ERROR_GENERAL);
        let userId = this.GENERAL_NONE;
        let transactionId = this.GENERAL_NONE;
        let successful = false;
        let status;
        let description;
        const resData = result.data;
        transactionId = resData.uuid;
        status = resData.returnType;
        description = resData.errors[0].errorMessage;
        return new YCPGW_Transaction_Result_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
}
exports.Till_Http_Helper = Till_Http_Helper;
