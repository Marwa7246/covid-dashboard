import { useEffect, useReducer } from "react";
import axios from "axios";
import dataReducer, {
  SET_USERS,
  // SET_HISTORICAL_GLOBAL,
  // SET_YESTERDAY_CONTINENTS,
  // SET_YESTERDAY_GLOBAL,
  // SET_MAP_DATA,
  // SET_WORLD_COVID_NEWS,
  SET_APPLICATION_DATA,
} from "../reducers/dataReducer";
require("dotenv").config();

const newsUrl = `http://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&language=en&q=covid&sortby=publishedAt`;

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    globalHistorical: {},
    yesterdayContinents: [],
    yesterdayGlobal: {},
    mapData: [],
    worldCovidNews: {},
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      axios.get(" https://disease.sh/v3/covid-19/continents"),
      axios.get(" https://disease.sh/v3/covid-19/historical/all?lastdays=20"),
      axios.get(" https://disease.sh/v3/covid-19/all"),
      axios.get(" https://disease.sh/v3/covid-19/countries"),
      axios.get(newsUrl),
    ]).then((all) => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", all);
      // update the state with the result
      dispatch({
        type: SET_APPLICATION_DATA,
        yesterdayContinents: all[0].data,
        globalHistorical: all[1].data,
        yesterdayGlobal: all[2].data,
        mapData: all[3].data,
        worldCovidNews: all[4].data,
      });
    });
  }, []);

  // useEffect(() => {
  //   Promise.all([axios.get("/api/users")]).then((data) => {
  //     // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", all);
  //     // update the state with the result
  //     dispatch({ type: SET_USERS, users: data });
  //   });
  // }, []);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
