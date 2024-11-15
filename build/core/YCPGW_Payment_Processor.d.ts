import { YCPGW_Payment_Processor_Interface } from "../interface/YCPGW_Payment_Processor_Interface";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
import { YCPGW_Customer_info, YCPGW_Card_Info, YCPGW_Amount_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Provider_Data, YCPGW_Card_Token_Reuse_info } from "../model";
export declare class YCPGW_Payment_Processor extends YCPGW_Lib_Internal implements YCPGW_Payment_Processor_Interface {
    private ycpgwProvider?;
    /**
     * Initial payment processor
     * @remarks This method will initial payment processor
     * @param providerData - three type of arguments such as object, class and string. \n
     * @example string - '{"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}'
     * @example object - {"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}
     * @example class - new model.YCPGW_Provider_Data(model.YCPGW_Lib.PROVIDER_FISERV,new model.Provider_Info_Fiserv("**your api key**","**your api secret**","**your api url**", "true/false"))
     * @public
     */
    constructor(providerData: YCPGW_Provider_Info | YCPGW_Provider_Data | string);
    /**
     * Cancel recurring payment
     * @remarks Update the status of a existing recurring payment as canceled
     * @param transactionId The exsiting payment transaction ID
     * @param txInfo
     */
    Recurring_Payment_Cancel(transactionId: string, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    /**
     * Fetch a card token
     * @remarks Fetch a credit card token from provider
     * @param cardInfo credit card information
     * @param reuseInfo
     * @public
     */
    Card_Token_Fetch(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>;
    /**
     * Execute a refund
     * @remarks This method will execute a refund
     * @param transactionId - transaction id which would like to be refund
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - optional
     * @returns result of this refund
     */
    TX_Refund(transactionId: string, amountInfo: YCPGW_Amount_Info, txInfo?: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    /**
     *
     * @param userInfo
     * @returns
     */
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    /**
     *
     * @param cardTokenInfo
     */
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result>;
    /**
     *
     * @param transactionId
     * @returns
     */
    TX_Fetch(transactionId: string): Promise<YCPGW_Transaction_Result>;
    /**
     * Execute a transaction
     * @remarks This method will execute a transaction
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - use class of YCPGW_Transaction_Info to create information of body when making a request
     * @returns result of this transaction
     * @beta
     */
    TX_Execute(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>;
    /**
     * Create a provider
     * @remarks create different provider depense on provider type
     * @param providerData
     */
    private createProvider;
    /**
     * Refactor class to object
     * @param providerData
     * @returns an object of YCPGW_Provider_Info
     */
    private buildByClass;
    /**
     * Refactor string to object
     * @param providerData
     * @returns an object of YCPGW_Provider_Info
     */
    private buildByString;
}
