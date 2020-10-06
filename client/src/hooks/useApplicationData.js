import { useEffect, useReducer } from "react";
import axios from "axios";
import dataReducer, {
  SET_USER,
  SET_APPLICATION_DATA,
  SET_FAVOURITES,
  SET_FAVOURITE_COUNTRY_DATA,
} from "../reducers/dataReducer";
require("dotenv").config();

const newsUrl = `http://newsapi.org/v2/top-headlines?q=covid&language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    user: {},
    globalHistorical: {},
    yesterdayContinents: [],
    yesterdayGlobal: {},
    mapData: [],
    worldCovidNews: {},
    allFavouriteCountries: [],
    favouriteCountryHistorical: {},
    favouriteCountryNews: {},
    currentGlobalData: {},
    currentCanadaData: {},
    historicalCanadaData: {},
    historicalCountriesForSms: [],

    loading: true,
    loadingFavourites: true,
    loadingFavouriteCountry: true,
  });

  useEffect(() => {
    Promise.all([
      axios.get(" https://disease.sh/v3/covid-19/continents"),
      axios.get(" https://disease.sh/v3/covid-19/historical/all"),
      axios.get(" https://disease.sh/v3/covid-19/all"),
      axios.get(" https://disease.sh/v3/covid-19/countries"),
      axios.get(newsUrl),
      axios.get(" https://disease.sh/v3/covid-19/all"),
      axios.get(" https://disease.sh/v3/covid-19/countries/canada?strict=true"),
      axios.get(" https://disease.sh/v3/covid-19/historical/canada?lastdays=30"),
      axios.get(" https://disease.sh/v3/covid-19/historical?lastdays=7")
    ]).then((all) => {
      // update the state with the result
      dispatch({
        type: SET_APPLICATION_DATA,
        yesterdayContinents: all[0].data,
        globalHistorical: all[1].data,
        yesterdayGlobal: all[2].data,
        mapData: all[3].data,
        worldCovidNews: all[4].data,
        currentGlobalData: all[5].data,
        currentCanadaData: all[6].data,
        historicalCanadaData: all[7].data,
        historicalCountriesForSms: all[8].data
      });
    });
  }, []);

  function saveFavourites(allFavouriteCountries) {
    const email = localStorage.getItem("userEmail");
    console.log(email);
    const token = localStorage.getItem("token");

    return axios({
      method: "POST",
      url: `/api/favourites`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { email: email, country_name: allFavouriteCountries },
    }).then((res) => {
      console.log("After saving favourites from userApplicationData", res.data);
      localStorage.setItem("favourites", JSON.stringify(res.data.favourites));
      dispatch({
        type: SET_FAVOURITES,
        allFavouriteCountries: res.data.favourites,
      });
    });
  }

  function deleteFavourites(countryName) {
    const email = localStorage.getItem("userEmail");
    console.log(email);
    const token = localStorage.getItem("token");

    return axios({
      method: "DELETE",
      url: `/api/favourites/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { email: email, country_name: countryName },
    }).then((res) => {
      console.log(
        "After deleting favourite from userApplicationData",
        res.data
      );
      localStorage.setItem("favourites", JSON.stringify(res.data.favourites));
      dispatch({
        type: SET_FAVOURITES,
        allFavouriteCountries: res.data.favourites,
      });
    });
  }

  function getFavourites(userEmail) {
    const email = localStorage.getItem("userEmail");

    // const email="test2@gmail.com";
    console.log("from getFavourites", userEmail);

    return axios.get(`/api/users/${email}`).then((res) => {
      console.log("after axios get", res.data);
      dispatch({ type: SET_FAVOURITES, allFavouriteCountries: res.data });
    });
  }

  function getHistoricalCountry(countryName, period) {
    const historicalCountryUrl = `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=${period}`;

    const newsUrlCountry = `http://newsapi.org/v2/top-headlines?country=${countryName}&q=covid&lang=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
    console.log('countryName',countryName, newsUrlCountry);

    return Promise.all([
      axios.get(historicalCountryUrl),
      axios.get(newsUrlCountry),
    ]).then((all) => {
      console.log("after axios get", all[0].data);
      console.log("after axios get", all[1].data);
      dispatch({
        type: SET_FAVOURITE_COUNTRY_DATA,
        favouriteCountryHistorical: all[0].data,
        favouriteCountryNews: all[1].data,
      });
    });
  }

  function sendSMS (countries) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    return axios({
      method: "POST",
      url: `/api/twilios`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { countries: countries, email: email },
    }).then((res) => {
      console.log("After sending SMS", res);

    });
  }

  return {
    state,
    dispatch,
    saveFavourites,
    getFavourites,
    getHistoricalCountry,
    deleteFavourites,
    sendSMS
  };
};

export default useApplicationData;
