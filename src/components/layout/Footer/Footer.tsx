import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src="./images/logo_white.svg" alt="logo" />
      </div>
      <div className="footer__company-info">
        <div>© 2023 RIMAC Seguros y Reaseguros.</div>
      </div>
    </div>
  );
};
