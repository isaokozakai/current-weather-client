import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getName } from 'country-list';
import CitySearch from '../CitySearch';
import Result from '../Result';
import { useWeatherSearch } from './util';

const Main = ({}) => {
  const [coordinates, setCoordinates] = useState({});
  const [city, setCity] = useState();
  const { name, state, country } = city ?? {};
  const { error, loading, data } = useWeatherSearch(coordinates);
  const { weatherSearch: weather } = data ?? {};

  if (error) {
    console.error(error);
  }

  return (
    <Box my={5} mx={7}>
      <Typography variant="h2" mb={4}>
        Current Weather Search
      </Typography>
      <Box display="div" mb={4}>
        <CitySearch setCoordinates={setCoordinates} setCity={setCity} />
      </Box>
      {city && (
        <Typography display="div" mb={1}>
          {name}&nbsp;
          {state ? `, ${state}` : ''},&nbsp;{getName(country)}
        </Typography>
      )}
      {(() => {
        if (loading) return <CircularProgress />;
        if (weather) return <Result result={weather} />;
      })()}
    </Box>
  );
};

export default Main;
