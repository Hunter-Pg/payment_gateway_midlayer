import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Transaction_Result, YCPGW_Customer_info } from "../../../model";
import { Stripe_SDK } from "../util";

export class Stripe_Payment_Customer_Info extends YCPGW_Payment_Execute
{
    async createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> 
    {
        return await new Stripe_SDK().createUserForProvider(userInfo);
    }
}