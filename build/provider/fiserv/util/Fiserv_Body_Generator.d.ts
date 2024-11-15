import { YCPGW_Amount_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info } from "../../../model";
import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
import { Fiserv_Payment_BodyInfo } from "../model";
import { Fiserv_Payment_Body_Card_Token } from "../model/Fiserv_Payment_Body_Card_Token";
export declare class Fiserv_Body_Generator extends YCPGW_Lib_Internal {
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
    fetchPaymentBody(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Fiserv_Payment_BodyInfo;
    fetchCardTokenBody(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Fiserv_Payment_Body_Card_Token;
}
