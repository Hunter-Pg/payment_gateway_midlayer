import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { YCPGW_Amount_Info, YCPGW_Lib, YCPGW_Transaction_Info, YCPGW_Transaction_Result } from "../../../model";
import { YCPGW_Recurring_Info } from "../../../model/YCPGW_Recurring_Info";
import { Stripe_SDK } from "../util";

export class Stripe_Payment_Card_Transaction extends YCPGW_Payment_Execute
{
    constructor ()
    {
        super();
    }
    
    // override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        switch (txInfo.senderType)
        {
            case YCPGW_Lib.PAYMENT_CARD_TOKEN:
                return await new Stripe_SDK().createPayment(amountInfo, txInfo);
            case YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
                if (txInfo.receiverInfo instanceof YCPGW_Recurring_Info) throw new Error(this.ERROR_MISSING_RECURRING_PAYMENT_INFO);
                return await new Stripe_SDK().createRecurringPayment(amountInfo, txInfo);
            default:
                return new YCPGW_Transaction_Result();
        }
    }

    // override
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        return await new Stripe_SDK().createRefund(transactionId, amountInfo);
    }

    // override
    async Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> 
    {
        return await new Stripe_SDK().cancelResurringPayment(transactionId);
    }
}