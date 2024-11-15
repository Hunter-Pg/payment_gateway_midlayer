import { YCPGW_Provider_Interface } from "../interface/YCPGW_Provider_Interface";
import { YCPGW_Customer_info, YCPGW_Card_Info, YCPGW_Transaction_Result, YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Card_Token_Reuse_info } from "../model";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
import { YCPGW_Payment_Execute } from "./YCPGW_Payment_Execute";
export declare class YCPGW_Provider extends YCPGW_Lib_Internal implements YCPGW_Provider_Interface {
    protected providerData: YCPGW_Provider_Info;
    protected ycpgwPaymentExecute: YCPGW_Payment_Execute;
    Recurring_Payment_Cancel(transactionId: string): Promise<YCPGW_Transaction_Result>;
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    createPayment(amuontInfo: YCPGW_Amount_Info, transactionInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result>;
    TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result>;
    providerDataSetUP(providerData: YCPGW_Provider_Info): void;
    providerDataFetch(): void;
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
}
