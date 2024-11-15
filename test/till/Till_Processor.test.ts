// test common: jest --coverage ./test/till/Till_Processor.test.ts
import {YCPGW_Payment_Processor, model} from '../../src'
import { checkType_YCPGW_Payment_Processor_test, createProcessorTest } from '../util';
import { BUILD_YCPGW_PAYMENT_PROCESSOR, EXPECT_INPUT_EXPECT_OUTPUT, INPUT_STRING_TESTING_MODE, INPUT_STRING_PRODUCTION_MODE, INPUT_STRING_PRODUCTION_MODE_WITHOUT_ARGUMENT, INPUT_OBJECT_TESTING_MODE, INPUT_OBJECT_PRODUCTION_MODE, INPUT_OBJECT_PRODUCTION_MODE_WITHOUT_ARGUMENT, INPUT_CLASS_TESTING_MODE, INPUT_CLASS_PRODUCTION_MODE, INPUT_CLASS_PRODUCTION_MODE_WITHOUT_ARGUMENT, UNEXPECT_INPUT_EXPECT_OUTPUT, MISSING_PROVIDER_KEY, MISSING_PROVIDER_PASSWORD, MISSING_PROVIDER_SECRET, MISSING_PROVIDER_TYPE, MISSING_PROVIDER_URL, MISSING_PROVIDER_USER } from '../util/Common_Config';
import {PROVIDER_KEY, PROVIDER_PASSWORD, PROVIDER_SECRET, PROVIDER_TYPE, PROVIDER_URL, PROVIDER_USER} from './Till_Config.test'

describe('Till Payment', () => 
{
    // TESTING DATA :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
    // EXPECT INPUT
    const SUCCESS_STRING_TEST_MODE = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const SUCCESS_STRING_PROD_MODE = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"false"}`;
    const SUCCESS_STRING_PROD_MODE_NO_ARGUMENT = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}"}`;
    
    const SUCCESS_OBJECT_TEST_MODE = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const SUCCESS_OBJECT_PROD_MODE = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"false"};
    const SUCCESS_OBJECT_PROD_MODE_NO_ARGUMENT = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD};

    const SUCCESS_CLASS_TEST_MODE = new model.YCPGW_Provider_Data(
                                        PROVIDER_TYPE,
                                        new model.Provider_Info_Till(
                                            PROVIDER_KEY,
                                            PROVIDER_SECRET,
                                            PROVIDER_URL,
                                            PROVIDER_USER,
                                            PROVIDER_PASSWORD,
                                            true
                                        )
                                    );
    const SUCCESS_CLASS_PROD_MODE = new model.YCPGW_Provider_Data(
                                            PROVIDER_TYPE,
                                            new model.Provider_Info_Till(
                                                PROVIDER_KEY,
                                                PROVIDER_SECRET,
                                                PROVIDER_URL,
                                                PROVIDER_USER,
                                                PROVIDER_PASSWORD,
                                                false
                                            )
                                        );
    const SUCCESS_CLASS_PROD_MODE_NO_ARGUMENT = new model.YCPGW_Provider_Data(
                                                PROVIDER_TYPE,
                                                new model.Provider_Info_Till(
                                                    PROVIDER_KEY,
                                                    PROVIDER_SECRET,
                                                    PROVIDER_URL,
                                                    PROVIDER_USER,
                                                    PROVIDER_PASSWORD
                                                )
                                            );

    // UNEXPECT INPUT
    const STRING_MISSING_PROVIDER_TYPE = `{"provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const STRING_MISSING_PROVIDER_KEY = `{"provider_type": "${PROVIDER_TYPE}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const STRING_MISSING_PROVIDER_SECRET = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const STRING_MISSING_PROVIDER_URL = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_user":"${PROVIDER_USER}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const STRING_MISSING_PROVIDER_USER = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_psd":"${PROVIDER_PASSWORD}", "payment_test_mode":"true"}`;
    const STRING_MISSING_PROVIDER_PSD = `{"provider_type": "${PROVIDER_TYPE}","provider_key": "${PROVIDER_SECRET}","provider_secret": "${PROVIDER_SECRET}","provider_url": "${PROVIDER_URL}","provider_user":"${PROVIDER_USER}", "payment_test_mode":"true"}`;

    const OBJECT_MISSING_PROVIDER_TYPE = {"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const OBJECT_MISSING_PROVIDER_KEY = {"provider_type": PROVIDER_TYPE,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const OBJECT_MISSING_PROVIDER_SECRET = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const OBJECT_MISSING_PROVIDER_URL = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_user":PROVIDER_USER,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const OBJECT_MISSING_PROVIDER_USER = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_psd":PROVIDER_PASSWORD, "payment_test_mode":"true"};
    const OBJECT_MISSING_PROVIDER_PSD = {"provider_type": PROVIDER_TYPE,"provider_key": PROVIDER_KEY,"provider_secret": PROVIDER_SECRET,"provider_url": PROVIDER_URL,"provider_user":PROVIDER_USER, "payment_test_mode":"true"};
    
    const CLASS_MISSING_PROVIDER_TYPE = new model.YCPGW_Provider_Data(
                                            "",
                                            new model.Provider_Info_Till(
                                                PROVIDER_KEY,
                                                PROVIDER_SECRET,
                                                PROVIDER_URL,
                                                PROVIDER_USER,
                                                PROVIDER_PASSWORD,
                                                true
                                            )
                                        );
    const CLASS_MISSING_PROVIDER_KEY = new model.YCPGW_Provider_Data(
                                            PROVIDER_TYPE,
                                            new model.Provider_Info_Till(
                                                "",
                                                PROVIDER_SECRET,
                                                PROVIDER_URL,
                                                PROVIDER_USER,
                                                PROVIDER_PASSWORD,
                                                true
                                            )
                                        );
    const CLASS_MISSING_PROVIDER_SECRET = new model.YCPGW_Provider_Data(
                                                PROVIDER_TYPE,
                                                new model.Provider_Info_Till(
                                                    PROVIDER_KEY,
                                                    "",
                                                    PROVIDER_URL,
                                                    PROVIDER_USER,
                                                    PROVIDER_PASSWORD,
                                                    true
                                                )
                                            );
    const CLASS_MISSING_PROVIDER_URL = new model.YCPGW_Provider_Data(
                                            PROVIDER_TYPE,
                                            new model.Provider_Info_Till(
                                                PROVIDER_KEY,
                                                PROVIDER_SECRET,
                                                "",
                                                PROVIDER_USER,
                                                PROVIDER_PASSWORD,
                                                true
                                            )
                                        );
    const CLASS_MISSING_PROVIDER_USER = new model.YCPGW_Provider_Data(
                                            PROVIDER_TYPE,
                                            new model.Provider_Info_Till(
                                                PROVIDER_KEY,
                                                PROVIDER_SECRET,
                                                PROVIDER_URL,
                                                "",
                                                PROVIDER_PASSWORD,
                                                true
                                            )
                                        );
    const CLASS_MISSING_PROVIDER_PSD = new model.YCPGW_Provider_Data(
                                            PROVIDER_TYPE,
                                            new model.Provider_Info_Till(
                                                PROVIDER_KEY,
                                                PROVIDER_SECRET,
                                                PROVIDER_URL,
                                                PROVIDER_USER,
                                                "",
                                                true
                                            )
                                        );
    // TESTING DATA :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

    beforeEach(() =>{
        jest.resetAllMocks();
    });

    describe(BUILD_YCPGW_PAYMENT_PROCESSOR, () => 
    {
        let pp: YCPGW_Payment_Processor | undefined;
        describe(EXPECT_INPUT_EXPECT_OUTPUT, () => 
        {
            it(INPUT_STRING_TESTING_MODE, () => 
            {
                const testData = SUCCESS_STRING_TEST_MODE;
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_STRING_PRODUCTION_MODE, () => 
            {
                const testData = SUCCESS_STRING_PROD_MODE;
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_STRING_PRODUCTION_MODE_WITHOUT_ARGUMENT, () => 
            {
                const testData = SUCCESS_STRING_PROD_MODE_NO_ARGUMENT;
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_OBJECT_TESTING_MODE, () => 
            {
                const testData = SUCCESS_OBJECT_TEST_MODE;
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_OBJECT_PRODUCTION_MODE, () => 
            {
                const testData = SUCCESS_OBJECT_PROD_MODE;    
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_OBJECT_PRODUCTION_MODE_WITHOUT_ARGUMENT, () => 
            {
                const testData = SUCCESS_OBJECT_PROD_MODE_NO_ARGUMENT;    
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_CLASS_TESTING_MODE, () => 
            {
                const testData = SUCCESS_CLASS_TEST_MODE;    
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_CLASS_PRODUCTION_MODE, () => 
            {
                const testData = SUCCESS_CLASS_PROD_MODE;    
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
            it(INPUT_CLASS_PRODUCTION_MODE_WITHOUT_ARGUMENT, () => 
            {
                const testData = SUCCESS_CLASS_PROD_MODE_NO_ARGUMENT;    
                pp = createProcessorTest(testData);
                const isProcessorTpye = checkType_YCPGW_Payment_Processor_test(pp);
                expect(isProcessorTpye).toEqual(true);
            });
        });
        
        describe(UNEXPECT_INPUT_EXPECT_OUTPUT, () => 
        {
            describe(INPUT_STRING_TESTING_MODE, () => 
            {
                it(MISSING_PROVIDER_TYPE, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_TYPE;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("TypeError ::> No Provider Found");
                    }
                });
                it(MISSING_PROVIDER_KEY, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_KEY;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Key");
                    }
                });
                it(MISSING_PROVIDER_SECRET, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_SECRET;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Secret");
                    }
                });
                it(MISSING_PROVIDER_URL, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_URL;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Url");
                    }
                });
                it(MISSING_PROVIDER_USER, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_USER;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing User Name");
                    }
                });
                it(MISSING_PROVIDER_PASSWORD, () => 
                {
                    const testData = STRING_MISSING_PROVIDER_PSD;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Password");
                    }
                });
            });

            describe(INPUT_OBJECT_TESTING_MODE, () => 
            {
                it(MISSING_PROVIDER_TYPE, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_TYPE;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Input Error");
                    }
                });
                it(MISSING_PROVIDER_KEY, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_KEY;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Key");
                    }
                });
                it(MISSING_PROVIDER_SECRET, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_SECRET;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Secret");
                    }
                });
                it(MISSING_PROVIDER_URL, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_URL;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Url");
                    }
                });
                it(MISSING_PROVIDER_USER, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_USER;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing User Name");
                    }
                });
                it(MISSING_PROVIDER_PASSWORD, () => 
                {
                    const testData = OBJECT_MISSING_PROVIDER_PSD;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Password");
                    }
                });
            });

            describe(INPUT_CLASS_TESTING_MODE, () => 
            {
                it(MISSING_PROVIDER_TYPE, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_TYPE;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("TypeError ::> No Provider Found");
                    }
                });
                it(MISSING_PROVIDER_KEY, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_KEY;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Key");
                    }
                });
                it(MISSING_PROVIDER_SECRET, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_SECRET;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Secret");
                    }
                });
                it(MISSING_PROVIDER_URL, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_URL;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Url");
                    }
                });
                it(MISSING_PROVIDER_USER, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_USER;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing User Name");
                    }
                });
                it(MISSING_PROVIDER_PASSWORD, () => 
                {
                    const testData = CLASS_MISSING_PROVIDER_PSD;        
                    try {
                        pp = createProcessorTest(testData);
                    } catch (error) {
                        expect(error.message).toEqual("Till ::> Missing Password");
                    }
                });
            });
        });
    });
});