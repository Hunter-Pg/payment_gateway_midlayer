"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Payment_Processor = void 0;
const YCPGW_Lib_Internal_1 = require("../model/YCPGW_Lib_Internal");
const model_1 = require("../model");
const provider_1 = require("../provider");
const YCPGW_General_Method_1 = require("../util_common/YCPGW_General_Method");
class YCPGW_Payment_Processor extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    /**
     * Initial payment processor
     * @remarks This method will initial payment processor
     * @param providerData - three type of arguments such as object, class and string. \n
     * @example string - '{"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}'
     * @example object - {"provider_type": "Fiserv","provider_key": "**your api key**","provider_secret": "**your api secret**","provider_url": "**your api url**", "payment_test_mode":"true/false"}
     * @example class - new model.YCPGW_Provider_Data(model.YCPGW_Lib.PROVIDER_FISERV,new model.Provider_Info_Fiserv("**your api key**","**your api secret**","**your api url**", "true/false"))
     * @public
     */
    constructor(providerData) {
        super();
        let providerInfo;
        if (typeof providerData === "string")
            providerInfo = this.buildByString(providerData);
        else if ((0, YCPGW_General_Method_1.isType_YCPGW_Provider_Info)(providerData))
            providerInfo = providerData;
        else if (providerData.providerInfo instanceof model_1.Provider_Info)
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
    Recurring_Payment_Cancel(transactionId, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.Recurring_Payment_Cancel(transactionId);
        });
    }
    /**
     * Fetch a card token
     * @remarks Fetch a credit card token from provider
     * @param cardInfo credit card information
     * @param reuseInfo
     * @public
     */
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.Card_Token_Fetch(txInfo, reuseInfo);
        });
    }
    /**
     * Execute a refund
     * @remarks This method will execute a refund
     * @param transactionId - transaction id which would like to be refund
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - optional
     * @returns result of this refund
     */
    TX_Refund(transactionId, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.TX_Refund(transactionId, amountInfo);
        });
    }
    /**
     *
     * @param userInfo
     * @returns
     */
    createUserForProvider(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.createUserForProvider(userInfo);
        });
    }
    /**
     *
     * @param cardTokenInfo
     */
    fetchCardInformation(cardTokenInfo) {
        throw new Error(this.FUNCTION_NOT_IMOLEMENT);
    }
    /**
     *
     * @param transactionId
     * @returns
     */
    TX_Fetch(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.TX_Fetch(transactionId);
        });
    }
    /**
     * Execute a transaction
     * @remarks This method will execute a transaction
     * @param amountInfo - use class of YCPGW_Amount_Info to create information of amount and currency
     * @param txInfo - use class of YCPGW_Transaction_Info to create information of body when making a request
     * @returns result of this transaction
     * @beta
     */
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ycpgwProvider)
                throw new Error(this.PROVIDER_TYPE_ERROR);
            return yield this.ycpgwProvider.TX_Execute(amountInfo, txInfo);
        });
    }
    /**
     * Create a provider
     * @remarks create different provider depense on provider type
     * @param providerData
     */
    createProvider(providerData) {
        if (!providerData.provider_type)
            throw new Error(this.PROVIDER_TYPE_ERROR);
        switch (providerData.provider_type.toLowerCase()) {
            case this.PROVIDER_FISERV:
                this.ycpgwProvider = new provider_1.YCPGW_Provider_Fiserv(providerData);
                break;
            case this.PROVIDER_PAYPAL:
                throw new Error(this.PROVIDER_TYPE_ERROR);
                break;
            case this.PROVIDER_STRIPE:
                this.ycpgwProvider = new provider_1.YCPGW_Provider_Stripe(providerData);
                break;
            case this.PROVIDER_TILL:
                this.ycpgwProvider = new provider_1.YCPGW_Provider_Till(providerData);
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
    buildByClass(providerData) {
        providerData = providerData;
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
        };
    }
    /**
     * Refactor string to object
     * @param providerData
     * @returns an object of YCPGW_Provider_Info
     */
    buildByString(providerData) {
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
        };
    }
}
exports.YCPGW_Payment_Processor = YCPGW_Payment_Processor;
