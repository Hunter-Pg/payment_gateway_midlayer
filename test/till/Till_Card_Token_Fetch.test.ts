// test common: jest --coverage ./test/till/Till_Card_Token_Fetch.test.ts
import { YCPGW_Payment_Processor } from '../../src';
import { showLog, fetchCardTokenMultipleUseTest, createProcessorTest } from '../util';
import { SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE, SUCCESS_EXPIRY_MONTH_NO_PAD, SUCCESS_EXPIRY_MONTH_PAD, SUCCESS_EXPIRY_YEAR_FULL, PROVIDER_KEY, PROVIDER_PASSWORD, PROVIDER_SECRET, PROVIDER_URL, PROVIDER_USER, PROVIDER_TYPE, TIMEOUT } from './Till_Config.test';

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

    describe('Success', () => 
    {
        describe('Card Token Fetch', () =>
        {
            it('Normal', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Month: 7', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Month: 07', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Year: 2024', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR_FULL;
                const securityCode = SUCCESS_SECURITY_CODE;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Year: 2', async () => // NOT FIXED YET BY TILL PAYMENT
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "2";
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
        });
    });

    describe('Fault', () =>
    {
        describe('Card Token Fetch', () =>
        {
            it('Card Number: Missing', async () => 
            {
                const cardNum = "411111111111111";
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.pan: Invalid card number');        
            }, timeout);
            it('Card Number: Extra one', async () => 
            {
                const cardNum = "41111111111111112";
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.pan: Invalid card number');        
            }, timeout);
            it('Month: Over 12', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = "13";
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.expirationMonth: Invalid value');        
            }, timeout);
            it('Year: 240', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "240";
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.expirationYear: Invalid value');        
            }, timeout);
            
            it('cvv: Extra one', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "1112";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.cvv: Invalid CVV/CVC');        
            }, timeout);
            it('cvv: Missing one', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "11";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.cvv: Invalid CVV/CVC');        
            }, timeout);
            it('Month: Missing', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = "";
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('cardData.expirationMonth: Invalid value');        
            }, timeout);
            it('Year: Missing', async () => // NOT FIXED YET BY TILL PAYMENT
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "";
                const securityCode = SUCCESS_SECURITY_CODE;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual("cardData: 'expirationYear' is required");               
            }, timeout);
            it('CVV/CVC: Missing', async () => // NOT FIXED YET BY TILL PAYMENT
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual("cardData: 'cvv' is required");         
            }, timeout);
        });
    });
});