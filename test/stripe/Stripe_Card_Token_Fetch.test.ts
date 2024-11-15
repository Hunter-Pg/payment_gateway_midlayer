// test common: jest --coverage ./test/stripe/Stripe_Card_Token_Fetch.test.ts
import { YCPGW_Payment_Processor } from '../../src';
import { showLog, fetchCustomerIdTest, fetchCardTokenMultipleUseTest, fetchCardTokenSingleUseTest, createProcessorTest } from '../util';
import { SUCCESS_CARD_NUMBER, SUCCESS_EXPIRY_MONTH, SUCCESS_EXPIRY_YEAR, SUCCESS_SECURITY_CODE_3, SUCCESS_EXPIRY_MONTH_PAD, PROVIDER_KEY, PROVIDER_TYPE, SUCCESS_SECURITY_CODE_4, SUCCESS_EXPIRY_MONTH_NO_PAD, SUCCESS_USER_EMAIL, SUCCESS_USER_NAME, TIMEOUT, SUCCESS_EXPIRY_YEAR_FULL } from './Stripe_Config.test';

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
        
    let customerId: string|undefined;
    it('Customer Id Fetch', async () => 
    {
        const userName = SUCCESS_USER_NAME;
        const userEmail = SUCCESS_USER_EMAIL;

        const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
        customerId = txRes.transactionId;
        expect(txRes.successful).toEqual(true); 
    });

    describe('Success', () => 
    {
        describe('Card Token Fetch', () =>
        {
            describe('Single Use', () =>
            {
                it('Normal', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('Month: 07', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('Month: 7', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('cvv: 4 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_4;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
                it('Year: 2024', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR_FULL;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
    
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);  
                }, timeout);
                it('CVV/CVC: Missing', async () =>
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "";
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(true);        
                }, timeout);
            });

            describe('Multiple Use', () =>
            {
                describe('Customer Id', () =>
                {
                    it('Normal', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Month: 07', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Month: 7', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('cvv: 4 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_4;
                        const cusId = customerId;
            
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Year: 2024', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR_FULL;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
            
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);  
                    }, timeout);
                    it('CVV/CVC: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "";
                        const cusId = customerId;
            
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                });

                describe('User Name: User Email', () =>
                {
                    it('Normal', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    
                    it('Month: 07', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Month: 7', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('cvv: 4 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_4;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Year: 2024', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR_FULL;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);  
                    }, timeout);
                    it('CVV/CVC: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "";
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                });

                describe('Customer Id: User Name: User Email', () =>
                {
                    it('Normal', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Month: 07', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Month: 7', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH_NO_PAD;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('cvv: 4 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_4;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                    it('Year: 2024', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR_FULL;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);  
                    }, timeout);
                    it('CVV/CVC: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "";
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(true);        
                    }, timeout);
                });
            });
        });
    });

    describe('Fault', () =>
    {
        describe('Card Token Fetch', () =>
        {
            describe('Single Use', () =>
            {
                it('Card Number: Missing', async () => 
                {
                    const cardNum = "411111111111111";
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('Your card number is incorrect.');        
                }, timeout);
                it('Card Number: Extra one', async () => 
                {
                    const cardNum = "41111111111111112";
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual('Your card number is incorrect.');        
                }, timeout);
                it('Month: Over 12', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = "13";
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's expiration month is invalid.");        
                }, timeout);
                it('Year: 240', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "240";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's expiration year is invalid.");        
                }, timeout);
                it('Year: 2', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "2";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's expiration year is invalid.");        
                }, timeout);
                it('cvv: 5 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "12345";
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's security code is invalid.");        
                }, timeout);
                it('cvv: 2 Digital', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = "12";
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's security code is invalid.");        
                }, timeout);
                it('Month: Missing', async () => 
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = "";
                    const expYear = SUCCESS_EXPIRY_YEAR;
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's expiration month is invalid.");        
                }, timeout);
                it('Year: Missing', async () =>
                {
                    const cardNum = SUCCESS_CARD_NUMBER;
                    const expMon = SUCCESS_EXPIRY_MONTH;
                    const expYear = "";
                    const securityCode = SUCCESS_SECURITY_CODE_3;
        
                    let txRes = await fetchCardTokenSingleUseTest(pp, cardNum, expMon, expYear, securityCode);
                    expect(txRes.successful).toEqual(false);        
                    expect(txRes.description).toEqual("Your card's expiration year is invalid.");               
                }, timeout);
            });

            describe('Multiple Use', () =>
            {
                describe('Customer Id', () =>
                {
                    it('Customer Id Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = "";
        
                        try {
                            await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        } catch (error) {
                            expect(error.message).toEqual("No Customer Infomation");       
                        }     
                    }, timeout);
                    it('Card Number: Missing', async () => 
                    {
                        const cardNum = "411111111111111";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Card Number: Extra one', async () => 
                    {
                        const cardNum = "41111111111111112";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Month: Over 12', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "13";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 240', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "240";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 2', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "2";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 5 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12345";
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 2 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12";
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Month: Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");               
                    }, timeout);
                });

                describe('User Name: User Email', () =>
                {
                    it('User Name & User Email Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = "";
                        const userEmail = "";
        
                        try {
                            await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        } catch (error) {
                            expect(error.message).toEqual("No Customer Infomation");       
                        }        
                    }, timeout);
                    it('Card Number: Missing', async () => 
                    {
                        const cardNum = "411111111111111";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Card Number: Extra one', async () => 
                    {
                        const cardNum = "41111111111111112";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Month: Over 12', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "13";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 240', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "240";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 2', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "2";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 5 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12345";
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 2 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12";
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Month: Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, undefined, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");               
                    }, timeout);
                });

                describe('Customer Id: User Name: User Email', () =>
                {
                    it('Customer Id & User Name & User Email Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = "";
                        const userName = "";
                        const userEmail = "";
        
                        try {
                            await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        } catch (error) {
                            expect(error.message).toEqual("No Customer Infomation");       
                        }
                    }, timeout);
                    it('Card Number: Missing', async () => 
                    {
                        const cardNum = "411111111111111";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Card Number: Extra one', async () => 
                    {
                        const cardNum = "41111111111111112";
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual('Missing required param: source.');        
                    }, timeout);
                    it('Month: Over 12', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "13";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 240', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "240";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: 2', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "2";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 5 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12345";
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('cvv: 2 Digital', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = "12";
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Month: Missing', async () => 
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = "";
                        const expYear = SUCCESS_EXPIRY_YEAR;
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");        
                    }, timeout);
                    it('Year: Missing', async () =>
                    {
                        const cardNum = SUCCESS_CARD_NUMBER;
                        const expMon = SUCCESS_EXPIRY_MONTH;
                        const expYear = "";
                        const securityCode = SUCCESS_SECURITY_CODE_3;
                        const cusId = customerId;
                        const userName = SUCCESS_USER_NAME;
                        const userEmail = SUCCESS_USER_EMAIL;
        
                        let txRes = await fetchCardTokenMultipleUseTest(pp, cardNum, expMon, expYear, securityCode, cusId, userName, userEmail);
                        expect(txRes.successful).toEqual(false);        
                        expect(txRes.description).toEqual("Missing required param: source.");               
                    }, timeout);
                });
            });
        });
    });
});