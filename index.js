const purchases = ["16:17:45 - 21/07/22 You bought 4x Feathery Hotel Coupon on Nuvak's bazaar at $13,545,000 each for a total of $54,180,000"];
const mug = "16:18:00 - 21/07/22 You used 25 energy attacking Nuvak and mugged them for $12,711,972 (chain #1) [view]";

const valuesOfPurchases = (purchases) => {
    return purchases.map(purchase => {
        const wordsInSentance = purchase.split(' ');
        const quantity = Number.parseInt(wordsInSentance[5].replace('x', ''));
        const startOfAmount = purchase.indexOf('$');
        const endOfAmount = purchase.indexOf('each');
        const amount = purchase.substring(startOfAmount, endOfAmount - 1);
        return {
            quantity,
            amount: asInt(amount)
        }
    })
}

const valueOfMug = (mug) => {
    return Number.parseInt(asInt(mug.substring(mug.indexOf('$'), mug.indexOf(' ('))))
}

const mugPercentage = (purchases, valueOfMug) => {
    console.log("total mug value: ", purchases.reduce((sum, { amount, quantity}) => (sum + amount * quantity), 0));
    return valueOfMug / purchases.reduce((sum, { amount, quantity}) => (sum + amount * quantity), 0);
}

const purchasesWithMinimumSell = (purchases, mug) => {
    const parsedPurchases = valuesOfPurchases(purchases);
    const mugPerc = mugPercentage(parsedPurchases, valueOfMug(mug))
    const withMinimumSell = parsedPurchases.map(purchase => {
        return { ...purchase, minimumSell: (purchase.amount * (1 - mugPerc)) }
    })
    return {
        mug: valueOfMug(mug),
        mugPercentage: mugPerc,
        purchasesWithMinimumSell: withMinimumSell
    }
}

const asInt = (value) => Number.parseInt(value.split(',').join('').replace('$', ''))

console.log(purchasesWithMinimumSell(purchases, mug))