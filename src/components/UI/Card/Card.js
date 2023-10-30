import classes from './Card.module.css';

const Card = props => {
  return (
    <div
      className={`${classes.Card} ${props.className}`}
      onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
