"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider_Info_Stripe = exports.Provider_Info_Till = exports.Provider_Info_Paypal = exports.Provider_Info_Fiserv = exports.Provider_Info = exports.YCPGW_Provider_Data = void 0;
class YCPGW_Provider_Data {
    get porviderType() { return this._porviderType; }
    set porviderType(value) { this._porviderType = value; }
    get providerInfo() { return this._providerInfo; }
    set providerInfo(value) { this._providerInfo = value; }
    constructor(porviderType, providerInfo) {
        this.porviderType = porviderType;
        this.providerInfo = providerInfo;
    }
}
exports.YCPGW_Provider_Data = YCPGW_Provider_Data;
class Provider_Info {
}
exports.Provider_Info = Provider_Info;
class Provider_Info_Fiserv extends Provider_Info {
    constructor(apiKey, apiSecret, apiUrl, apiTestMode) {
        super();
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.apiTestMode = apiTestMode;
    }
}
exports.Provider_Info_Fiserv = Provider_Info_Fiserv;
class Provider_Info_Paypal extends Provider_Info {
    constructor(email, mobile, apiTestMode) {
        super();
        this.email = email;
        this.mobile = mobile;
        this.apiTestMode = apiTestMode;
    }
}
exports.Provider_Info_Paypal = Provider_Info_Paypal;
class Provider_Info_Till extends Provider_Info {
    constructor(apiKey, apiSecret, apiUrl, apiUserName, apiPsd, apiTestMode) {
        super();
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.apiUserName = apiUserName;
        this.apiPsd = apiPsd;
        this.apiTestMode = apiTestMode;
    }
}
exports.Provider_Info_Till = Provider_Info_Till;
class Provider_Info_Stripe extends Provider_Info {
    constructor(apiKey, apiTestMode) {
        super();
        this.apiKey = apiKey;
        this.apiTestMode = apiTestMode;
    }
}
exports.Provider_Info_Stripe = Provider_Info_Stripe;
