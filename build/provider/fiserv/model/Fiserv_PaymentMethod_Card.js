"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_PaymentMethod_Card = void 0;
const util_common_1 = require("../../../util_common");
class Fiserv_PaymentMethod_Card {
    constructor(cardInfo) {
        this.paymentCard = new Object();
        this.paymentCard.number = (0, util_common_1.removeSpace)(cardInfo.number);
        this.paymentCard.securityCode = cardInfo.securityCode;
        this.paymentCard.expiryDate = new cardExpiryDate(cardInfo.expiryMonth, cardInfo.expiryYear);
    }
}
exports.Fiserv_PaymentMethod_Card = Fiserv_PaymentMethod_Card;
class cardExpiryDate {
    constructor(expiryMonth, expiryYear) {
        this.month = (0, util_common_1.numberPad)(expiryMonth, 2);
        this.year = expiryYear;
    }
}
