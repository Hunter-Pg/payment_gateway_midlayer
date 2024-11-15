// test common: jest --coverage ./test/fiserv/Fiserv_Card_Token_Fetch.test.ts
import { YCPGW_Payment_Processor } from '../../src';
import { showLog, fetchCardTokenMultipleUseTest, createProcessorTest } from '../util';
import { SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3, SUCCESS_EXPIRY_MONTH_PAD, PROVIDER_KEY, PROVIDER_SECRET, PROVIDER_URL, PROVIDER_TYPE, SUCCESS_SECURITY_CODE_4, SUCCESS_EXPIRY_MONTH_NO_PAD, TIMEOUT } from './Fiserv_Config.test';

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

    describe('Success', () => 
    {
        describe('Card Token Fetch', () =>
        {
            it('Normal', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Month: 07', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('Month: 7', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(true);        
            }, timeout);
            it('cvv: 4 Digital', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_4;
    
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
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('Invalid credit card number');        
            }, timeout);
            it('Card Number: Extra one', async () => 
            {
                const cardNum = "41111111111111112";
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('Invalid credit card number');        
            }, timeout);
            it('Month: Over 12', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = "13";
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('must match \"^(0[1-9]|1[012])$\"');        
            }, timeout);
            it('Year: 2024', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "2024";
                const securityCode = SUCCESS_SECURITY_CODE_3;

                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');          
            }, timeout);
            it('Year: 240', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "240";
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');        
            }, timeout);
            it('Year: 2', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "2";
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');        
            }, timeout);
            it('cvv: 5 Digital', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "12345";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('size must be between 3 and 4');        
            }, timeout);
            it('cvv: 2 Digital', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "12";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('size must be between 3 and 4');        
            }, timeout);
            it('Month: Missing', async () => 
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = "";
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual('must match \"^(0[1-9]|1[012])$\"');        
            }, timeout);
            it('Year: Missing', async () =>
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = "";
                const securityCode = SUCCESS_SECURITY_CODE_3;
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual("must match \"^([0-9]{2})$\"");               
            }, timeout);
            it('CVV/CVC: Missing', async () =>
            {
                const cardNum = SUCCESS_CARD_NUMBER;
                const expMon = SUCCESS_EXPIRY_MONTH;
                const expYear = SUCCESS_EXPIRY_YEAR;
                const securityCode = "";
    
                let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                expect(txRes.successful).toEqual(false);        
                expect(txRes.description).toEqual("size must be between 3 and 4");         
            }, timeout);
        });
    });
});