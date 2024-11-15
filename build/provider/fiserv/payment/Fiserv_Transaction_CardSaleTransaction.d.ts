import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
export declare class Fiserv_Transaction_CardSaleTransaction extends YCPGW_Payment_Execute {
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<any>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
}
