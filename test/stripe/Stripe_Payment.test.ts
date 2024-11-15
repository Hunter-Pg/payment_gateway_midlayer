// test common: jest --coverage ./test/stripe/Stripe_Payment.test.ts
import { YCPGW_Payment_Processor } from '../../src';
import { showLog, fetchCustomerIdTest, fetchCardTokenMultipleUseTest, fetchCardTokenSingleUseTest, executePaymentWithCardTokenTest, createProcessorTest } from '../util';
import { PROVIDER_KEY, SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3, PROVIDER_TYPE, TIMEOUT, SUCCESS_USER_EMAIL, SUCCESS_USER_NAME, FIXED_AMOUNT, FIXED_CURRENCY } from './Stripe_Config.test';

describe('Stripe', () => 
{
    describe('Payment', () => 
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
    
        // INIT CUSTOMER ID
        let customerId: string|undefined;
        it('Customer Id Fetch', async () => 
        {
            const userName = SUCCESS_USER_NAME;
            const userEmail = SUCCESS_USER_EMAIL;
    
            const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
            customerId = txRes.transactionId;
            expect(txRes.successful).toEqual(true); 
        });
    
        // INIT CARD TOKEN
        let cardTokenSingleUse: string;
        let cardTokenMultipleUse: string;
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
    
            it('Mutiple Use', async () =>
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;
                const cusId = customerId;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                cardTokenMultipleUse = txRes.cardToken!;
                expect(txRes.successful).toEqual(true);
            }, timeout);
        });
    
        describe('Success', () => 
        {
            describe('Card Token', () =>
            {
                describe('Single Use', () =>
                {
                    it('First Time Use', async () => 
                    {
                        const cardToken = cardTokenSingleUse;
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                });
                describe('Multipe Use', () =>
                {
                    it('First Time Use', async () => 
                    {
                        const cardToken = cardTokenMultipleUse;
                        const cusId = customerId;
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, cusId, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Second Time Use', async () => 
                    {
                        const cardToken = cardTokenMultipleUse;
                        const cusId = customerId;
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, cusId, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                });
            });
        });
    
        describe('Fault', () =>
        {
            describe('Card Token', () =>
            {
                describe('Single Use', () =>
                {
                    it('Second Time Use', async () => 
                    {
                        const cardToken = cardTokenSingleUse;
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(false);    
                        expect(txRes.description).toEqual(`You cannot use a Stripe token more than once: ${cardToken}.`);    
                    }, timeout);
                    it('Incorrect token', async () => 
                    {
                        const cardToken = "123456789";
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(false);    
                        expect(txRes.description).toEqual(`No such token: '${cardToken}'`);    
                    }, timeout);
                });
                describe('Multipe Use', () =>
                {
                    it('Incorrect Customer Id', async () => 
                    {
                        const cardToken = cardTokenMultipleUse;
                        const cusId = "123456789";
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, cusId, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(false);    
                        expect(txRes.description).toEqual(`No such customer: '${cusId}'`);        
                    }, timeout);
                    it('Incorrect Card Token', async () => 
                    {
                        const cardToken = "123456789";
                        const cusId = customerId;
                        let txRes = await executePaymentWithCardTokenTest(pp, cardToken, cusId, FIXED_AMOUNT, FIXED_CURRENCY);
                        expect(txRes.successful).toEqual(false);    
                        expect(txRes.description).toEqual(`Customer ${cusId} does not have a linked source with ID ${cardToken}.`);    
                    }, timeout);
                });
            });
        });
    });
});