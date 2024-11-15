import { YCPGW_Payment_Execute_Interface } from "../interface/YCPGW_Payment_Execute_Interface";
import { YCPGW_Customer_info, YCPGW_Card_Info, YCPGW_Transaction_Result, YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Card_Token_Reuse_info } from "../model";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
import { YCPGW_Http_Helper } from "../util_common/YCPGW_Http_Helper";
export declare class YCPGW_Payment_Execute extends YCPGW_Lib_Internal implements YCPGW_Payment_Execute_Interface {
    protected fiservHttpHelper: YCPGW_Http_Helper | undefined;
    protected tillHttpHelper: YCPGW_Http_Helper | undefined;
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result>;
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result>;
    TX_DataBuild(): void;
    Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
}
