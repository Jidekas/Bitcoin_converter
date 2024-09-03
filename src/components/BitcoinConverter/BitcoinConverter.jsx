import { useState, useEffect } from "react";
import { FaBtc } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

function BitcoinConverter() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [convertedBtc, setConvertedBtc] = useState("--");
  const [lastUpdated, setLastUpdated] = useState("");

  //fetch the current price of Bitcoin
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

  //handle USD input and conversion
  const handleUsdChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100000000)) {
      setUsdAmount(value);
    }
  };

  const handleConvert = () => {
    if (bitcoinPrice) {
      setConvertedBtc(usdAmount ? (usdAmount / bitcoinPrice).toFixed(8) : "--");
    } else {
      setConvertedBtc("--");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px] min-w-[350px] bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-[#6600b0] mb-4 text-center">
          Bitcoin Converter
        </h1>
        <div className="mb-4">
          <p className="text-lg">
            1 BTC ={" "}
            <span className="font-bold text-[#8811d8]">
              ${bitcoinPrice ? bitcoinPrice.toLocaleString() : "--"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Last Updated: <span>{lastUpdated}</span>
          </p>
        </div>
        <div className="mb-4 flex justify-between ">
          <div className=" w-[45%]">
            <label
              htmlFor="usdInput"
              className="block text-lg mb-2 flex items-center"
            >
              <FaDollarSign className="text-[#8811d8] mr-1" />
              <span>USD:</span>
            </label>
            <input
              type="text"
              id="usdInput"
              value={usdAmount}
              onChange={handleUsdChange}
              placeholder="Enter amount in USD"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
            />
          </div>

          <div className="w-[45%] flex flex-col items-center">
            <p className="text-lg self-start flex items-center">
              <FaBtc className="text-[#8811d8] mr-1" />
              <span>BTC: </span>
            </p>
            <span className=" text-[#8811d8] font-medium w-full p-2 border border-gray-300 rounded-lg mt-2">
              {convertedBtc}
            </span>
          </div>
        </div>
        <button
          className="border-gray-300 w-full bg-[#8811d8] text-white rounded-lg py-1 active:bg-[#9a36de]"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>
    </div>
  );
}

export default BitcoinConverter;
