// test common: jest --coverage ./test/stripe/Stripe_Customer_Fetch.test.ts
import { YCPGW_Payment_Processor } from "../../src";
import { fetchCustomerIdTest, createProcessorTest } from "../util";
import { PROVIDER_TYPE, PROVIDER_KEY, SUCCESS_USER_EMAIL, SUCCESS_USER_NAME } from "./Stripe_Config.test";

describe('Stripe', () => 
{
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

    describe('Customer Id Fetch', () => 
    {
        describe('Success', () => 
        {
            it('Normal', async () => 
            {
                const userName = SUCCESS_USER_NAME;
                const userEmail = SUCCESS_USER_EMAIL;

                const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
                expect(txRes.successful).toEqual(true); 
            });
            it('No User Name', async () => 
            {
                const userName = "";
                const userEmail = SUCCESS_USER_EMAIL;

                const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
                expect(txRes.successful).toEqual(true); 
            });
            it('No Email', async () => 
            {
                const userName = SUCCESS_USER_NAME;
                const userEmail = "";

                const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
                expect(txRes.successful).toEqual(true); 
            });
            it('No Both', async () => 
            {
                const userName = "";
                const userEmail = "";

                const txRes = await fetchCustomerIdTest(pp, userName, userEmail);
                expect(txRes.successful).toEqual(true); 
            });
        });
    });
});