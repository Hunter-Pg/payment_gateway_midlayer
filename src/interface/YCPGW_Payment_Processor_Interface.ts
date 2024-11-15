import { YCPGW_Amount_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../model";
import { YCPGW_Provider_SDK_Interface } from "./YCPGW_Provider_SDK_Interface";

export interface  YCPGW_Payment_Processor_Interface extends YCPGW_Provider_SDK_Interface
{
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    TX_Fetch(transactionId: string): any;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info):  Promise<YCPGW_Transaction_Result>;
}