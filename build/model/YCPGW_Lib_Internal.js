"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Lib_Internal = void 0;
class YCPGW_Lib_Internal {
    constructor() {
        // DEBUG MODE
        this.DEBUG_MODE = false;
        // GENERAL
        this.GENERAL_YCPGW_RECURRING_PAYMENT = "Recurring Payment From YCPGW";
        this.GENERAL_NONE = undefined;
        this.GENERAL_SHA256 = 256;
        this.GENERAL_SHA512 = 512;
        this.GENERAL_BASE64 = "base64";
        this.GENERAL_STATUS_FINISHED = "FINISHED";
        // PAYMENT
        this.PAYMENT_TYPE_ERROR = "Sender Type Error";
        this.PAYMENT_WITH_CARD_TOKEN_ERROR = "Card Token Is Required";
        this.PAYMENT_TYPE_CARD_TOKEN_RESURRING_ERROR = "Sender Type Must be 'PAYMENT_RECURRING_WITH_CARD_TOKEN'";
        this.PAYMENT_TYPE_CARD_TOKEN_ERROR = "Sender Type Must be 'PAYMENT_CARD_TOKEN'";
        // PAYMENT_FISERV
        this.PAYMENT_FISERV_RETURN = "ReturnTransaction";
        this.PAYMENT_FISERV_CARD_SALE = "PaymentCardSaleTransaction";
        this.PAYMENT_FISERV_CARD_CREDIT_TEST_MODE = "PaymentCardCreditTransaction";
        this.PAYMENT_FISERV_CARD_TOKEN = "PaymentTokenSaleTransaction";
        this.PAYMENT_FISERV_CARD_TOKEN_TEST_MODE = "PaymentTokenCreditTransaction";
        this.PAYMENT_FISERV_CARD_TOKEN_FETCH = "PaymentCardPaymentTokenizationRequest";
        this.PAYMENT_FISERV_RECURRING_PAYMENT = "PaymentMethodPaymentSchedulesRequest";
        // PAYMENT_STRIPE
        // HEADER
        this.HEADER_CONTENT_TYPE_UTF8 = "application/json; charset=utf-8";
        this.HEADER_CONTENT_TYPE = "application/json";
        this.HEADER_TILL_METHOD_POST = "POST";
        this.HEADER_TILL_METHOD_GET = "GET";
        this.HEADER_TILL_AUTH = "Basic";
        // ENDPOINT
        this.ENDPOINT_FISERV_PAYMENTS = "payments";
        this.ENDPOINT_FISERV_PAYMENT_TOKENS = "payment-tokens";
        this.ENDPOINT_TILL_TRANSACTION_REFUND = "refund";
        this.ENDPOINT_TILL_TRANSACTION_REGISTER = "register";
        this.ENDPOINT_TILL_TRANSACTION = "transaction";
        this.ENDPOINT_TILL_TRANSACTION_DEBIT = "debit";
        // PROVIDER MESSAGE
        this.PROVIDER_TYPE_ERROR = "TypeError ::> No Provider Found";
        this.PROVIDER_FISERV = "fiserv";
        this.PROVIDER_FISERV_API_KEY = "provider_key";
        this.PROVIDER_FISERV_API_SECRET = "provider_secret";
        this.PROVIDER_FISERV_API_URL = "provider_url";
        this.PROVIDER_FISERV_MISS_KEY = "Fiserv ::> Missing Key";
        this.PROVIDER_FISERV_MISS_SECRET = "Fiserv ::> Missing Secret";
        this.PROVIDER_FISERV_MISS_URL = "Fiserv ::> Missing Url";
        this.PROVIDER_STRIPE = "stripe";
        this.PROVIDER_STRIPE_MISS_KEY = "Stripe ::> Missing Key";
        this.PROVIDER_PAYPAL = "paypal";
        this.PROVIDER_TILL = "till";
        this.PROVIDER_TILL_MISS_KEY = "Till ::> Missing Key";
        this.PROVIDER_TILL_MISS_SECRET = "Till ::> Missing Secret";
        this.PROVIDER_TILL_MISS_URL = "Till ::> Missing Url";
        this.PROVIDER_TILL_MISS_USER_NAME = "Till ::> Missing User Name";
        this.PROVIDER_TILL_MISS_PASSWORD = "Till ::> Missing Password";
        // FUNCTION
        this.FUNCTION_NOT_IMOLEMENT = "Method Not Implement";
        // RESPONSE
        this.RESPONSE_STATUS_ARRAY = ["APPROVED", "WAITING", "DECLINED"];
        this.RESPONSE_ERROR_GENERAL = "Internet Error";
        this.RESPONSE_ID_UNDEFINED = "ID Undefined";
        this.RESPONSE_TRASACTION_SUCCESSFUL = "Transaction With No Issue";
        this.RESPONSE_CREATE_CUSTOMER_SUCCESSFUL = "Create Customer Successful";
        // ERROR MESSAGE
        this.ERROR_OBJECT_UNDEFINED = "is Empty or Undifined";
        this.ERROR_INPUT = "Input Error";
        this.ERROR_MISSING_CUSTOMER_INFO = "No Customer Infomation";
        this.ERROR_MISSING_RECURRING_PAYMENT_INFO = "No Recurring Payment Infomation";
        this.ERROR_MISSING_CLASS_RESURRING_INFO = "Missing Class:: YCPGW_Recurring_Info Is Required";
        this.ERROR_MISSING_CLASS_CARD_INFO = "Missing Class:: YCPGW_Card_Info Is Required";
        this.ERROR_MISSING_INTERVAL_TYPE = "Interval Must Be one of 'month, year, week, or day'";
        // WARNNING MESSAGE
        this.WARNNING_CUSTOMER_INFO_ERROR = "Customer Infomation Not Required";
    }
}
exports.YCPGW_Lib_Internal = YCPGW_Lib_Internal;
