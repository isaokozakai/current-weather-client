import { useQuery, gql } from '@apollo/client';

const citySearchQuery = gql`
  query citySearch($search: String) {
    citySearch(search: $search) {
      name
      state
      country
      lat
      lon
    }
  }
`;

export const useCitySearch = (search) =>
  useQuery(citySearchQuery, {
    variables: {
      search,
    },
    skip: !search,
    pollInterval: 500,
  });
