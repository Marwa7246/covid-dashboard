export const SET_USER = "SET_USER";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_FAVOURITES = "SET_FAVOURITES";
export const SET_FAVOURITE_COUNTRY_HISTORICAL = 'SET_FAVOURITE_COUNTRY_HISTORICAL'

const dataReducer = (state, action) => {
  // const actions = {
  //   SET_USERS: {
  //     ...state,
  //     users: action.users,
  //     loading: false,
  //   },
  // };

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
        
        loading: false,
      };
    }

    case SET_FAVOURITE_COUNTRY_HISTORICAL: {
      return {
        ...state,
        favouriteCountryHistorical: action.favouriteCountryHistorical,
        loadingFavouriteHistorical: false,

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
