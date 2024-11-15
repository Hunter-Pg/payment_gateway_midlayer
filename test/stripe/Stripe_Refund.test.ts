// test common: jest --coverage ./test/stripe/Stripe_Refund.test.ts
import { YCPGW_Payment_Processor } from "../../src";
import { showLog, fetchCardTokenSingleUseTest, executePaymentWithCardTokenTest, createProcessorTest, executeRefundTest } from "../util";
import { TIMEOUT, PROVIDER_TYPE, PROVIDER_KEY, FIXED_AMOUNT, FIXED_CURRENCY, SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3 } from "./Stripe_Config.test";

describe('Stripe', () => 
{
    let timeout = TIMEOUT;
    beforeEach(() =>{
        jest.resetAllMocks();
    });

    // INIT PROCESSOR
    let pp: YCPGW_Payment_Processor;
    it('Init Processor: Testing Env', () => 
    {
        const testData = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"payment_test_mode":"true"};
        pp = createProcessorTest(testData);
        expect(pp).not.toEqual(undefined);
    });
    // INIT CARD TOKEN
    let cardTokenSingleUse: string;
    describe('Init Card Token', () => 
    {
        it('Single Use', async () =>
        {
            const cardNum = SUCCESS_CARD_NUMBER;
            const expMon = SUCCESS_EXPIRY_MONTH;
            const expYear = SUCCESS_EXPIRY_YEAR;
            const securityCode = SUCCESS_SECURITY_CODE_3;

            let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
            cardTokenSingleUse = txRes.cardToken!;
            expect(txRes.successful).toEqual(true);
        }, timeout);
    });
    // INIT TRANSACTION
    let transactionId: string;
    describe('Payment', () =>
    { 
        it('Fetch Transaction Id', async () => 
        {
            const cardToken = cardTokenSingleUse;
            let txRes = await executePaymentWithCardTokenTest(pp, cardToken, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
            transactionId = txRes.transactionId!;
            expect(txRes.successful).toEqual(true);        
        }, timeout);
    });

    const halfOfAmount = FIXED_AMOUNT/2;
    describe('Success', () => 
    {
        it('Currency Incorrect', async () => // NOT REQUIRED
        {
            const txId = transactionId;
            let txRes = await executeRefundTest(pp, txId, halfOfAmount, "");
            expect(txRes.successful).toEqual(true);   
        }, timeout);
    });
    describe('Fault', () =>
    {
        it('Transaction Id Incorrect', async () =>
        {
            const txId = "123456789";
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual(`No such charge: '${txId}'`);     
        }, timeout);
        
        it('Amount too Large', async () =>
        {
            const txId = transactionId;
            const amountL = 100;
            let txRes = await executeRefundTest(pp, txId, amountL, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual(`Refund amount ($${amountL}.00) is greater than charge amount ($${FIXED_AMOUNT.toFixed(2)})`);     
        }, timeout);

        it('Amount too Large', async () =>
        {
            const txId = transactionId;
            let reFundFinishedRes = await executeRefundTest(pp, txId, halfOfAmount, "");
            expect(reFundFinishedRes.successful).toEqual(true);

            const amountL = 100;
            let txRes = await executeRefundTest(pp, txId, amountL, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual(`Charge ${transactionId} has already been refunded.`);     
        }, timeout);
    });
});