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
exports.YCPGW_Provider_Till = void 0;
const YCPGW_Provider_1 = require("../../core/YCPGW_Provider");
const model_1 = require("../../model");
const Till_Config_1 = __importDefault(require("./model/Till_Config"));
const payment_1 = require("./payment");
class YCPGW_Provider_Till extends YCPGW_Provider_1.YCPGW_Provider {
    constructor(providerData) {
        super();
        this.providerDataSetUp(providerData);
    }
    //override
    providerDataSetUp(tillInfo) {
        var _a;
        if (!tillInfo.provider_key)
            throw new Error(this.PROVIDER_TILL_MISS_KEY);
        Till_Config_1.default.TILL_API_KEY = tillInfo.provider_key;
        if (!tillInfo.provider_secret)
            throw new Error(this.PROVIDER_TILL_MISS_SECRET);
        Till_Config_1.default.TILL_API_SECRET = tillInfo.provider_secret;
        if (!tillInfo.provider_url)
            throw new Error(this.PROVIDER_TILL_MISS_URL);
        Till_Config_1.default.TILL_API_URL = tillInfo.provider_url;
        if (!tillInfo.provider_user)
            throw new Error(this.PROVIDER_TILL_MISS_USER_NAME);
        Till_Config_1.default.TILL_API_USER = tillInfo.provider_user;
        if (!tillInfo.provider_psd)
            throw new Error(this.PROVIDER_TILL_MISS_PASSWORD);
        Till_Config_1.default.TILL_API_PSD = tillInfo.provider_psd;
        Till_Config_1.default.TILL_API_TEST_MODE = (_a = tillInfo.payment_test_mode) !== null && _a !== void 0 ? _a : false;
    }
    // override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createPaymentExecutor(txInfo);
            return yield this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
        });
    }
    // overiding
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ycpgwPaymentExecute = new payment_1.Till_Payment_Card_Token();
            return yield this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo);
        });
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
    createPaymentExecutor(txInfo) {
        switch (txInfo.senderType) {
            case model_1.YCPGW_Lib.PAYMENT_CARD:
            case model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN:
            case model_1.YCPGW_Lib.PAYMENT_REFUND:
                this.ycpgwPaymentExecute = new payment_1.Till_Transaction_Request();
                break;
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
}
exports.YCPGW_Provider_Till = YCPGW_Provider_Till;
