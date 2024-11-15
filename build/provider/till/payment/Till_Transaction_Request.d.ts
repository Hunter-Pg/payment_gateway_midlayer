import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
export declare class Till_Transaction_Request extends YCPGW_Payment_Execute {
    private apiVersion;
    private apiKey;
    constructor();
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    private executeTransaction;
}
