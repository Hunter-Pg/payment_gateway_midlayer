import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import {  YCPGW_Card_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import { Fiserv_Body_Generator, Fiserv_Header_Generator, Fiserv_Http_Helper } from "../util";
import FISERV from "../model/Fiserv_Config";
import { createHashBase64 } from "../../../util_common/YCPGW_General_Method";

export class Fiserv_Payment_Card_Token extends YCPGW_Payment_Execute
{

    // override
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        if (reuseInfo?.customerInfo) console.warn(this.WARNNING_CUSTOMER_INFO_ERROR);
        if (!this.fiservHttpHelper) this.fiservHttpHelper = new Fiserv_Http_Helper();

        const reqBody = new Fiserv_Body_Generator().fetchCardTokenBody(txInfo, reuseInfo);
        const header = new Fiserv_Header_Generator().fetchHeader(reqBody);

        let cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        const numberOfCard = cardInfo.number + cardInfo.expiryMonth + cardInfo.expiryYear + cardInfo.securityCode;
        const cardEncode = createHashBase64(numberOfCard, FISERV.FISERV_API_SECRET, this.GENERAL_SHA256);        
        
        return await this.fiservHttpHelper.executePost(this.ENDPOINT_FISERV_PAYMENT_TOKENS, reqBody, header, cardEncode);
    }
}