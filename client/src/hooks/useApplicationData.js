import { useEffect, useReducer } from "react";
import axios from "axios";
import dataReducer, {
  SET_USER,
  SET_APPLICATION_DATA,
  SET_FAVOURITES,
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
    allFavouriteCountries: [],    
    loading: true,
    loadingFavourites: true,
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
    const id=1;
    const email = localStorage.getItem("userEmail");
    console.log(email)
    const token = localStorage.getItem("token");


    //console.log('from saveFavourites', {user_email: "test2@gmail.com", country_name: allFavouriteCountries[0]})

    return axios ({ method: 'POST', url: `/api/favourites`, headers: {
      Authorization: `Bearer ${token}`}, data: {email: email, country_name: allFavouriteCountries} })
    .then((res) => {
      console.log('After saving favourites from userApplicationData', res)
      dispatch({ type: SET_FAVOURITES, allFavouriteCountries });
    });
  }

  function getFavourites(userEmail) {
    const email = localStorage.getItem("userEmail");

    // const email="test2@gmail.com";
    console.log('from getFavourites', userEmail)


    return axios.get(`/api/users/${email}`)
    .then((res) => {
      console.log('after axios get', res.data)
      dispatch({ type: SET_FAVOURITES, allFavouriteCountries: res.data });
    });
  }


  return {
    state,
    dispatch, saveFavourites, getFavourites
  };
};

export default useApplicationData;
