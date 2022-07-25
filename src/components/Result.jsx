import { Paper, Box, Typography } from '@mui/material';

const Result = ({ result: { state, temp, humidity, time } }) => {
  return (
    <Paper variant="outlined" component={Box} py={1} px={2} sx={{ width: 'max-content' }}>
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
