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
exports.Fiserv_Transaction_CardSaleTransaction = void 0;
const YCPGW_Payment_Execute_1 = require("../../../core/YCPGW_Payment_Execute");
const util_1 = require("../util");
class Fiserv_Transaction_CardSaleTransaction extends YCPGW_Payment_Execute_1.YCPGW_Payment_Execute {
    //override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fiservHttpHelper)
                this.fiservHttpHelper = new util_1.Fiserv_Http_Helper();
            const reqBody = new util_1.Fiserv_Body_Generator().fetchPaymentBody(amountInfo, txInfo);
            const header = new util_1.Fiserv_Header_Generator().fetchHeader(reqBody);
            return yield this.fiservHttpHelper.executePost(this.ENDPOINT_FISERV_PAYMENTS, reqBody, header);
        });
    }
    //override
    TX_Refund(transactionId, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fiservHttpHelper)
                this.fiservHttpHelper = new util_1.Fiserv_Http_Helper();
            const reqBody = new util_1.Fiserv_Body_Generator().fetchPaymentBody(amountInfo, txInfo);
            const header = new util_1.Fiserv_Header_Generator().fetchHeader(reqBody);
            const action = `${this.ENDPOINT_FISERV_PAYMENTS}/${transactionId}`;
            return yield this.fiservHttpHelper.executePost(action, reqBody, header);
        });
    }
}
exports.Fiserv_Transaction_CardSaleTransaction = Fiserv_Transaction_CardSaleTransaction;
