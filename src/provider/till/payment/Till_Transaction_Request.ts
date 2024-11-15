import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import { Till_Body_Generator, Till_Header_Generator } from "../util";
import TILL from "../model/Till_Config";
import { Till_Http_Helper } from "../util/Till_Http_Helper";
import { fetchExcludeMainDomain } from "../../../util_common/YCPGW_General_Method";

export class Till_Transaction_Request extends YCPGW_Payment_Execute
{
    private apiVersion: string;
    private apiKey: string;

    constructor ()
    {
        super();
        this.apiVersion = fetchExcludeMainDomain(TILL.TILL_API_URL); // fetch "/api/v3"
        this.apiKey = TILL.TILL_API_KEY;
    }
    //override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        const action = `${this.apiVersion}/${this.ENDPOINT_TILL_TRANSACTION}/${this.apiKey}/${this.ENDPOINT_TILL_TRANSACTION_DEBIT}`;
        return await this.executeTransaction(action, amountInfo, txInfo);
    }
    //override
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        const action = `${this.apiVersion}/${this.ENDPOINT_TILL_TRANSACTION}/${this.apiKey}/${this.ENDPOINT_TILL_TRANSACTION_REFUND}`;
        if (txInfo) txInfo.transactionId = transactionId;
        
        return await this.executeTransaction(action, amountInfo, txInfo);
    }

    private async executeTransaction (actionEndpoint: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        if (!this.tillHttpHelper) this.tillHttpHelper = new Till_Http_Helper();
        
        const action = actionEndpoint;
        const reqBody = new Till_Body_Generator().fetchPaymentBody(amountInfo, txInfo!);
        const header = new Till_Header_Generator().fetchHeader(reqBody, action);
        
        return await this.tillHttpHelper.executePost(action, reqBody, header);
    }
}