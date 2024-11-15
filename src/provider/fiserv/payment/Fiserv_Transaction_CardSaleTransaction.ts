
import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import { Fiserv_Body_Generator, Fiserv_Header_Generator, Fiserv_Http_Helper } from "../util";

export class Fiserv_Transaction_CardSaleTransaction extends YCPGW_Payment_Execute
{
    //override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<any>
    {
        if (!this.fiservHttpHelper) this.fiservHttpHelper = new Fiserv_Http_Helper();

        const reqBody = new Fiserv_Body_Generator().fetchPaymentBody(amountInfo, txInfo);
        const header = new Fiserv_Header_Generator().fetchHeader(reqBody);
        
        return await this.fiservHttpHelper.executePost(this.ENDPOINT_FISERV_PAYMENTS, reqBody, header);
    }

    //override
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        if (!this.fiservHttpHelper) this.fiservHttpHelper = new Fiserv_Http_Helper();

        const reqBody = new Fiserv_Body_Generator().fetchPaymentBody(amountInfo, txInfo!);
        const header = new Fiserv_Header_Generator().fetchHeader(reqBody);
        const action = `${this.ENDPOINT_FISERV_PAYMENTS}/${transactionId}`;
        
        return await this.fiservHttpHelper.executePost(action, reqBody, header);
    }
}