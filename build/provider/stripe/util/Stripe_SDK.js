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
exports.Stripe_SDK = void 0;
const stripe_1 = __importDefault(require("stripe"));
const YCPGW_Provider_SDK_1 = require("../../../core/YCPGW_Provider_SDK");
const Stripe_Config_1 = __importDefault(require("./../model/Stripe_Config"));
const model_1 = require("../../../model");
const util_common_1 = require("../../../util_common");
const model_2 = require("../model");
class Stripe_SDK extends YCPGW_Provider_SDK_1.YCPGW_Provider_SDK {
    constructor() {
        super();
        this.stripeSDK = new stripe_1.default(Stripe_Config_1.default.STRIPE_API_KEY, {
            apiVersion: '2020-08-27',
        });
    }
    createPayment(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let cardInfo = txInfo.senderInfo;
            const params = {
                amount: Math.trunc(amountInfo.total * 100),
                currency: amountInfo.currency,
                source: cardInfo.cardTokenId,
                description: cardInfo.description,
                customer: cardInfo.customerId
            };
            try {
                const paymentRes = yield this.stripeSDK.charges.create(params);
                paymentRes.description = this.RESPONSE_TRASACTION_SUCCESSFUL;
                return this.createResponseResultSuccessful(paymentRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    createRecurringPayment(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const productionRes = yield this.createRecurringPaymentProduction();
            if (!productionRes || !(productionRes === null || productionRes === void 0 ? void 0 : productionRes.successful))
                throw new Error(productionRes === null || productionRes === void 0 ? void 0 : productionRes.description);
            const priceRes = yield this.createRecurringPaymentPrice(amountInfo, txInfo, productionRes.transactionId);
            if (!priceRes || !(priceRes === null || priceRes === void 0 ? void 0 : priceRes.successful))
                throw new Error(priceRes === null || priceRes === void 0 ? void 0 : priceRes.description);
            const cardInfo = txInfo.senderInfo.paymentInfo;
            const params = {
                customer: cardInfo.customerId,
                items: [
                    { price: priceRes.transactionId },
                ],
            };
            try {
                const subscriptionRes = yield this.stripeSDK.subscriptions.create(params);
                return this.createResponseResultSuccessful(subscriptionRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    createRecurringPaymentProduction() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                name: this.GENERAL_YCPGW_RECURRING_PAYMENT,
            };
            try {
                const productionRes = yield this.stripeSDK.products.create(params);
                return this.createResponseResultSuccessful(productionRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    createRecurringPaymentPrice(amountInfo, txInfo, productionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderInfo = txInfo.senderInfo;
            const recurringObj = new model_2.Stripe_Recurring_Info(senderInfo);
            const params = {
                unit_amount: Math.trunc(amountInfo.total * 100),
                currency: amountInfo.currency,
                recurring: recurringObj,
                product: productionId,
            };
            try {
                const priceRes = yield this.stripeSDK.prices.create(params);
                return this.createResponseResultSuccessful(priceRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    cancelResurringPayment(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionRes = yield this.stripeSDK.subscriptions.del(transactionId);
                return this.createResponseResultSuccessful(subscriptionRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    // create a customer Id from stripe for permanent card token
    createUserForProvider(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                name: userInfo.name,
                email: userInfo.email
            };
            try {
                const customerRes = yield this.stripeSDK.customers.create(params);
                customerRes.description = this.RESPONSE_CREATE_CUSTOMER_SUCCESSFUL;
                return this.createResponseResultSuccessful(customerRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    createRefund(transactionId, amountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                charge: transactionId,
                amount: Math.trunc(amountInfo.total * 100) // unit is cent
            };
            try {
                const refundRes = yield this.stripeSDK.refunds.create(params);
                refundRes.description = this.RESPONSE_TRASACTION_SUCCESSFUL;
                return this.createResponseResultSuccessful(refundRes);
            }
            catch (error) {
                return this.createResponseResultFailed(error);
            }
        });
    }
    createCardToken(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reuseInfo === null || reuseInfo === void 0 ? void 0 : reuseInfo.reusable) {
                if (!reuseInfo.customerInfo)
                    throw new Error(this.ERROR_MISSING_CUSTOMER_INFO);
                return yield this.createPermanentUseCardToken(txInfo, reuseInfo);
            }
            else
                return yield this.createSingleUseCardToken(txInfo);
        });
    }
    createSingleUseCardToken(txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let cardInfo = txInfo.senderInfo;
            const params = {
                card: {
                    number: (0, util_common_1.removeSpace)(cardInfo.number),
                    exp_month: cardInfo.expiryMonth,
                    exp_year: cardInfo.expiryYear,
                    cvc: cardInfo.securityCode,
                }
            };
            try {
                const cardTokenSingleRes = yield this.stripeSDK.tokens.create(params);
                return this.createCardTokenResultSuccessful(cardTokenSingleRes);
            }
            catch (error) {
                return this.createCardTokenResultFailed(error);
            }
        });
    }
    // permanent card token = integrate a card token with a customer
    createPermanentUseCardToken(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let cardTokenRes;
            let custometId = reuseInfo.customerInfo.customerId;
            if (!custometId) {
                const custometRes = yield this.createUserForProvider(reuseInfo.customerInfo);
                custometId = custometRes.transactionId;
            }
            // create a single card token for integration
            cardTokenRes = yield this.createSingleUseCardToken(txInfo);
            const params = {
                source: cardTokenRes.cardToken
            };
            try {
                const cardTokenPermanentRes = yield this.stripeSDK.customers.createSource(custometId, params);
                return this.createCardTokenResultSuccessful(cardTokenPermanentRes);
            }
            catch (error) {
                return this.createCardTokenResultFailed(error);
            }
        });
    }
    createResponseResultSuccessful(result) {
        var _a, _b;
        if (this.DEBUG_MODE)
            console.log("::> Stripe > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let status;
        let description;
        transactionId = result.id;
        status = (_a = result.status) !== null && _a !== void 0 ? _a : this.GENERAL_STATUS_FINISHED;
        description = (_b = result.description) !== null && _b !== void 0 ? _b : this.RESPONSE_TRASACTION_SUCCESSFUL;
        return new model_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createResponseResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::> Stripe > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId = this.RESPONSE_ID_UNDEFINED;
        let successful = false;
        let status;
        let description;
        transactionId = result.requestId;
        status = result.type;
        description = result.raw.message;
        return new model_1.YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
    createCardTokenResultSuccessful(result) {
        if (this.DEBUG_MODE)
            console.log("::> Stripe > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = true;
        let cardToken;
        let fingerprint;
        let description;
        transactionId = result.id;
        cardToken = result.id;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;
        fingerprint = result.fingerprint;
        return new model_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
    createCardTokenResultFailed(result) {
        if (this.DEBUG_MODE)
            console.log("::> Stripe > response: ", result);
        let userId = this.GENERAL_NONE;
        let transactionId;
        let successful = false;
        let cardToken = this.GENERAL_NONE;
        let fingerprint = this.GENERAL_NONE;
        let description;
        transactionId = result.requestId;
        description = result.raw.message;
        return new model_1.YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }
}
exports.Stripe_SDK = Stripe_SDK;
