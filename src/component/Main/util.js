import { useQuery, gql } from '@apollo/client';

const weatherSearchQuery = gql`
  query weatherSearch($lat: Float, $lon: Float) {
    weatherSearch(lat: $lat, lon: $lon) {
      state
      temp
      humidity
      time
    }
  }
`;

export const useWeatherSearch = ({ lat, lon }) =>
  useQuery(weatherSearchQuery, {
    variables: {
      lat,
      lon,
    },
    skip: !(lat && lon),
  });
