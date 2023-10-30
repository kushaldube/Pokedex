import classes from './RegionList.module.css';
import RegionListItem from '../RegionListItem';
import DataContext from '../../store/data-context';

import { useContext } from 'react';
import { REGIONS } from '../../utils';

const RegionList = () => {
  const ctx = useContext(DataContext);
  const selectedRegion = ctx.region;

  const regionClickHandler = event => {
    const dataset = event.target.dataset;
    ctx.updateRegion(dataset.region);
  };

  const regionListItems = REGIONS.map(region => (
    <RegionListItem
      key={region}
      name={region}
      active={region === selectedRegion}
      onRegionChange={regionClickHandler}
    />
  ));

  return <div className={classes.RegionList}>{regionListItems}</div>;
};

export default RegionList;
