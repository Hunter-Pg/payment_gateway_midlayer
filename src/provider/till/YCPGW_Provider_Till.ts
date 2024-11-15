import { YCPGW_Provider } from "../../core/YCPGW_Provider";
import { YCPGW_Transaction_Info, YCPGW_Lib, YCPGW_Amount_Info, YCPGW_Transaction_Result, YCPGW_Card_Info, YCPGW_Card_Token_Reuse_info } from "../../model";
import TILL from "./model/Till_Config";
import { Till_Payment_Card_Token, Till_Transaction_Request } from "./payment";

export class YCPGW_Provider_Till extends YCPGW_Provider
{
    constructor (providerData: YCPGW_Provider_Info)
    {
        super();
        this.providerDataSetUp(providerData);        
    }

    //override
    providerDataSetUp(tillInfo: YCPGW_Provider_Info) 
    {
        if (!tillInfo.provider_key) throw new Error(this.PROVIDER_TILL_MISS_KEY);
        TILL.TILL_API_KEY = tillInfo.provider_key!;
        
        if (!tillInfo.provider_secret) throw new Error(this.PROVIDER_TILL_MISS_SECRET);
        TILL.TILL_API_SECRET = tillInfo.provider_secret!;

        if (!tillInfo.provider_url) throw new Error(this.PROVIDER_TILL_MISS_URL);
        TILL.TILL_API_URL = tillInfo.provider_url!;

        if (!tillInfo.provider_user) throw new Error(this.PROVIDER_TILL_MISS_USER_NAME);
        TILL.TILL_API_USER = tillInfo.provider_user!;

        if (!tillInfo.provider_psd) throw new Error(this.PROVIDER_TILL_MISS_PASSWORD);
        TILL.TILL_API_PSD = tillInfo.provider_psd!;

        TILL.TILL_API_TEST_MODE = tillInfo.payment_test_mode?? false;
    }

    // override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info) 
    {
        this.createPaymentExecutor(txInfo);
        return await this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
    }
    // overiding
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        this.ycpgwPaymentExecute = new Till_Payment_Card_Token();
        
        return await this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo);
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

    private createPaymentExecutor(txInfo: YCPGW_Transaction_Info)
    {
        switch (txInfo.senderType)
        {
            case YCPGW_Lib.PAYMENT_CARD:
            case YCPGW_Lib.PAYMENT_CARD_TOKEN:
            case YCPGW_Lib.PAYMENT_REFUND:
                this.ycpgwPaymentExecute = new Till_Transaction_Request();
                break;
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
}