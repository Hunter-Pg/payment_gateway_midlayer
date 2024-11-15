import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import TILL from "../model/Till_Config";
import { fetchExcludeMainDomain } from "../../../util_common/YCPGW_General_Method";
import { Till_Http_Helper } from "../util/Till_Http_Helper";
import { Till_Body_Generator, Till_Header_Generator } from "../util";

export class Till_Payment_Card_Token extends YCPGW_Payment_Execute
{
    // override
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        if (reuseInfo?.customerInfo) console.warn(this.WARNNING_CUSTOMER_INFO_ERROR);
        if (!this.tillHttpHelper) this.tillHttpHelper = new Till_Http_Helper();

        const apiVersion = fetchExcludeMainDomain(TILL.TILL_API_URL); // fetch "/api/v3"
        const action = `${apiVersion}/${this.ENDPOINT_TILL_TRANSACTION}/${TILL.TILL_API_KEY}/${this.ENDPOINT_TILL_TRANSACTION_REGISTER}`;

        const reqBody = new Till_Body_Generator().fetchCardTokenBody(txInfo);
        const header = new Till_Header_Generator().fetchHeader(reqBody, action);   
        
        return await this.tillHttpHelper.executePost(action, reqBody, header);
    }
}