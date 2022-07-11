import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { getName } from 'country-list';
import AuthModal from '../AuthModal';
import CitySearch from '../CitySearch';
import Result from '../Result';
import { useWeather } from './util';

const Main = ({}) => {
  const [coordinates, setCoordinates] = useState({});
  const [city, setCity] = useState();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { name, state, country } = city ?? {};
  const { error, loading, data } = useWeather(coordinates);
  const { weather } = data ?? {};

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Box my={5} mx={7}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h2">Current Weather Search</Typography>
          {isAuthenticated ? (
            <Button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
              }}
              sx={{ height: 'max-content' }}
            >
              Log out
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)} sx={{ height: 'max-content' }}>
              Sign up / Log in
            </Button>
          )}
        </Box>
        <Box display="div" mb={4}>
          <CitySearch setCoordinates={setCoordinates} setCity={setCity} />
        </Box>
        {city && (
          <Typography mb={1}>
            {name}
            {state ? `, ${state}` : ''},&nbsp;{getName(country)}
          </Typography>
        )}
        {(() => {
          if (loading) return <CircularProgress />;
          if (weather) return <Result result={weather} />;
        })()}
      </Box>
      <AuthModal open={open} onClose={() => setOpen(false)} onSubmit={() => setIsAuthenticated(true)} />
    </>
  );
};

export default Main;
