import './Footer.scss';
function Footer() {
  const local = ["SĐT:  0864894987", "Địa chỉ:  Hà Đông, Hà Nội", "Email: tienthanh@gmail.com", "Tòa nhà Sông Đà, số 24 Phạm Hùng, Nam Từ Liêm, Hà Nội"];
  const company = [
    "Điều khoản sử dũng",
    "Điều khoản bảo mật thông tin",
  ];
  const place = [
    "Hướng dẫn",
    "Thông tin liên hệ",
    
  ];
  const join = [
    "Nicequiz",
    "Nick Tick",
    "Card Visit Online",
    "QR Code",
    "Software consultant",
  ];

  return (
    <div className="footer">
      <div className="footer-pro">
        <div className="footer-content">
          <p className="footer-heading">Thông tin liên hệ</p>
          <ul className="footer__list">
            {local.map((item, index) => (
              <li className="footer_item" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-content">
          <p className="footer-heading">Điều khoản</p>
          <ul className="footer__list">
            {place.map((item, index) => (
              <li className="footer_item" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-content">
          <p className="footer-heading">Hướng dẫn</p>
          <ul className="footer__list">
            {company.map((item, index) => (
              <li className="footer_item" key={index}>
                <a href="" className="footer_a">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-content">
          <p className="footer-heading">Sản phẩm khác</p>
          <ul className="footer__list">
            {join.map((item, index) => (
              <li className="footer_item" key={index}>
                <a href="" className="footer_a_b">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
