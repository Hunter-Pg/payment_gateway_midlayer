import { YCPGW_Provider } from "../../core/YCPGW_Provider";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Customer_info, YCPGW_Card_Token_Reuse_info } from "../../model";
export declare class YCPGW_Provider_Stripe extends YCPGW_Provider {
    constructor(providerData: YCPGW_Provider_Info);
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result>;
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    providerDataSetUP(stripeInfo: YCPGW_Provider_Info): void;
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    private createPaymentExecutor;
    private checkInput;
}
