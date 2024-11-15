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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe_Payment_Card_Transaction = void 0;
const YCPGW_Payment_Execute_1 = require("../../../core/YCPGW_Payment_Execute");
const model_1 = require("../../../model");
const YCPGW_Recurring_Info_1 = require("../../../model/YCPGW_Recurring_Info");
const util_1 = require("../util");
class Stripe_Payment_Card_Transaction extends YCPGW_Payment_Execute_1.YCPGW_Payment_Execute {
    constructor() {
        super();
    }
    // override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (txInfo.senderType) {
                case model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN:
                    return yield new util_1.Stripe_SDK().createPayment(amountInfo, txInfo);
                case model_1.YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
                    if (txInfo.receiverInfo instanceof YCPGW_Recurring_Info_1.YCPGW_Recurring_Info)
                        throw new Error(this.ERROR_MISSING_RECURRING_PAYMENT_INFO);
                    return yield new util_1.Stripe_SDK().createRecurringPayment(amountInfo, txInfo);
                default:
                    return new model_1.YCPGW_Transaction_Result();
            }
        });
    }
    // override
    TX_Refund(transactionId, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new util_1.Stripe_SDK().createRefund(transactionId, amountInfo);
        });
    }
    // override
    Recurring_Payment_Cancel(transactionId, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new util_1.Stripe_SDK().cancelResurringPayment(transactionId);
        });
    }
}
exports.Stripe_Payment_Card_Transaction = Stripe_Payment_Card_Transaction;
