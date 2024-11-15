import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
import STRIPE from "./../model/Stripe_Config";

export class Stripe_Header_Generator extends YCPGW_Lib_Internal
{
    private apiKey: string;

    constructor ()
    {
        super();
        this.apiKey= STRIPE.STRIPE_API_KEY;
    }
    
    fetchHeader ()
    {
        return {
            headers: {
                "Content-Type": "pplication/x-www-form-urlencoded",
                "Authorization": `Bearer ${this.apiKey}`,
            }        
        }
    }
}    

