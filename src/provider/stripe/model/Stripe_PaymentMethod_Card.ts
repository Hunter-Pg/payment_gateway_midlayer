export class Stripe_PaymentMethod_Card
{
    private customerId: string;
    private cardTokenId: string;
    
    constructor (customerId: string, cardTokenId: string)
    {
      this.customerId = customerId;      
      this.cardTokenId = cardTokenId;      
    }
}