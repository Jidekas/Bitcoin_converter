import { useState, useEffect } from "react";

import React from "react";

const useFetchBitcoinPrice = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch the current price of Bitcoin
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await response.json();

        setBitcoinPrice(data.bitcoin.usd);
        setLastUpdated(new Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };

    fetchBitcoinPrice();

    const intervalId = setInterval(fetchBitcoinPrice, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { bitcoinPrice, lastUpdated };
};

export default useFetchBitcoinPrice;
