const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPEN_EXCHANGE_RATES_API_KEY;
const BASE_URL = "https://openexchangerates.org/api";

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest.json`, {
      params: {
        app_id: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

module.exports = { fetchExchangeRates };
