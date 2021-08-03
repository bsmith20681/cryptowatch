const Footer = () => {
  const getYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <hr></hr>
      <p className="footer-text">
        ©{getYear}{" "}
        <strong>
          Crypto<span style={{ color: "#27AB83" }}>watch</span>
        </strong>{" "}
        All Rights Reserved
      </p>
      <p className="footer-text">
        Data is pulled from{" "}
        <a href="https://www.coingecko.com/api/documentations/v3">
          CoinGecko.com's
        </a>{" "}
        api
      </p>
    </footer>
  );
};

export default Footer;
