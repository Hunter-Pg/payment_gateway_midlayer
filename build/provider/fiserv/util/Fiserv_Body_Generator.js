"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Body_Generator = void 0;
const YCPGW_Lib_Internal_1 = require("../../../model/YCPGW_Lib_Internal");
const YCPGW_General_Method_1 = require("../../../util_common/YCPGW_General_Method");
const model_1 = require("../model");
const Fiserv_Payment_Body_Card_Token_1 = require("../model/Fiserv_Payment_Body_Card_Token");
class Fiserv_Body_Generator extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    /**
     * template =>
     * {
     * transactionAmount: {total: 12.04, currency: 'EUR'},
     * order: {
     *  basket: {productStock: 'check'},
     *  recurringPaymentDetails: {
     *      additionalRecurringData: {amountIndicator: 'VARIABLE_AMOUNT', validationIndicator: false}
     *  }
     * },
     * paymentMethod: {
     *  paymentCard: {
     *      expiryDate: {month: '12', year: '24'},
     *      number: '5424180279791732',
     *      securityCode: '977'
     *  }
     * },
     * requestType: 'PaymentCardSaleTransaction',
     * storedCredentials: {sequence: 'FIRST', scheduled: true},
     * storeId:"3650645478"
     * }
     */
    fetchPaymentBody(amountInfo, txInfo) {
        if (txInfo.senderType !== this.PAYMENT_FISERV_RETURN
            && !(0, YCPGW_General_Method_1.hasValues)(txInfo.senderInfo))
            throw new Error("Sender Information " + this.ERROR_OBJECT_UNDEFINED);
        return new model_1.Fiserv_Payment_BodyInfo(amountInfo, txInfo);
    }
    fetchCardTokenBody(txInfo, reuseInfo) {
        return new Fiserv_Payment_Body_Card_Token_1.Fiserv_Payment_Body_Card_Token(txInfo, reuseInfo);
    }
}
exports.Fiserv_Body_Generator = Fiserv_Body_Generator;
