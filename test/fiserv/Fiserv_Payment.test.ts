// test common: jest --coverage ./test/fiserv/Fiserv_Payment.test.ts
import { YCPGW_Payment_Processor } from '../../src';
import { showLog, fetchCardTokenMultipleUseTest, executePaymentWithCardInfoTest, executePaymentWithCardTokenTest, createProcessorTest } from '../util';
import { PROVIDER_KEY, PROVIDER_SECRET, PROVIDER_URL, SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_MONTH_NO_PAD, SUCCESS_EXPIRY_MONTH_PAD, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3, PROVIDER_TYPE, SUCCESS_SECURITY_CODE_4, TIMEOUT, FIXED_AMOUNT, FIXED_CURRENCY } from './Fiserv_Config.test';

describe('Fiserv', () => 
{
    let timeout = 30000;
    beforeEach(() =>{
        jest.resetAllMocks();
    });

    // init processor
    let pp: YCPGW_Payment_Processor;
    it('Init Processor: Testing Env', () => 
    {
        const testData = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"payment_test_mode":"true"};
        pp = createProcessorTest(testData);
        expect(pp).not.toEqual(undefined);
    });

    describe('Success', () => 
    {
        describe('Payment', () =>
        {
            describe('Credit Card', () =>
            { 
                it('Normal', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;

                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('Month: 07', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;

                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('Month: 7', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;

                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                
                it('cvv: 4 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_4;
        
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
            });

            describe('Card Token', () =>
            {
                it('Normal', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;

                    let cardTokenRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(cardTokenRes.successful).toEqual(true);
                    let txRes = await executePaymentWithCardTokenTest(pp, cardTokenRes.cardToken!, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
            });
        });
    });

    describe('Fault', () =>
    {
        describe('Payment', () =>
        {
            describe('Credit Card', () =>
            {
                it('Card Number: Missing one', async () => 
                {
                    const cardNum = "411111111111111";
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('2303: Invalid credit card number');        
                }, timeout);
                it('Card Number: Extra one', async () => 
                {
                    const cardNum = "41111111111111112";
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('2303: Invalid credit card number');        
                }, timeout);
                it('Month: Over 12', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = "13";
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('must match \"^(0[1-9]|1[012])$\"');        
                }, timeout);
                it('Year: 2024', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "2024";
                    const securityCode = SUCCESS_SECURITY_CODE_3;

                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');             
                }, timeout);
                it('Year: 240', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "240";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');            
                }, timeout);
                it('Year: 2', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "2";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('must match \"^([0-9]{2})$\"');        
                }, timeout);
                it('cvv: 5 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "12345";
        
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('size must be between 3 and 4');        
                }, timeout);
                it('cvv: 2 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "12";
        
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('size must be between 3 and 4');        
                }, timeout);
                it('Month: Missing', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = "";
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('must match \"^(0[1-9]|1[012])$\"');        
                }, timeout);
                it('Year: Missing', async () =>
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("must match \"^([0-9]{2})$\"");        
                }, timeout);
                it('CVV/CVC: Missing', async () =>
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "";
    
                    let txRes = await executePaymentWithCardInfoTest(pp, cardNum, expMon, expYear, securityCode, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("size must be between 3 and 4");        
                }, timeout);
            });

            describe('Card Token', () =>
            {
                it('No Register', async () => 
                {
                    const cardToken = "123456789";
                    let txRes = await executePaymentWithCardTokenTest(pp, cardToken, undefined, FIXED_AMOUNT, FIXED_CURRENCY);
                    expect(txRes.successful).toEqual(false);   
                    expect(txRes.description).toEqual("5010: Hosted data was not found.");      
                }, timeout);
            });
        });
    });
});