import Stripe from 'stripe';
import { YCPGW_Provider_SDK } from "../../../core/YCPGW_Provider_SDK";
import STRIPE from "./../model/Stripe_Config";
import { YCPGW_Amount_Info, YCPGW_Card_Info, YCPGW_Transaction_Info, YCPGW_Transaction_Result, YCPGW_Customer_info, YCPGW_Card_Token_Reuse_info } from '../../../model';
import { removeSpace } from '../../../util_common';
import { YCPGW_Recurring_Info } from '../../../model/YCPGW_Recurring_Info';
import { Stripe_Recurring_Info } from '../model';

export class Stripe_SDK extends YCPGW_Provider_SDK
{
    private stripeSDK: any;
    constructor ()
    {
        super();
        this.stripeSDK = new Stripe(
            STRIPE.STRIPE_API_KEY,
            {
                apiVersion: '2020-08-27',
            }
        );
    }
    
    async createPayment(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> 
    {
        let cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        const params: Stripe.ChargeCreateParams = 
        {
            amount: Math.trunc(amountInfo.total* 100), // unit is cent
            currency: amountInfo.currency,
            source: cardInfo.cardTokenId,
            description: cardInfo.description,
            customer: cardInfo.customerId
        };

        try {
            const paymentRes: Stripe.Charge = await this.stripeSDK.charges.create(params);
            paymentRes.description = this.RESPONSE_TRASACTION_SUCCESSFUL;
            return this.createResponseResultSuccessful(paymentRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }

    async createRecurringPayment(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> 
    {
        const productionRes: YCPGW_Transaction_Result = await this.createRecurringPaymentProduction();
        if (!productionRes || !productionRes?.successful) throw new Error(productionRes?.description);

        const priceRes: YCPGW_Transaction_Result = await this.createRecurringPaymentPrice(amountInfo, txInfo, productionRes.transactionId!);
        if (!priceRes || !priceRes?.successful) throw new Error(priceRes?.description);

        const cardInfo: YCPGW_Card_Info = (txInfo.senderInfo as YCPGW_Recurring_Info).paymentInfo;
        const params: Stripe.SubscriptionCreateParams = 
        {
            customer: cardInfo.customerId,
            items: [
                {price: priceRes.transactionId},
            ],
        };

        try {
            const subscriptionRes: Stripe.Subscription = await this.stripeSDK.subscriptions.create(params);
            return this.createResponseResultSuccessful(subscriptionRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }

    async createRecurringPaymentProduction(): Promise<YCPGW_Transaction_Result> 
    {
        const params: Stripe.ProductCreateParams = 
        {
            name: this.GENERAL_YCPGW_RECURRING_PAYMENT,
        };

        try {
            const productionRes: Stripe.Product = await this.stripeSDK.products.create(params);
            return this.createResponseResultSuccessful(productionRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }
    async createRecurringPaymentPrice(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info, productionId: string): Promise<YCPGW_Transaction_Result> 
    {
        const senderInfo = txInfo.senderInfo as YCPGW_Recurring_Info;
        const recurringObj: any = new Stripe_Recurring_Info(senderInfo);
        const params: Stripe.PriceCreateParams = 
        {
            unit_amount: Math.trunc(amountInfo.total* 100), // unit is cent
            currency: amountInfo.currency,
            recurring: recurringObj,
            product: productionId,
        };
        try {
            const priceRes: Stripe.Price = await this.stripeSDK.prices.create(params);
            return this.createResponseResultSuccessful(priceRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }
    async cancelResurringPayment(transactionId: string)
    {
        try {
            const subscriptionRes: Stripe.Subscription = await this.stripeSDK.subscriptions.del(transactionId);
            return this.createResponseResultSuccessful(subscriptionRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }

    // create a customer Id from stripe for permanent card token
    async createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> {
        const params: Stripe.CustomerCreateParams = 
        {
            name: userInfo.name,
            email: userInfo.email
        };

        try {
            const customerRes: Stripe.Customer = await this.stripeSDK.customers.create(params);
            customerRes.description = this.RESPONSE_CREATE_CUSTOMER_SUCCESSFUL
            return this.createResponseResultSuccessful(customerRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }

    async createRefund(transactionId: string, amountInfo: YCPGW_Amount_Info): Promise<YCPGW_Transaction_Result>
    {
        const params: Stripe.RefundCreateParams =
        {
            charge: transactionId,
            amount: Math.trunc(amountInfo.total * 100) // unit is cent
        }

        try {
            const refundRes: Stripe.Refund = await this.stripeSDK.refunds.create(params);
            refundRes.description = this.RESPONSE_TRASACTION_SUCCESSFUL
            return this.createResponseResultSuccessful(refundRes);
        } catch (error) {
            return this.createResponseResultFailed(error)
        }
    }

    async createCardToken(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        if (reuseInfo?.reusable)
        {
            if (!reuseInfo.customerInfo) throw new Error(this.ERROR_MISSING_CUSTOMER_INFO);

            return await this.createPermanentUseCardToken(txInfo, reuseInfo);
        }
        else
            return await this.createSingleUseCardToken(txInfo);
    }

    private async createSingleUseCardToken (txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result>
    {
        let cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        const params: Stripe.TokenCreateParams = 
        {
            card: 
            {
                number: removeSpace(cardInfo.number),
                exp_month: cardInfo.expiryMonth,
                exp_year: cardInfo.expiryYear,
                cvc: cardInfo.securityCode,
            }
        };

        try {
            const cardTokenSingleRes: Stripe.Token = await this.stripeSDK.tokens.create(params);
            return this.createCardTokenResultSuccessful(cardTokenSingleRes);
        } catch (error) {
            return this.createCardTokenResultFailed(error)
        }
    }

    // permanent card token = integrate a card token with a customer
    private async createPermanentUseCardToken (txInfo: YCPGW_Transaction_Info, reuseInfo: YCPGW_Card_Token_Reuse_info): Promise<YCPGW_Transaction_Result>
    {
        let cardTokenRes: YCPGW_Transaction_Result;
        let custometId: string | undefined = reuseInfo.customerInfo!.customerId;
        if (!custometId)
        {
            const custometRes: YCPGW_Transaction_Result = await this.createUserForProvider(reuseInfo.customerInfo!);
            custometId = custometRes.transactionId;
        }
        
        // create a single card token for integration
        cardTokenRes =  await this.createSingleUseCardToken(txInfo);
        const params: Stripe.CustomerSourceCreateParams =
        {
            source: cardTokenRes.cardToken!
        }

        try {
            const cardTokenPermanentRes: Stripe.Token = await this.stripeSDK.customers.createSource(custometId, params);
            return this.createCardTokenResultSuccessful(cardTokenPermanentRes);
        } catch (error) {
            return this.createCardTokenResultFailed(error)
        }
    }

    private createResponseResultSuccessful(result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Stripe > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let status: string;
        let description: string;

        transactionId = result.id;
        status = result.status?? this.GENERAL_STATUS_FINISHED;
        description = result.description?? this.RESPONSE_TRASACTION_SUCCESSFUL;

        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }

    private createResponseResultFailed(result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Stripe > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string = this.RESPONSE_ID_UNDEFINED;
        let successful: boolean = false;
        let status: string;
        let description: string;

        transactionId = result.requestId;
        status = result.type;
        description = result.raw.message;   
        
        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    } 
    
    private createCardTokenResultSuccessful(result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Stripe > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let cardToken: string;
        let fingerprint: string;
        let description: string;

        transactionId = result.id;
        cardToken = result.id;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;
        fingerprint = result.fingerprint;

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }

    private createCardTokenResultFailed(result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Stripe > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = false;
        let cardToken: string | undefined = this.GENERAL_NONE;
        let fingerprint: string | undefined = this.GENERAL_NONE;
        let description: string;

        transactionId = result.requestId
        description = result.raw.message;  

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }

}