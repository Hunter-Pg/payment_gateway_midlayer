"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Till_PaymentMethod_Card = void 0;
const util_common_1 = require("../../../util_common");
class Till_PaymentMethod_Card {
    constructor(cardInfo) {
        this.cardHolder = cardInfo.cardHolder;
        this.pan = (0, util_common_1.removeSpace)(cardInfo.number);
        this.cvv = cardInfo.securityCode;
        this.expirationMonth = (0, util_common_1.numberPad)(cardInfo.expiryMonth, 2);
        this.expirationYear = (0, util_common_1.padFullYear)(cardInfo.expiryYear);
    }
}
exports.Till_PaymentMethod_Card = Till_PaymentMethod_Card;
