import { useState, useRef } from 'react';
import { MenuItem, TextField, Typography } from '@mui/material';
import { getName } from 'country-list';
import Menu from '../Menu';
import { useCitySearch } from './util';

const CitySearch = ({ setCoordinates, setCity }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const { error, data } = useCitySearch(search);
  const { citySearch: cities = [] } = data ?? {};

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Typography mb={1}>Search for a city and choose one</Typography>
      <TextField
        ref={anchorRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <Menu ref={menuRef} anchorEl={anchorRef.current} open={open} onClose={() => setOpen(false)}>
        {cities.length > 0 &&
          cities.map(({ name, state, country, lat, lon }, index) => (
            <MenuItem
              onClick={() => {
                setCoordinates({ lat, lon });
                setCity({ name, state, country });
                setOpen(false);
              }}
              key={index}
            >
              {name}&nbsp;
              {state ? `, ${state}` : ''},&nbsp;{getName(country)}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default CitySearch;
