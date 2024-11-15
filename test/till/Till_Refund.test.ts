// test common: jest --coverage ./test/till/Till_Refund.test.ts
import { YCPGW_Payment_Processor } from "../../src";
import { showLog, executePaymentWithCardInfoTest, createProcessorTest, executeRefundTest } from "../util";
import { TIMEOUT, PROVIDER_TYPE, PROVIDER_KEY, PROVIDER_SECRET, PROVIDER_URL, FIXED_AMOUNT, FIXED_CURRENCY, SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE, PROVIDER_USER, PROVIDER_PASSWORD } from "./Till_Config.test";

describe('Till Payment', () => 
{
    let timeout = TIMEOUT;
    beforeEach(() =>{
        jest.resetAllMocks();
    });

    // INIT PROCESSOR
    let pp: YCPGW_Payment_Processor;
    it('Init Processor: Testing Env', () => 
    {
        const testData = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
        pp = createProcessorTest(testData);
        expect(pp).not.toEqual(undefined);
    });

    // INIT TRANSACTION
    let transactionId: string;
    describe('Payment', () =>
    { 
        it('Fetch Transaction Id', async () => 
        {
            const cardNum = SUCCESS_CARD_NUMBER;
            const expMon = SUCCESS_EXPIRY_MONTH;
            const expYear = SUCCESS_EXPIRY_YEAR;
            const securityCode = SUCCESS_SECURITY_CODE;

            let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
            transactionId = txRes.transactionId!;
            expect(txRes.successful).toEqual(true);        
        }, timeout);
    });

    describe('Success', () => 
    {
        it('Normal', async () => 
        {
            const txId = transactionId;
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, FIXED_CURRENCY);
            showLog("transactionId",transactionId)
            showLog("Success",txRes)
            expect(txRes.successful).toEqual(true);        
        }, timeout);
    });
    describe('Fault', () =>
    {
        it('Transaction Id Incorrect', async () => // NOT FIXED YET BY TILL PAYMENT
        {
            const txId = "123456789";
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual("5010: Hosted data was not found.");     
        }, timeout);
        it('Amount too Large', async () => // NOT FIXED YET BY TILL PAYMENT
        {
            const txId = transactionId;
            let txRes = await executeRefundTest(pp, txId, 100, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual("5010: Hosted data was not found.");     
        }, timeout);
        it('Currency Incorrect', async () => // NOT FIXED YET BY TILL PAYMENT
        {
            const txId = transactionId;
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, "AUD");
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual("5010: Hosted data was not found.");     
        }, timeout);
    });
});