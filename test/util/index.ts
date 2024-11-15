import {YCPGW_Payment_Processor, model} from '../../src'

export const createProcessorTest = (testData: any) => new YCPGW_Payment_Processor(testData);
export const executePaymentWithCardInfoTest = async (pp: YCPGW_Payment_Processor, cardNumber: string, expiryMonth: string, expiryYear: string, securityCode: string, amount: number, currency: string) => 
    await pp.TX_Execute(
        new model.YCPGW_Amount_Info(amount, currency), 
        new model.YCPGW_Transaction_Info(
            model.YCPGW_Lib.PAYMENT_CARD, 
            new model.YCPGW_Card_Info().setCardInfoWithNumber(cardNumber, expiryMonth, expiryYear, securityCode)
        )
    );

export const showLog = (where: string, target: any) => 
{
    try {
        console.log(`::> ${where}:`,JSON.stringify(target, null, 2));
    } catch (error) {
        console.log(`::> ${where}:`, target);
    }
};

export const fetchCardTokenSingleUseTest = async (pp: YCPGW_Payment_Processor, cardNumber: string, expiryMonth: string, expiryYear: string, securityCode: string) =>
    await pp.Card_Token_Fetch(
        new model.YCPGW_Transaction_Info(
            model.YCPGW_Lib.PAYMENT_CARD_TOKEN_FETCH, 
            new model.YCPGW_Card_Info().setCardInfoWithNumber(cardNumber, expiryMonth, expiryYear, securityCode)
        ),
        new model.YCPGW_Card_Token_Reuse_info(false)
        );

export const fetchCardTokenMultipleUseTest = async (pp: YCPGW_Payment_Processor, cardNumber: string, expiryMonth: string, expiryYear: string, securityCode: string, customerId?: string, cusName?: string, cusEmail?: string) =>
{
    let cusInfo: model.YCPGW_Customer_info | undefined;
    if (customerId && !cusName && !cusEmail) cusInfo = new model.YCPGW_Customer_info(customerId);
    if (!customerId && cusName && cusEmail) cusInfo = new model.YCPGW_Customer_info(cusName, cusEmail);
    if (customerId && cusName && cusEmail) cusInfo = new model.YCPGW_Customer_info(customerId, cusName, cusEmail);

    return await pp.Card_Token_Fetch(
        new model.YCPGW_Transaction_Info(
            model.YCPGW_Lib.PAYMENT_CARD_TOKEN_FETCH, 
            new model.YCPGW_Card_Info().setCardInfoWithNumber(cardNumber, expiryMonth, expiryYear, securityCode)
        ),
        new model.YCPGW_Card_Token_Reuse_info(
            true, 
            cusInfo
        )
    );
}

export const executePaymentWithCardTokenTest = async (pp: YCPGW_Payment_Processor, cardToken: string, customerId: string|undefined, amount: number, currency: string) =>
    await pp.TX_Execute(
        new model.YCPGW_Amount_Info(amount, currency), 
        new model.YCPGW_Transaction_Info(
            model.YCPGW_Lib.PAYMENT_CARD_TOKEN, 
            new model.YCPGW_Card_Info().setCardInfoWithToken(cardToken, customerId)
        ));

export const fetchCustomerIdTest = async (pp: YCPGW_Payment_Processor, cusName: string, cusEmail: string) => 
{
    let cusInfo: model.YCPGW_Customer_info = new model.YCPGW_Customer_info(cusName, cusEmail);
    return await pp.createUserForProvider(cusInfo);
}

export const executeRefundTest = async (pp: YCPGW_Payment_Processor, transactionId: string, amount: number, currency: string) =>
    pp.TX_Refund(
        transactionId,
        new model.YCPGW_Amount_Info(amount, currency)
    );

export const checkType_YCPGW_Payment_Processor_test = (object: any) => object instanceof YCPGW_Payment_Processor;