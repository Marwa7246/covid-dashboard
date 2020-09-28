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

// const API_KEY = process.env.NEWS_API_KEY;
// const NEWS_URL = `http://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&lang=en&q=covid&sortby=publishedAt`;
// console.log("NEWS_URL is @@@@@@@", NEWS_URL);

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

  const newsUrl = `http://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&language=en&q=covid&sortby=publishedAt`
  
  console.log(newsUrl)

  useEffect(() => {
    Promise.all([
    axios.get(" https://disease.sh/v3/covid-19/continents"),
    axios.get(" https://disease.sh/v3/covid-19/historical/all?lastdays=20"),
    axios.get(" https://disease.sh/v3/covid-19/all"),
    axios.get(" https://disease.sh/v3/covid-19/countries"),
    axios.get(newsUrl)
  ]).then((all) => {
    console.log(all)
      // update the state with the result
      dispatch({ 
        type: SET_APPLICATION_DATA, 
        yesterdayContinents: all[0].data,
        globalHistorical: all[1].data,
        yesterdayGlobal: all[2].data,
        mapData: all[3].data,
        worldCovidNews: all[4].data, 
      });

      // console.log(data);
    });
  }, []);

  console.log(state)
{


  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "/api/users",
  //   }).then(({ data }) => {
  //     // update the state with the result
  //     dispatch({ type: SET_USERS, users: data });
  //   });
  // }, []);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "https://disease.sh/v3/covid-19/historical/all?lastdays=20",
  //   }).then(({ data }) => {
  //     // update the state with the result
  //     dispatch({ type: SET_HISTORICAL_GLOBAL, globalHistorical: data });
  //     // console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: " https://disease.sh/v3/covid-19/continents",
  //   }).then(({ data }) => {
  //     // update the state with the result
  //     dispatch({ type: SET_YESTERDAY_CONTINENTS, yesterdayContinents: data });
  //     // console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: " https://disease.sh/v3/covid-19/all",
  //   }).then(({ data }) => {
  //     // update the state with the result
  //     dispatch({ type: SET_YESTERDAY_GLOBAL, yesterdayGlobal: data });
  //     // console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   // ****** Place API key in the environment variables ****
  //   axios({
  //     method: "GET",
  //     url:
  //       // NEWS_URL,
  //       "###",
  //   }).then(({ data }) => {
  //     // update the state with the result
  //     dispatch({ type: SET_WORLD_COVID_NEWS, worldCovidNews: data });
  //     // console.log(
  //     //  "useApplicationData.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  //     // console.log(data);
  //   });
  // }, []);
}
  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
