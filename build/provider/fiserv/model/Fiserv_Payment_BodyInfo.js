"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Payment_BodyInfo = void 0;
const Fiserv_Payment_Amount_1 = require("./Fiserv_Payment_Amount");
const Fiserv_PaymentMethod_Card_1 = require("./Fiserv_PaymentMethod_Card");
const Fiserv_PaymentMethod_Card_Token_1 = require("./Fiserv_PaymentMethod_Card_Token");
class Fiserv_Payment_BodyInfo {
    constructor(amountInfo, txInfo) {
        var _a;
        let cardInfo = txInfo.senderInfo;
        this.transactionAmount = new Fiserv_Payment_Amount_1.Fiserv_Payment_Amount(amountInfo.total, amountInfo.currency);
        if (cardInfo) {
            if (cardInfo.cardTokenId)
                this.paymentMethod = new Fiserv_PaymentMethod_Card_Token_1.Fiserv_PaymentMethod_Card_Token(cardInfo);
            else if (cardInfo.number)
                this.paymentMethod = new Fiserv_PaymentMethod_Card_1.Fiserv_PaymentMethod_Card(cardInfo);
        }
        this.requestType = txInfo.senderType;
        this.storeId = (_a = txInfo.receiverInfo) === null || _a === void 0 ? void 0 : _a.storeId;
    }
}
exports.Fiserv_Payment_BodyInfo = Fiserv_Payment_BodyInfo;
