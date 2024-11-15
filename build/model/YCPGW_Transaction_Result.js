"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Transaction_Result = void 0;
const YCPGW_Common_Info_1 = require("./YCPGW_Common_Info");
class YCPGW_Transaction_Result extends YCPGW_Common_Info_1.YCPGW_Common_Info {
    createPaymentResponse(userId, transactionId, successful, status, message, responseFromProvider) {
        this.userId = userId;
        this.transactionId = transactionId;
        this.successful = successful;
        this.status = status;
        this.description = message;
        this.responseFromProvider = responseFromProvider;
        return this;
    }
    createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, message, responseFromProvider) {
        this.userId = userId;
        this.transactionId = transactionId;
        this.successful = successful;
        this.cardToken = cardToken;
        this.fingerprint = fingerprint;
        this.description = message;
        this.responseFromProvider = responseFromProvider;
        return this;
    }
}
exports.YCPGW_Transaction_Result = YCPGW_Transaction_Result;
