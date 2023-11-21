const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require('axios');
const cors = require('cors')({origin: true});

//API dashboard used for fetching cricket scores : https://cricketdata.org/member.aspx
exports.allmatches = onRequest((request, response) => {
  cors(request, response, async () => {
    const apiKey = '69711a85-0124-4828-b32e-658dec817d19';
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`;

    // response.send({"lakshay": "test"});
    try {
        const apiResponse = await axios.get(url);
        const data =  apiResponse.data;

        const indiaMatches = data.data.filter(match => match.name.includes("India"));
    
        response.send(indiaMatches);
      } catch (error) {
        logger.error('Error:', error);
        console.error('Error:', error);
        response.status(500).send(error);
      }
  });
});

exports.stockprices = onRequest((request, response) => {
    cors(request, response, async () => {
        let stockAndPrices = await getStockPrices(stockSymbols);
        response.send(stockAndPrices);
    });
  });

  async function getStockPrices(symbols) {
    const stockAndPrices = [];

    for (const symbol of symbols) {
        try {
            logger.log('Fetching stock price for symbol:', symbol);
            const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1h`);
            const data = response.data;

            const stockData = data.chart.result[0];

            const openPrice = stockData.indicators.quote[0].open[0];
            const closePrice = stockData.indicators.quote[0].close[0];

            const priceChange = closePrice - openPrice;
            const priceChangePercentage = (priceChange / openPrice) * 100;

            console.log(`Price Change for ${symbol}: ${priceChange}`);
            console.log(`Price Change Percentage for ${symbol}: ${priceChangePercentage}%`);
            stockAndPrices.push({symbol, closePrice, priceChange, priceChangePercentage});
            
        } catch (error) {
            console.error('Error fetching stock price for symbol:', symbol, error);
        }
    }
    return stockAndPrices;
}
// const stockSymbols = ['NYKAA.NS'];
const stockSymbols = ['NYKAA.NS', 'PAYTM.NS', 'BSE-SMLCAP.BO', 'BSE-MIDCAP.BO', '^BSESN'];