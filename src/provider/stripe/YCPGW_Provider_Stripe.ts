import { YCPGW_Provider } from "../../core/YCPGW_Provider";
import { YCPGW_Amount_Info, YCPGW_Lib, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Customer_info, YCPGW_Card_Token_Reuse_info, YCPGW_Card_Info } from "../../model";
import { YCPGW_Recurring_Info } from "../../model/YCPGW_Recurring_Info";
import STRIPE from "./model/Stripe_Config";
import { Stripe_Payment_Customer_Info, Stripe_Payment_Card_Transaction, Stripe_Payment_Card_Token } from "./payment";

export class YCPGW_Provider_Stripe extends YCPGW_Provider
{
    constructor (providerData: YCPGW_Provider_Info)
    {
        super(); 
        this.providerDataSetUP(providerData); 
    }

    // override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info) 
    {
        this.createPaymentExecutor(txInfo);
        return await this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
    }

    // override
    async TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result> 
    {
        throw new Error(this.FUNCTION_NOT_IMOLEMENT);
    }

    // override
    async createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> 
    {
        this.ycpgwPaymentExecute = new Stripe_Payment_Customer_Info();
        return await this.ycpgwPaymentExecute.createUserForProvider(userInfo);
    }

    // override
    providerDataSetUP(stripeInfo: YCPGW_Provider_Info): void 
    {
        if (!stripeInfo.provider_key) throw new Error(this.PROVIDER_STRIPE_MISS_KEY);

        STRIPE.STRIPE_API_KEY = stripeInfo.provider_key!;
        STRIPE.STRIPE_API_TEST_MODE = stripeInfo.payment_test_mode?? false;
    }

    // overiding
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        this.ycpgwPaymentExecute = new Stripe_Payment_Card_Token();
        return await this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo, reuseInfo);
    }

    //override
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        let refundInfo: any;
        if (txInfo)
            refundInfo = txInfo;
        else
            refundInfo = new YCPGW_Transaction_Info (
                YCPGW_Lib.PAYMENT_REFUND, 
                new YCPGW_Card_Info());

        this.createPaymentExecutor(refundInfo);
        return await this.ycpgwPaymentExecute.TX_Refund(transactionId, amountInfo, refundInfo);
    }

    // override
    async Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> 
    {
        let recurringInfo: any;
        if (txInfo)
        recurringInfo = txInfo;
        else
        recurringInfo = new YCPGW_Transaction_Info (
                YCPGW_Lib.PAYMENT_RECURRING_CANCELED, 
                new YCPGW_Card_Info());

        this.createPaymentExecutor(recurringInfo);
        return await this.ycpgwPaymentExecute.Recurring_Payment_Cancel(transactionId);
    }

    private createPaymentExecutor(txInfo: YCPGW_Transaction_Info)
    {
        this.checkInput(txInfo);

        switch (txInfo.senderType)
        {
            case YCPGW_Lib.PAYMENT_CARD_TOKEN:
            case YCPGW_Lib.PAYMENT_REFUND:
            case YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
            case YCPGW_Lib.PAYMENT_RECURRING_CANCELED:
                this.ycpgwPaymentExecute = new Stripe_Payment_Card_Transaction();
                break;
        }
    }

    private checkInput(txInfo: YCPGW_Transaction_Info)
    {
        switch (txInfo.senderType)
        {
            case YCPGW_Lib.PAYMENT_CARD_TOKEN:
                if (!(txInfo.senderInfo instanceof YCPGW_Card_Info)) throw new Error(this.ERROR_MISSING_CLASS_CARD_INFO);
                
                let sendInfoToken = txInfo.senderInfo as YCPGW_Card_Info;
                if (!sendInfoToken.cardTokenId) throw new Error(this.PAYMENT_WITH_CARD_TOKEN_ERROR);
                break;
            case YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
                if (!(txInfo.senderInfo instanceof YCPGW_Recurring_Info)) throw new Error(this.ERROR_MISSING_CLASS_RESURRING_INFO);
                
                let sendInfoRecurring = txInfo.senderInfo as YCPGW_Recurring_Info;
                const intervalInput: any = sendInfoRecurring.frequency.unit;
                if (!YCPGW_Lib.RESURRING_PAYMENT_INTERVAL_ARRAY.includes(intervalInput)) throw new Error(this.ERROR_MISSING_INTERVAL_TYPE);
                break;
            case YCPGW_Lib.PAYMENT_RECURRING_CANCELED:
                break;
            case YCPGW_Lib.PAYMENT_REFUND:
                break;
            case YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD:
                throw new Error(this.PAYMENT_TYPE_CARD_TOKEN_RESURRING_ERROR);
            case YCPGW_Lib.PAYMENT_CARD:
                throw new Error(this.PAYMENT_TYPE_CARD_TOKEN_ERROR);
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
}