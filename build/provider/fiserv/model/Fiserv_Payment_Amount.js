"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Payment_Amount = void 0;
const util_common_1 = require("../../../util_common");
class Fiserv_Payment_Amount {
    constructor(total, currency) {
        this.total = Number((0, util_common_1.decimalPlace)(total, 2));
        this.currency = currency;
    }
}
exports.Fiserv_Payment_Amount = Fiserv_Payment_Amount;
