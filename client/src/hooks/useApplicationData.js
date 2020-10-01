import { useEffect, useReducer } from "react";
import axios from "axios";
import dataReducer, {
  SET_USER,
  SET_APPLICATION_DATA,
} from "../reducers/dataReducer";
require("dotenv").config();

const newsUrl = `http://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&language=en&q=covid&sortby=publishedAt`;

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    user: {},
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

  function saveFavourites(allFavouriteCountries) {

console.log('from saveFavourites', allFavouriteCountries)
    // return axios.post(`/api/appointments/${id}`, allFavouriteCountries).then(() => {
    //   dispatch({ type: SET_FAVOURITES, allFavouriteCountries });
    // });
  }


  return {
    state,
    dispatch, saveFavourites,
  };
};

export default useApplicationData;
