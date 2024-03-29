import { useState, useRef } from 'react';
import { FormControl, FormHelperText, MenuItem, TextField, Typography } from '@mui/material';
import { getName } from 'country-list';
import Menu from '../Menu';
import { useCities } from './util';

const CitySearch = ({ setCoordinates, setCity }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { error, data } = useCities(search);
  const { cities = [] } = data ?? {};

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Typography mb={1}>Search for a city and choose one</Typography>
      <FormControl error={Boolean(error)}>
        <TextField
          ref={anchorRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          sx={{ width: '300px' }}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
      <Menu anchorEl={anchorRef.current} open={open} onClose={() => setOpen(false)}>
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
              {name}
              {state ? `, ${state}` : ''},&nbsp;{getName(country)}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default CitySearch;
