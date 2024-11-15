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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Provider_Fiserv = void 0;
const YCPGW_Provider_1 = require("../../core/YCPGW_Provider");
const model_1 = require("../../model");
const Fiserv_Config_1 = __importDefault(require("./model/Fiserv_Config"));
const payment_1 = require("./payment");
class YCPGW_Provider_Fiserv extends YCPGW_Provider_1.YCPGW_Provider {
    constructor(providerData) {
        super();
        this.providerDataSetUp(providerData);
    }
    // override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createPaymentExecutor(txInfo);
            return yield this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
        });
    }
    //override
    TX_Fetch(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ycpgwPaymentExecute = new payment_1.Fiserv_Transaction_Information();
            return yield this.ycpgwPaymentExecute.TX_Fetch(transactionId);
        });
    }
    //override
    providerDataSetUp(fiservInfo) {
        var _a;
        if (!fiservInfo.provider_key)
            throw new Error(this.PROVIDER_FISERV_MISS_KEY);
        Fiserv_Config_1.default.FISERV_API_KEY = fiservInfo.provider_key;
        if (!fiservInfo.provider_secret)
            throw new Error(this.PROVIDER_FISERV_MISS_SECRET);
        Fiserv_Config_1.default.FISERV_API_SECRET = fiservInfo.provider_secret;
        if (!fiservInfo.provider_url)
            throw new Error(this.PROVIDER_FISERV_MISS_URL);
        Fiserv_Config_1.default.FISERV_API_URL = fiservInfo.provider_url;
        Fiserv_Config_1.default.FISERV_API_TEST_MODE = (_a = fiservInfo.payment_test_mode) !== null && _a !== void 0 ? _a : false;
    }
    //override
    TX_Refund(transactionId, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let refundInfo;
            if (txInfo)
                refundInfo = txInfo;
            else
                refundInfo = new model_1.YCPGW_Transaction_Info(model_1.YCPGW_Lib.PAYMENT_REFUND, new model_1.YCPGW_Card_Info());
            this.createPaymentExecutor(refundInfo);
            return yield this.ycpgwPaymentExecute.TX_Refund(transactionId, amountInfo, refundInfo);
        });
    }
    // overiding
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ycpgwPaymentExecute = new payment_1.Fiserv_Payment_Card_Token();
            txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN_FETCH;
            return yield this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo);
        });
    }
    createPaymentExecutor(txInfo) {
        this.ycpgwPaymentExecute = new payment_1.Fiserv_Transaction_CardSaleTransaction();
        switch (txInfo.senderType) {
            case model_1.YCPGW_Lib.PAYMENT_CARD:
                if (Fiserv_Config_1.default.FISERV_API_TEST_MODE)
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_CREDIT_TEST_MODE;
                else
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_SALE;
                break;
            case model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN:
                if (Fiserv_Config_1.default.FISERV_API_TEST_MODE)
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN_TEST_MODE;
                else
                    txInfo.senderType = this.PAYMENT_FISERV_CARD_TOKEN;
                break;
            case model_1.YCPGW_Lib.PAYMENT_REFUND:
                txInfo.senderType = this.PAYMENT_FISERV_RETURN;
                break;
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
}
exports.YCPGW_Provider_Fiserv = YCPGW_Provider_Fiserv;
