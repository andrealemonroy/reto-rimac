import './Typography.scss';

interface TitleProps {
  children: React.ReactNode;
}

export const Title03: React.FC<TitleProps> = ({ children }) => {
  return <h3 className="title-03">{children}</h3>;
};
