import { YCPGW_Common_Info } from "./YCPGW_Common_Info";

export class YCPGW_Card_Info extends YCPGW_Common_Info
{
    private _customerId?: string;
    private _cardTokenId?: string;
    private _description?: string;

    private _number?: string;
    private _expiryMonth?: string;
    private _expiryYear?: string;
    private _securityCode?: string;
    private _cardHolder?: string;
    

    setCardInfoWithToken (cardTokenId: string, customerId?: string, description?: string, userId?: string)
    {
        this.customerId = customerId!;
        this.cardTokenId = cardTokenId;
        this.description = description || "";
        this.userId = userId!;

        return this;
    };
    
    setCardInfoWithNumber (number: string, expiryMonth: string, expiryYear: string, securityCode: string, userId?: string, cardHolder?: string)
    {
        this.number = number;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.securityCode = securityCode;
        this.userId = userId!;
        this.cardHolder = cardHolder!;

        return this;
    }

    public get customerId(): string { return this._customerId!;}
    public set customerId(value: string) { this._customerId = value;}
    public get cardTokenId(): string  { return this._cardTokenId!;}
    public set cardTokenId(value: string ) { this._cardTokenId = value;}
    public get description(): string  { return this._description!;}
    public set description(value: string ) { this._description = value;}
    public get number(): string{ return this._number!;}
    public set number(value: string) { this._number = value;}
    public get expiryMonth(): string  { return this._expiryMonth!;}
    public set expiryMonth(value: string ) { this._expiryMonth = value;}
    public get expiryYear(): string  { return this._expiryYear!;}
    public set expiryYear(value: string ) { this._expiryYear = value;}
    public get securityCode(): string  { return this._securityCode!;}
    public set securityCode(value: string ) { this._securityCode = value;}
    public get cardHolder(): string {return this._cardHolder!;}
    public set cardHolder(value: string) {this._cardHolder = value;}
}