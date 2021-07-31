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
    </footer>
  );
};

export default Footer;
