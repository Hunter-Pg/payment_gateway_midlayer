"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Till_Payment_BodyInfo = void 0;
const model_1 = require("../../../model");
const uuid_1 = require("uuid");
const Till_PaymentMethod_Card_1 = require("./Till_PaymentMethod_Card");
const util_common_1 = require("../../../util_common");
class Till_Payment_BodyInfo {
    constructor(amountInfo, txInfo) {
        const senderType = txInfo.senderType;
        this.merchantTransactionId = (0, uuid_1.v4)();
        this.amount = (0, util_common_1.decimalPlace)(amountInfo.total, 2);
        this.currency = amountInfo.currency;
        const cardInfo = txInfo.senderInfo;
        // payment
        if (cardInfo) {
            if (model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN == senderType)
                this.referenceUuid = cardInfo.cardTokenId;
            else if (model_1.YCPGW_Lib.PAYMENT_CARD == senderType)
                this.cardData = new Till_PaymentMethod_Card_1.Till_PaymentMethod_Card(cardInfo);
        }
        // refund
        if (txInfo.transactionId)
            this.referenceUuid = txInfo.transactionId;
    }
}
exports.Till_Payment_BodyInfo = Till_Payment_BodyInfo;
