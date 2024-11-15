import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import {  YCPGW_Card_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import { Stripe_SDK } from "../util";

export class Stripe_Payment_Card_Token extends YCPGW_Payment_Execute
{
    // override
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        return await new Stripe_SDK().createCardToken(txInfo, reuseInfo);
    }
}