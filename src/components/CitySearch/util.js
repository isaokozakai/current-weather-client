import { useQuery, gql } from '@apollo/client';

const citiesQuery = gql`
  query cities($search: String) {
    cities(search: $search) {
      name
      state
      country
      lat
      lon
    }
  }
`;

export const useCities = (search) =>
  useQuery(citiesQuery, {
    variables: {
      search,
    },
    skip: !search,
    pollInterval: 500,
  });
