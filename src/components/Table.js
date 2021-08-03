import { useEffect, useState } from "react";
import axios from "axios";

import TableRow from "../components/TableRow";
import Loading from "../components/Loading";

const Table = () => {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinData(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <table className="table">
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1 Day Change</th>
              <th className="market-cap">Market Cap</th>
            </tr>
            {coinData.map((info, index) => {
              return (
                <TableRow
                  key={index}
                  number={index + 1}
                  id={info.id}
                  name={info.name}
                  image={info.image}
                  symbol={info.symbol}
                  current_price={info.current_price}
                  price_change_24h={info.price_change_24h}
                  market_cap={info.market_cap}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
