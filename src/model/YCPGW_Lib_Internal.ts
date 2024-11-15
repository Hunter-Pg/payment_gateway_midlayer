export class YCPGW_Lib_Internal
{
    // DEBUG MODE
    protected readonly DEBUG_MODE = false;
    // GENERAL
    protected readonly GENERAL_YCPGW_RECURRING_PAYMENT = "Recurring Payment From YCPGW";
    protected readonly GENERAL_NONE = undefined;
    protected readonly GENERAL_SHA256 = 256;
    protected readonly GENERAL_SHA512 = 512;
    protected readonly GENERAL_BASE64 = "base64";
    protected readonly GENERAL_STATUS_FINISHED = "FINISHED";
    // PAYMENT
    protected readonly PAYMENT_TYPE_ERROR = "Sender Type Error";
    protected readonly PAYMENT_WITH_CARD_TOKEN_ERROR = "Card Token Is Required";
    protected readonly PAYMENT_TYPE_CARD_TOKEN_RESURRING_ERROR = "Sender Type Must be 'PAYMENT_RECURRING_WITH_CARD_TOKEN'";
    protected readonly PAYMENT_TYPE_CARD_TOKEN_ERROR = "Sender Type Must be 'PAYMENT_CARD_TOKEN'";
    // PAYMENT_FISERV
    protected readonly PAYMENT_FISERV_RETURN = "ReturnTransaction";
    protected readonly PAYMENT_FISERV_CARD_SALE = "PaymentCardSaleTransaction";
    protected readonly PAYMENT_FISERV_CARD_CREDIT_TEST_MODE = "PaymentCardCreditTransaction";
    protected readonly PAYMENT_FISERV_CARD_TOKEN = "PaymentTokenSaleTransaction";
    protected readonly PAYMENT_FISERV_CARD_TOKEN_TEST_MODE = "PaymentTokenCreditTransaction";
    protected readonly PAYMENT_FISERV_CARD_TOKEN_FETCH = "PaymentCardPaymentTokenizationRequest";
    protected readonly PAYMENT_FISERV_RECURRING_PAYMENT = "PaymentMethodPaymentSchedulesRequest";
    // PAYMENT_STRIPE
    // HEADER
    protected readonly HEADER_CONTENT_TYPE_UTF8 = "application/json; charset=utf-8";
    protected readonly HEADER_CONTENT_TYPE = "application/json";
    protected readonly HEADER_TILL_METHOD_POST = "POST";
    protected readonly HEADER_TILL_METHOD_GET = "GET";
    protected readonly HEADER_TILL_AUTH = "Basic";
    // ENDPOINT
    protected readonly ENDPOINT_FISERV_PAYMENTS = "payments";    
    protected readonly ENDPOINT_FISERV_PAYMENT_TOKENS = "payment-tokens";    
    protected readonly ENDPOINT_TILL_TRANSACTION_REFUND = "refund";
    protected readonly ENDPOINT_TILL_TRANSACTION_REGISTER = "register";
    protected readonly ENDPOINT_TILL_TRANSACTION = "transaction";
    protected readonly ENDPOINT_TILL_TRANSACTION_DEBIT = "debit";
    // PROVIDER MESSAGE
    protected readonly PROVIDER_TYPE_ERROR = "TypeError ::> No Provider Found";
    protected readonly PROVIDER_FISERV = "fiserv";
    protected readonly PROVIDER_FISERV_API_KEY = "provider_key";
    protected readonly PROVIDER_FISERV_API_SECRET = "provider_secret";
    protected readonly PROVIDER_FISERV_API_URL = "provider_url";
    protected readonly PROVIDER_FISERV_MISS_KEY = "Fiserv ::> Missing Key";
    protected readonly PROVIDER_FISERV_MISS_SECRET = "Fiserv ::> Missing Secret";
    protected readonly PROVIDER_FISERV_MISS_URL = "Fiserv ::> Missing Url";    
    protected readonly PROVIDER_STRIPE = "stripe";
    protected readonly PROVIDER_STRIPE_MISS_KEY = "Stripe ::> Missing Key";
    protected readonly PROVIDER_PAYPAL = "paypal";
    protected readonly PROVIDER_TILL = "till";
    protected readonly PROVIDER_TILL_MISS_KEY = "Till ::> Missing Key";
    protected readonly PROVIDER_TILL_MISS_SECRET = "Till ::> Missing Secret";
    protected readonly PROVIDER_TILL_MISS_URL = "Till ::> Missing Url"; 
    protected readonly PROVIDER_TILL_MISS_USER_NAME = "Till ::> Missing User Name"; 
    protected readonly PROVIDER_TILL_MISS_PASSWORD = "Till ::> Missing Password"; 
    // FUNCTION
    protected readonly FUNCTION_NOT_IMOLEMENT = "Method Not Implement";    
    // RESPONSE
    protected readonly RESPONSE_STATUS_ARRAY = ["APPROVED", "WAITING", "DECLINED"];
    protected readonly RESPONSE_ERROR_GENERAL = "Internet Error";
    protected readonly RESPONSE_ID_UNDEFINED = "ID Undefined";
    protected readonly RESPONSE_TRASACTION_SUCCESSFUL = "Transaction With No Issue";
    protected readonly RESPONSE_CREATE_CUSTOMER_SUCCESSFUL = "Create Customer Successful";
    // ERROR MESSAGE
    protected readonly ERROR_OBJECT_UNDEFINED = "is Empty or Undifined";
    protected readonly ERROR_INPUT = "Input Error";
    protected readonly ERROR_MISSING_CUSTOMER_INFO = "No Customer Infomation";
    protected readonly ERROR_MISSING_RECURRING_PAYMENT_INFO = "No Recurring Payment Infomation";
    protected readonly ERROR_MISSING_CLASS_RESURRING_INFO = "Missing Class:: YCPGW_Recurring_Info Is Required";
    protected readonly ERROR_MISSING_CLASS_CARD_INFO = "Missing Class:: YCPGW_Card_Info Is Required";
    protected readonly ERROR_MISSING_INTERVAL_TYPE = "Interval Must Be one of 'month, year, week, or day'";
    // WARNNING MESSAGE
    protected readonly WARNNING_CUSTOMER_INFO_ERROR = "Customer Infomation Not Required";

}