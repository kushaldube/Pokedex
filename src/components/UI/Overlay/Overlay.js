import classes from './Overlay.module.css';

const Overlay = props => {
  return <div className={classes.Overlay}>{props.children}</div>;
};

export default Overlay;
