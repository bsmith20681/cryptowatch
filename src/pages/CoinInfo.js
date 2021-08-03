import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import axios from "axios";
import { Line as LineChart } from "react-chartjs-2";
import moment from "moment";
import parse from "html-react-parser";

const CoinInfo = ({ match }) => {
  const [coinPriceHistory, setCoinPriceHistory] = useState("");
  const [coinDescription, setCoinDescription] = useState("");
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
      .all([
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${url}/market_chart?vs_currency=usd&days=30&interval=daily`
        ),
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${url}?localization=false`
        ),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setCoinPriceHistory(
            firstResponse.data.prices.map((price) => price[1].toFixed(2))
          );
          setCoinDescription(secondResponse.data);
          setLoading(false);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout>
      <div className="coinInfo">
        <div className="container">
          <div>
            {loading ? (
              "loading"
            ) : (
              <div>
                <div style={{ maxWidth: 850, backgroundColor: "#fff" }}>
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
                        title: {
                          display: true,
                          text: `${coinDescription.name}'s Average Price per Month`,
                        },
                      },
                    }}
                  />
                </div>
                <div className="coinInfo-container">
                  <h3>About {coinDescription.name}</h3>
                  <div>{parse(coinDescription.description.en)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinInfo;
