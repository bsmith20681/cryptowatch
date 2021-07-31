import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import axios from "axios";
import NumberFormat from "react-number-format";
import { Line as LineChart } from "react-chartjs-2";
import moment from "moment";

const CoinInfo = ({ match }) => {
  const [coinPriceHistory, setCoinPriceHistory] = useState("");
  const [loading, setLoading] = useState(true);
  const url = match.params.id;

  const lastTwelveMonths = [];
  for (let i = 0; i < 12; i++) {
    lastTwelveMonths.push(moment().subtract(i, "months").format("MMM YY"));
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const data = {
    labels: lastTwelveMonths.reverse(),
    datasets: [
      {
        label: "Price",
        data: coinPriceHistory,
        fill: true,
        backgroundColor: "rgba(101,214,173,0.2)",
        borderColor: "rgba(39, 171, 131,1)",
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${url}/market_chart?vs_currency=usd&days=30&interval=daily`
      )
      .then((res) => {
        setCoinPriceHistory(
          res.data.prices.map((price) => price[1].toFixed(2))
        );
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout>
      <div className="cointainer">
        <div style={{ maxWidth: 550 }}>
          {loading ? (
            "loading"
          ) : (
            <LineChart
              data={data}
              width={600}
              height={400}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CoinInfo;
