import { YCPGW_Payment_Processor_Interface } from "../interface/YCPGW_Payment_Processor_Interface";
import { YCPGW_Provider } from "./YCPGW_Provider";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
import { YCPGW_Customer_info, YCPGW_Card_Info, YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Provider_Data, Provider_Info, YCPGW_Card_Token_Reuse_info } from "../model";
import { YCPGW_Provider_Fiserv, YCPGW_Provider_Stripe, YCPGW_Provider_Till } from "../provider";
import { isType_YCPGW_Provider_Info } from "../util_common/YCPGW_General_Method";


export class YCPGW_Payment_Processor extends YCPGW_Lib_Internal implements YCPGW_Payment_Processor_Interface
{
    private ycpgwProvider?: YCPGW_Provider;  

    /**
     * Initial payment processor
     * @remarks This method will initial payment processor
     * @param providerData - three type of arguments such as object, class and string. \n
     * @example string - '{"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}'
     * @example object - {"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}
     * @example class - new model.YCPGW_Provider_Data(model.YCPGW_Lib.PROVIDER_FISERV,new model.Provider_Info_Fiserv("**your api key**","**your api secret**","**your api url**", "true/false"))
     * @public
     */
    constructor (providerData: YCPGW_Provider_Info | YCPGW_Provider_Data | string)
    {
        super();
        let providerInfo: YCPGW_Provider_Info;
        if (typeof providerData === "string")
            providerInfo = this.buildByString(providerData);
        else if (isType_YCPGW_Provider_Info(providerData)) 
            providerInfo = providerData;
        else if (providerData.providerInfo instanceof Provider_Info)
            providerInfo = this.buildByClass(providerData);        
        else
            throw new Error(this.ERROR_INPUT);
       
        this.createProvider(providerInfo);
    }
    /**
     * Cancel recurring payment
     * @remarks Update the status of a existing recurring payment as canceled
     * @param transactionId The exsiting payment transaction ID
     * @param txInfo 
     */
    async Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);
        
        return await this.ycpgwProvider.Recurring_Payment_Cancel(transactionId);
    }
    /**
     * Fetch a card token
     * @remarks Fetch a credit card token from provider
     * @param cardInfo credit card information
     * @param reuseInfo 
     * @public
     */
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);

        return await this.ycpgwProvider.Card_Token_Fetch(txInfo, reuseInfo);
    }
    /**
     * Execute a refund
     * @remarks This method will execute a refund
     * @param transactionId - transaction id which would like to be refund
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - optional
     * @returns result of this refund
     */
    async TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> 
    {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);
        
        return await this.ycpgwProvider.TX_Refund(transactionId, amountInfo);
    }
    /**
     * 
     * @param userInfo 
     * @returns 
     */
    async createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> 
    {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);

        return await this.ycpgwProvider.createUserForProvider(userInfo);
    }
    /**
     * 
     * @param cardTokenInfo 
     */
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result> 
    {
        throw new Error(this.FUNCTION_NOT_IMOLEMENT);
    }
    /**
     * 
     * @param transactionId 
     * @returns 
     */
    async TX_Fetch(transactionId: string) 
    {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);

        return await this.ycpgwProvider.TX_Fetch(transactionId);
    }

    /**
     * Execute a transaction
     * @remarks This method will execute a transaction
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - use class of YCPGW_Transaction_Info to create information of body when making a request
     * @returns result of this transaction
     * @beta
     */
    async TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        if (!this.ycpgwProvider) throw new Error(this.PROVIDER_TYPE_ERROR);

        return await this.ycpgwProvider.TX_Execute(amountInfo, txInfo);
    }

    /**
     * Create a provider
     * @remarks create different provider depense on provider type
     * @param providerData 
     */
    private createProvider (providerData: YCPGW_Provider_Info)
    {
        if (!providerData.provider_type) throw new Error(this.PROVIDER_TYPE_ERROR);

        switch (providerData.provider_type.toLowerCase())
        {
            case this.PROVIDER_FISERV:
                this.ycpgwProvider = new YCPGW_Provider_Fiserv(providerData);
                break;
            case this.PROVIDER_PAYPAL:
                throw new Error(this.PROVIDER_TYPE_ERROR);
                break;
            case this.PROVIDER_STRIPE:
                this.ycpgwProvider = new YCPGW_Provider_Stripe(providerData);
                break;
            case this.PROVIDER_TILL:
                this.ycpgwProvider = new YCPGW_Provider_Till(providerData);
                break;
            default:
                throw new Error(this.PROVIDER_TYPE_ERROR);                   
        }
    }
    /**
     * Refactor class to object
     * @param providerData 
     * @returns an object of YCPGW_Provider_Info
     */
    private buildByClass (providerData: any): YCPGW_Provider_Info
    {
        providerData = providerData as YCPGW_Provider_Data;
        return {
            provider_type: providerData.porviderType,
            provider_key: providerData.providerInfo.apiKey,
            provider_secret: providerData.providerInfo.apiSecret,
            provider_url: providerData.providerInfo.apiUrl,
            provider_email: providerData.providerInfo.email,
            provider_phone: providerData.providerInfo.mobile,
            provider_user: providerData.providerInfo.apiUserName,
            provider_psd: providerData.providerInfo.apiPsd,
            payment_test_mode: providerData.providerInfo.apiTestMode
        }
    }
    /**
     * Refactor string to object
     * @param providerData 
     * @returns an object of YCPGW_Provider_Info
     */
    private buildByString (providerData: any): YCPGW_Provider_Info
    {
        providerData = JSON.parse(providerData);
        return {
            provider_type: providerData.provider_type,
            provider_key: providerData.provider_key,
            provider_secret: providerData.provider_secret,
            provider_url: providerData.provider_url,
            provider_email: providerData.provider_email,
            provider_phone: providerData.provider_phone,
            provider_user: providerData.provider_user,
            provider_psd: providerData.provider_psd,
            payment_test_mode: providerData.payment_test_mode
        }
    }
}