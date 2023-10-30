import RegionList from '../RegionList/RegionList';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1>Pokédex</h1>
      <RegionList />
    </header>
  );
};

export default Header;
