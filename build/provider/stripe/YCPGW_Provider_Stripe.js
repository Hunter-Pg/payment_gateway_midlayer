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
exports.YCPGW_Provider_Stripe = void 0;
const YCPGW_Provider_1 = require("../../core/YCPGW_Provider");
const model_1 = require("../../model");
const YCPGW_Recurring_Info_1 = require("../../model/YCPGW_Recurring_Info");
const Stripe_Config_1 = __importDefault(require("./model/Stripe_Config"));
const payment_1 = require("./payment");
class YCPGW_Provider_Stripe extends YCPGW_Provider_1.YCPGW_Provider {
    constructor(providerData) {
        super();
        this.providerDataSetUP(providerData);
    }
    // override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createPaymentExecutor(txInfo);
            return yield this.ycpgwPaymentExecute.TX_Execute(amountInfo, txInfo);
        });
    }
    // override
    TX_Fetch(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(this.FUNCTION_NOT_IMOLEMENT);
        });
    }
    // override
    createUserForProvider(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ycpgwPaymentExecute = new payment_1.Stripe_Payment_Customer_Info();
            return yield this.ycpgwPaymentExecute.createUserForProvider(userInfo);
        });
    }
    // override
    providerDataSetUP(stripeInfo) {
        var _a;
        if (!stripeInfo.provider_key)
            throw new Error(this.PROVIDER_STRIPE_MISS_KEY);
        Stripe_Config_1.default.STRIPE_API_KEY = stripeInfo.provider_key;
        Stripe_Config_1.default.STRIPE_API_TEST_MODE = (_a = stripeInfo.payment_test_mode) !== null && _a !== void 0 ? _a : false;
    }
    // overiding
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ycpgwPaymentExecute = new payment_1.Stripe_Payment_Card_Token();
            return yield this.ycpgwPaymentExecute.Card_Token_Fetch(txInfo, reuseInfo);
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
    // override
    Recurring_Payment_Cancel(transactionId, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let recurringInfo;
            if (txInfo)
                recurringInfo = txInfo;
            else
                recurringInfo = new model_1.YCPGW_Transaction_Info(model_1.YCPGW_Lib.PAYMENT_RECURRING_CANCELED, new model_1.YCPGW_Card_Info());
            this.createPaymentExecutor(recurringInfo);
            return yield this.ycpgwPaymentExecute.Recurring_Payment_Cancel(transactionId);
        });
    }
    createPaymentExecutor(txInfo) {
        this.checkInput(txInfo);
        switch (txInfo.senderType) {
            case model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN:
            case model_1.YCPGW_Lib.PAYMENT_REFUND:
            case model_1.YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
            case model_1.YCPGW_Lib.PAYMENT_RECURRING_CANCELED:
                this.ycpgwPaymentExecute = new payment_1.Stripe_Payment_Card_Transaction();
                break;
        }
    }
    checkInput(txInfo) {
        switch (txInfo.senderType) {
            case model_1.YCPGW_Lib.PAYMENT_CARD_TOKEN:
                if (!(txInfo.senderInfo instanceof model_1.YCPGW_Card_Info))
                    throw new Error(this.ERROR_MISSING_CLASS_CARD_INFO);
                let sendInfoToken = txInfo.senderInfo;
                if (!sendInfoToken.cardTokenId)
                    throw new Error(this.PAYMENT_WITH_CARD_TOKEN_ERROR);
                break;
            case model_1.YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD_TOKEN:
                if (!(txInfo.senderInfo instanceof YCPGW_Recurring_Info_1.YCPGW_Recurring_Info))
                    throw new Error(this.ERROR_MISSING_CLASS_RESURRING_INFO);
                let sendInfoRecurring = txInfo.senderInfo;
                const intervalInput = sendInfoRecurring.frequency.unit;
                if (!model_1.YCPGW_Lib.RESURRING_PAYMENT_INTERVAL_ARRAY.includes(intervalInput))
                    throw new Error(this.ERROR_MISSING_INTERVAL_TYPE);
                break;
            case model_1.YCPGW_Lib.PAYMENT_RECURRING_CANCELED:
                break;
            case model_1.YCPGW_Lib.PAYMENT_REFUND:
                break;
            case model_1.YCPGW_Lib.PAYMENT_RECURRING_WITH_CARD:
                throw new Error(this.PAYMENT_TYPE_CARD_TOKEN_RESURRING_ERROR);
            case model_1.YCPGW_Lib.PAYMENT_CARD:
                throw new Error(this.PAYMENT_TYPE_CARD_TOKEN_ERROR);
            default:
                throw new Error(this.PAYMENT_TYPE_ERROR);
        }
    }
}
exports.YCPGW_Provider_Stripe = YCPGW_Provider_Stripe;
