export class YCPGW_Provider_Data
{
    private _porviderType!: string;
    private _providerInfo!: Provider_Info;

    public get porviderType(): string {return this._porviderType;}
    public set porviderType(value: string) {this._porviderType = value;}
    public get providerInfo(): Provider_Info {return this._providerInfo;}
    public set providerInfo(value: Provider_Info) {this._providerInfo = value;}
    
    constructor (porviderType: string, providerInfo: any)
    {
        this.porviderType = porviderType;
        this.providerInfo = providerInfo;
    }

}

export class Provider_Info {}
export class Provider_Info_Fiserv extends Provider_Info
{
    public apiKey: string;
    public apiSecret: string;
    public apiUrl: string;
    public apiTestMode: boolean | undefined;

    constructor (apiKey: string, apiSecret: string, apiUrl: string, apiTestMode?: boolean)
    {
        super();
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.apiTestMode = apiTestMode;
    }
}

export class Provider_Info_Paypal extends Provider_Info
{
    public email: string;
    public mobile: string;
    public apiTestMode: boolean | undefined;

    constructor (email: string, mobile: string, apiTestMode?: boolean)
    {
        super();
        this.email = email;
        this.mobile = mobile;
        this.apiTestMode = apiTestMode;
    }
}

export class Provider_Info_Till extends Provider_Info
{
    public apiKey: string;
    public apiSecret: string;
    public apiUrl: string;
    public apiUserName: string;
    public apiPsd: string;
    public apiTestMode: boolean | undefined;

    constructor (apiKey: string, apiSecret: string, apiUrl: string, apiUserName: string, apiPsd: string, apiTestMode?: boolean)
    {
        super();
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.apiUserName = apiUserName;
        this.apiPsd = apiPsd;
        this.apiTestMode = apiTestMode;
    }
}

export class Provider_Info_Stripe extends Provider_Info
{
    public apiKey: string;
    public apiTestMode: boolean | undefined;

    constructor (apiKey: string, apiTestMode?: boolean)
    {
        super();
        this.apiKey = apiKey;
        this.apiTestMode = apiTestMode;
    }
}