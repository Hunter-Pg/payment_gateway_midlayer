"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Provider = void 0;
const YCPGW_Lib_Internal_1 = require("../model/YCPGW_Lib_Internal");
class YCPGW_Provider extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    Recurring_Payment_Cancel(transactionId) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    Card_Token_Fetch(txInfo, reuseInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    TX_Refund(transactionId, amountInfo, txInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    createUserForProvider(userInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    createPayment(amuontInfo, transactionInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    fetchCardInformation(cardTokenInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    TX_Fetch(transactionId) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    providerDataSetUP(providerData) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    providerDataFetch() { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    TX_Execute(amountInfo, txInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
}
exports.YCPGW_Provider = YCPGW_Provider;
