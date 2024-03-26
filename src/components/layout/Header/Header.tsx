import './Header.scss';
export const Header = () => {
  return (
    <div className="header">
      <div>
        <img src="./images/logo.svg" alt="logo" />
      </div>
      <div className="header__contact-info">
        <div className="header__contact-info--buy-now">
          ¡Compra por este medio!
        </div>
        <div className="header__contact-info--phone">
          <img src="./images/phone.svg" alt="phone" />
          <div>(01) 411 6001</div>
        </div>
      </div>
    </div>
  );
};
