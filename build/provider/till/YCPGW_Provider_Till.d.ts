import { YCPGW_Provider } from "../../core/YCPGW_Provider";
import { YCPGW_Transaction_Info, YCPGW_Amount_Info, YCPGW_Transaction_Result, YCPGW_Card_Token_Reuse_info } from "../../model";
export declare class YCPGW_Provider_Till extends YCPGW_Provider {
    constructor(providerData: YCPGW_Provider_Info);
    providerDataSetUp(tillInfo: YCPGW_Provider_Info): void;
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    private createPaymentExecutor;
}
