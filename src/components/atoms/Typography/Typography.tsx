import './Typography.scss';

interface TitleProps {
  children: React.ReactNode;
}

export const Title_03: React.FC<TitleProps> = ({ children }) => {
  return <h3 className="title-03">{children}</h3>;
};
