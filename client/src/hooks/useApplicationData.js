import { useEffect, useReducer } from 'react';
import axios from 'axios';
import dataReducer, { SET_USERS, SET_HISTORICAL_GLOBAL, SET_YESTERDAY_CONTINENTS, SET_YESTERDAY_GLOBAL } from '../reducers/dataReducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    globalHistorical: {},
    yesterdayContinents: [],
    yesterdayGlobal: {},
    loading: true,
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_USERS, users: data });
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://disease.sh/v3/covid-19/historical/all?lastdays=20',
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_HISTORICAL_GLOBAL, globalHistorical: data });
      // console.log(data);
    });
  }, []);

 

  useEffect(() => {
    axios({
      method: 'GET',
      url: ' https://disease.sh/v3/covid-19/continents',
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_YESTERDAY_CONTINENTS, yesterdayContinents: data });
      // console.log(data);
    });
  }, []);

  


  useEffect(() => {
    axios({
      method: 'GET',
      url: ' https://disease.sh/v3/covid-19/all',
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_YESTERDAY_GLOBAL, yesterdayGlobal: data });
      console.log(data);
    });
  }, []);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
