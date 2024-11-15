import { YCPGW_Provider_SDK } from "../../../core/YCPGW_Provider_SDK";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Customer_info, YCPGW_Card_Token_Reuse_info } from '../../../model';
export declare class Stripe_SDK extends YCPGW_Provider_SDK {
    private stripeSDK;
    constructor();
    createPayment(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    createRecurringPayment(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    createRecurringPaymentProduction(): Promise<YCPGW_Transaction_Result>;
    createRecurringPaymentPrice(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info, productionId: string): Promise<YCPGW_Transaction_Result>;
    cancelResurringPayment(transactionId: string): Promise<YCPGW_Transaction_Result>;
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    createRefund(transactionId: string, amountInfo: YCPGW_Amount_Info): Promise<YCPGW_Transaction_Result>;
    createCardToken(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    private createSingleUseCardToken;
    private createPermanentUseCardToken;
    private createResponseResultSuccessful;
    private createResponseResultFailed;
    private createCardTokenResultSuccessful;
    private createCardTokenResultFailed;
}
