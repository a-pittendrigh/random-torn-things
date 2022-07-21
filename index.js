// const purchases = ["16:17:45 - 21/07/22 You bought 4x Feathery Hotel Coupon on Nuvak's bazaar at $13,545,000 each for a total of $54,180,000"];
// const mug = "16:18:00 - 21/07/22 You used 25 energy attacking Nuvak and mugged them for $12,711,972 (chain #1) [view]";

const mug = "11:08:25 - 21/07/22 You used 25 energy attacking TheTollTroll and mugged them for $9,556,339 (chain #1) [view]";
const purchases = [
"11:08:14 - 21/07/22 You bought 1x Type 98 Anti Tank on TheTollTroll's bazaar at $18,000,000 each for a total of $18,000,000",
"11:08:07 - 21/07/22 You bought 1x Type 98 Anti Tank on TheTollTroll's bazaar at $18,500,000 each for a total of $18,500,000",
"11:08:02 - 21/07/22 You bought 24x Lottery Voucher on TheTollTroll's bazaar at $1,050,000 each for a total of $25,200,000",
"11:07:53 - 21/07/22 You bought 144x LSD on TheTollTroll's bazaar at $52,500 each for a total of $7,560,000",
"11:07:49 - 21/07/22 You bought 490x Tear Gas on TheTollTroll's bazaar at $64,500 each for a total of $31,605,000"]

const valuesOfPurchases = (purchases) => {
    return purchases.map(purchase => {
        const wordsInSentance = purchase.split(' ');
        const quantity = Number.parseInt(wordsInSentance[5].replace('x', ''));
        const startOfAmount = purchase.indexOf('$');
        const endOfAmount = purchase.indexOf('each');
        const amount = purchase.substring(startOfAmount, endOfAmount - 1);
        const nameOfItem = purchase.substring(purchase.indexOf('x') + 2, purchase.indexOf(' on '))
        return {
            nameOfItem,
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