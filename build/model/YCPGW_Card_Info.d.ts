import { YCPGW_Common_Info } from "./YCPGW_Common_Info";
export declare class YCPGW_Card_Info extends YCPGW_Common_Info {
    private _customerId?;
    private _cardTokenId?;
    private _description?;
    private _number?;
    private _expiryMonth?;
    private _expiryYear?;
    private _securityCode?;
    private _cardHolder?;
    setCardInfoWithToken(cardTokenId: string, customerId?: string, description?: string, userId?: string): this;
    setCardInfoWithNumber(number: string, expiryMonth: string, expiryYear: string, securityCode: string, userId?: string, cardHolder?: string): this;
    get customerId(): string;
    set customerId(value: string);
    get cardTokenId(): string;
    set cardTokenId(value: string);
    get description(): string;
    set description(value: string);
    get number(): string;
    set number(value: string);
    get expiryMonth(): string;
    set expiryMonth(value: string);
    get expiryYear(): string;
    set expiryYear(value: string);
    get securityCode(): string;
    set securityCode(value: string);
    get cardHolder(): string;
    set cardHolder(value: string);
}
