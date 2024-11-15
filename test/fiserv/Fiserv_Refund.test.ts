// test common: jest --coverage ./test/fiserv/Fiserv_Refund.test.ts
import { YCPGW_Payment_Processor } from "../../src";
import { showLog, executePaymentWithCardInfoTest, createProcessorTest, executeRefundTest } from "../util";
import { TIMEOUT, PROVIDER_TYPE, PROVIDER_KEY, PROVIDER_SECRET, PROVIDER_URL, FIXED_AMOUNT, FIXED_CURRENCY, SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3 } from "./Fiserv_Config.test";

describe('Fiserv', () => 
{
    let timeout = TIMEOUT;
    beforeEach(() =>{
        jest.resetAllMocks();
    });

    // INIT PROCESSOR
    let pp: YCPGW_Payment_Processor;
    it('Init Processor: Testing Env', () => 
    {
        const testData = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"payment_test_mode":"true"};
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
            const securityCode = SUCCESS_SECURITY_CODE_3;

            let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
            transactionId = txRes.transactionId!;
            expect(txRes.successful).toEqual(true);        
        }, timeout);
    });

    describe('Success', () => 
    {
        /* ???? 5009: No transaction found in order which can be returned ????? TEST ENV
        it('Normal', async () => 
        {
            const txId = transactionId;
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, FIXED_CURRENCY);
            showLog("transactionId",transactionId)
            showLog("Success",txRes)
            expect(txRes.successful).toEqual(true);        
        }, timeout);
        */
    });
    describe('Fault', () => 
    {
        it('Normal', async () => 
        {
            const txId = "123456789";
            let txRes = await executeRefundTest(pp, txId, FIXED_AMOUNT, FIXED_CURRENCY);
            expect(txRes.successful).toEqual(false);   
            expect(txRes.description).toEqual("Resource not found.");     
        }, timeout);
    });
});