import { useEffect, useState } from "react";
import axios from "axios";

import TableRow from "../components/TableRow";

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
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <table className="table">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>1 Day Change</th>
        <th>Market Cap</th>
      </tr>
      {loading
        ? "loading"
        : coinData.map((info, index) => {
            return (
              <TableRow
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
    </table>
  );
};

export default Table;
