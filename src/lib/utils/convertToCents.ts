export function convertToCents(price:number){
    const priceInCents = Math.floor(price * 100)
    return priceInCents;
}

export function formatPrice(price: number){
    const priceInDollars = price / 100
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(priceInDollars)
  }