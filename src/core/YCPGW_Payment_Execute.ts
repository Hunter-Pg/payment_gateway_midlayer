import { YCPGW_Payment_Execute_Interface } from "../interface/YCPGW_Payment_Execute_Interface";
import { YCPGW_Customer_info, YCPGW_Card_Info, YCPGW_Transaction_Result, YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Card_Token_Reuse_info } from "../model";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
import { YCPGW_Http_Helper } from "../util_common/YCPGW_Http_Helper";

export class YCPGW_Payment_Execute extends YCPGW_Lib_Internal implements YCPGW_Payment_Execute_Interface
{
    protected fiservHttpHelper: YCPGW_Http_Helper | undefined;
    protected tillHttpHelper: YCPGW_Http_Helper | undefined;
    
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result> {throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> {throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    async TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    TX_DataBuild() { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>{throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
}