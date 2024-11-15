export declare class YCPGW_Provider_Data {
    private _porviderType;
    private _providerInfo;
    get porviderType(): string;
    set porviderType(value: string);
    get providerInfo(): Provider_Info;
    set providerInfo(value: Provider_Info);
    constructor(porviderType: string, providerInfo: any);
}
export declare class Provider_Info {
}
export declare class Provider_Info_Fiserv extends Provider_Info {
    apiKey: string;
    apiSecret: string;
    apiUrl: string;
    apiTestMode: boolean | undefined;
    constructor(apiKey: string, apiSecret: string, apiUrl: string, apiTestMode?: boolean);
}
export declare class Provider_Info_Paypal extends Provider_Info {
    email: string;
    mobile: string;
    apiTestMode: boolean | undefined;
    constructor(email: string, mobile: string, apiTestMode?: boolean);
}
export declare class Provider_Info_Till extends Provider_Info {
    apiKey: string;
    apiSecret: string;
    apiUrl: string;
    apiUserName: string;
    apiPsd: string;
    apiTestMode: boolean | undefined;
    constructor(apiKey: string, apiSecret: string, apiUrl: string, apiUserName: string, apiPsd: string, apiTestMode?: boolean);
}
export declare class Provider_Info_Stripe extends Provider_Info {
    apiKey: string;
    apiTestMode: boolean | undefined;
    constructor(apiKey: string, apiTestMode?: boolean);
}
