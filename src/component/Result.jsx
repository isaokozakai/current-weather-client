import { getName } from 'country-list';
import { Paper, Typography } from '@mui/material';

const Result = ({ result: { state, temp, humidity, time } }) => {
  return (
    <Paper variant="outlined">
      <Typography>
        Current Weather&nbsp;
        {new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
      </Typography>
      <Typography>State: {state}</Typography>
      <Typography>Temperature: {temp}°C</Typography>
      <Typography>Humidity: {humidity}%</Typography>
    </Paper>
  );
};

export default Result;
