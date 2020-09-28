import { useEffect, useReducer } from 'react';
import axios from 'axios';
import mapReducer, { SET_MAP_DATA } from '../reducers/mapReducer';

const useApplicationMapData = () => {
  const [stateMap, dispatch] = useReducer(mapReducer, {
    mapData: [],
    userFavourite: [],
    loading: true,
  });

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'https://disease.sh/v3/covid-19/countries',
  //   }).then(({ data }) => {
  //     console.group(data)
  //     // update the state with the result
  //     dispatch({ type: SET_MAP_DATA, mapData: data });
  //   });
  // }, []);

  return {
    stateMap,
  };
};

export default useApplicationMapData;
