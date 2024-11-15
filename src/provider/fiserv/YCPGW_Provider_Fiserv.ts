
import { YCPGW_Provider } from "../../core/YCPGW_Provider";
import { YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Lib, YCPGW_Transaction_Result, YCPGW_Card_Info, YCPGW_Card_Token_Reuse_info } from "../../model";
import FISERV from "./model/Fiserv_Config";
import { Fiserv_Transaction_Information, Fiserv_Payment_Card_Token, Fiserv_Transaction_CardSaleTransaction } from "./payment";

export class YCPGW_Provider_Fiserv extends YCPGW_Provider
{  
    constructor (providerData: YCPGW_Provider_Info)
    {
        super();
        this.providerDataSetUp(providerData);        
    }

    // override
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info) 
    {
        this.createPaymentExecutor(txInfo);
        return await this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
    }

    //override
    async TX_Fetch(transactionId: string)
    {
        this.ycpgwPaymentExecute = new Fiserv_Transaction_Information();
        return await this.ycpgwPaymentExecute.TX_Fetch(transactionId);
    }

    //override
    providerDataSetUp(fiservInfo: YCPGW_Provider_Info): void 
    {
        if (!fiservInfo.provider_key) throw new Error(this.PROVIDER_FISERV_MISS_KEY);
        FISERV.FISERV_API_KEY = fiservInfo.provider_key!;
        
        if (!fiservInfo.provider_secret) throw new Error(this.PROVIDER_FISERV_MISS_SECRET);
        FISERV.FISERV_API_SECRET = fiservInfo.provider_secret!;

        if (!fiservInfo.provider_url) throw new Error(this.PROVIDER_FISERV_MISS_URL);
        FISERV.FISERV_API_URL = fiservInfo.provider_url!;

        FISERV.FISERV_API_TEST_MODE = fiservInfo.payment_test_mode?? false;
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

    // overiding
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        this.ycpgwPaymentExecute = new Fiserv_Payment_Card_Token();
        txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN_FETCH;
        return await this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo);
    }

    private createPaymentExecutor(txInfo: YCPGW_Transaction_Info)
    {
        this.ycpgwPaymentExecute = new Fiserv_Transaction_CardSaleTransaction();
        switch (txInfo.senderType)
        {
            case YCPGW_Lib.PAYMENT_CARD:
                if (FISERV.FISERV_API_TEST_MODE)
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_CREDIT_TEST_MODE;
                else
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_SALE;
                break;
            case YCPGW_Lib.PAYMENT_CARD_TOKEN:
                if (FISERV.FISERV_API_TEST_MODE)
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN_TEST_MODE;
                else
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN;
                break;
            case YCPGW_Lib.PAYMENT_REFUND:
                txInfo.senderType = this.PAYMENT_FISERV_RETURN;
                break;
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
    
}