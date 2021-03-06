import classes from './Card.module.css';

interface Props {
  children: React.PropsWithChildren<{}>;
}

const Card: React.FC<Props> = ({ children }: Props) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
