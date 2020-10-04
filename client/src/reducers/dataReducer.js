export const SET_USER = "SET_USER";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_FAVOURITES = "SET_FAVOURITES";
export const SET_FAVOURITE_COUNTRY_DATA = "SET_FAVOURITE_COUNTRY_DATA";

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    }

    case SET_APPLICATION_DATA: {
      return {
        ...state,
        globalHistorical: action.globalHistorical,
        yesterdayContinents: action.yesterdayContinents,
        yesterdayGlobal: action.yesterdayGlobal,
        mapData: action.mapData,
        worldCovidNews: action.worldCovidNews,
        currentGlobalData: action.currentGlobalData,
        currentCanadaData: action.currentCanadaData,

        loading: false,
      };
    }

    case SET_FAVOURITE_COUNTRY_DATA: {
      return {
        ...state,
        favouriteCountryHistorical: action.favouriteCountryHistorical,
        favouriteCountryNews: action.favouriteCountryNews,
        loadingFavouriteCountry: false,
      };
    }

    case SET_FAVOURITES: {
      return {
        ...state,
        allFavouriteCountries: action.allFavouriteCountries,
        loadingFavourites: false,
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

  // return actions[action.type] || state;
};

export default dataReducer;
