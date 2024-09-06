import { FaBtc } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import InfoDisplay from "../components/InfoDisplay";
import TextInput from "../components/TextInput";
import useFetchBitcoinPrice from "../hooks/useFetchBitcoinPrice";

function BitcoinConverter() {
  const { bitcoinPrice, lastUpdated } = useFetchBitcoinPrice;
  const [usdAmount, setUsdAmount] = useState("");
  const [convertedBtc, setConvertedBtc] = useState("--");

  // Handle USD input and conversion
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
        <div className="mb-4 flex justify-between">
          <TextInput
            label="USD:"
            icon={FaDollarSign}
            value={usdAmount}
            onChange={handleUsdChange}
            placeholder="Enter amount in USD"
          />
          <InfoDisplay label="BTC:" icon={FaBtc} value={convertedBtc} />
        </div>
        <Button onClick={handleConvert} className="text-white shadow-md">
          Convert
        </Button>
      </div>
    </div>
  );
}

export default BitcoinConverter;
