import { useQuery, gql } from '@apollo/client';

const weatherQuery = gql`
  query weather($lat: Float, $lon: Float) {
    weather(lat: $lat, lon: $lon) {
      state
      temp
      humidity
      time
    }
  }
`;

export const useWeather = ({ lat, lon }) =>
  useQuery(weatherQuery, {
    variables: {
      lat,
      lon,
    },
    skip: !(lat && lon),
  });
