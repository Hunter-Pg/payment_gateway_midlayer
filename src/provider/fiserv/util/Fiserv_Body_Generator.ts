import { YCPGW_Amount_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Lib, YCPGW_Transaction_Info } from "../../../model";
import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
import { hasValues } from "../../../util_common/YCPGW_General_Method";
import { Fiserv_Payment_BodyInfo } from "../model";
import { Fiserv_Payment_Body_Card_Token } from "../model/Fiserv_Payment_Body_Card_Token";


export class Fiserv_Body_Generator extends YCPGW_Lib_Internal
{
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
    fetchPaymentBody (amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info) 
    {
        if (txInfo.senderType !== this.PAYMENT_FISERV_RETURN 
            && !hasValues(txInfo.senderInfo)) 
            throw new Error("Sender Information " + this.ERROR_OBJECT_UNDEFINED);
        
        return new Fiserv_Payment_BodyInfo(amountInfo, txInfo);
    }

    fetchCardTokenBody (txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info)
    {
        return new Fiserv_Payment_Body_Card_Token(txInfo, reuseInfo);
    }
    
}