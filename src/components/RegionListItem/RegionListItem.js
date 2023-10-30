import classes from './RegionListItem.module.css';
import DataContext from '../../store/data-context';

import { titleize } from '../../utils';
import { useContext } from 'react';

const RegionListItem = props => {
  const ctx = useContext(DataContext);

  const regionClickHandler = event => {
    ctx.updateRegion(event.target.dataset.region);
  };

  const classList = `${classes.RegionListItem} ${
    props.active ? classes.selected : ''
  }`;

  return (
    <div
      className={classList}
      data-region={props.name}
      data-start={props.start}
      data-end={props.end}
      onClick={regionClickHandler}>
      <h3>{titleize(props.name)}</h3>
    </div>
  );
};

export default RegionListItem;
