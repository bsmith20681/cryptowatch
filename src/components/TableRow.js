import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

const TableRow = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  const {
    number,
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_24h,
    market_cap,
  } = props;
  return (
    <tr className="tablerow">
      <td>{number}</td>
      <td>
        <img className="tablerow-image" src={image} alt={`${name} icon`} />
        <Link className="tablerow-name_link" to={`/${id}`}>
          {name} <span className="tablerow-symbol">{symbol.toUpperCase()}</span>
        </Link>
      </td>
      <td>{formatter.format(current_price)}</td>
      <td>
        {price_change_24h < 0 ? (
          <p className="tablerow-price_negative">
            {price_change_24h.toFixed(4)}%
          </p>
        ) : (
          <p className="tablerow-price_positive">
            {price_change_24h.toFixed(4)}%
          </p>
        )}
      </td>
      <td>{formatter.format(market_cap)}</td>
    </tr>
  );
};

export default TableRow;
