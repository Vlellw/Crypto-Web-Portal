async function crypto_data(coin_name, days){
    let kol = 0
    let a1 = await fetch("https://api.coingecko.com/api/v3/coins/" + coin_name + "/market_chart?vs_currency=usd&days=" + days);
    let a2 = await a1.json();

    let paprikaId = "btc-bitcoin";
    if (coin_name === "ethereum") paprikaId = "eth-ethereum";
    else if (coin_name === "solana") paprikaId = "sol-solana";
    let b1 = await fetch("https://api.coinpaprika.com/v1/tickers/" + paprikaId);
    let b2 = await b1.json();
    let count = b2.quotes.USD.price;

    if (kol === 0){
        return {
            coingecko: a2,
            paprika: count
        };
    } else{return[]}
}

async function daily_quote() {
    try {
        let a1 = await fetch("https://dummyjson.com/quotes/random");
        let a2 = await a1.json();
        return a2.quote + " - " + a2.author;
    } catch (error) {return "Tracking crypto and its historical data and not only..."}
}