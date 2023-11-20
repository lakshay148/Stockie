/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// const fetch = require('node-fetch');
const axios = require('axios');

const cors = require('cors')({origin: true});

exports.allmatches = onRequest((request, response) => {
  cors(request, response, async () => {
    const apiKey = '69711a85-0124-4828-b32e-658dec817d19';
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`;
    logger.info('Lakshay: ' + url);
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
        response.send({"stock": "price"});

    });
  });