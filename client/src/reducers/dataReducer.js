export const SET_USERS = "SET_USERS";
// export const SET_HISTORICAL_GLOBAL = "SET_HISTORICAL_GLOBAL";
// export const SET_YESTERDAY_CONTINENTS = "SET_YESTERDAY_CONTINENTS";
// export const SET_YESTERDAY_GLOBAL = "SET_YESTERDAY_GLOBAL";
// export const SET_WORLD_COVID_NEWS = "SET_WORLD_COVID_NEWS";
// export const SET_MAP_DATA ='SET_MAP_DATA';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'

const dataReducer = (state, action) => {
  // const actions = {
  //   SET_USERS: {
  //     ...state,
  //     users: action.users,
  //     loading: false,
  //   },
  // };

  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
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

    // case SET_HISTORICAL_GLOBAL: {
    //   return {
    //     ...state,
    //     globalHistorical: action.globalHistorical,
    //     loading: false,
    //   };
    // }

    // case SET_YESTERDAY_CONTINENTS: {
    //   return {
    //     ...state,
    //     yesterdayContinents: action.yesterdayContinents,
    //     loading: false,
    //   };
    // }

    // case SET_YESTERDAY_GLOBAL: {
    //   return {
    //     ...state,
    //     yesterdayGlobal: action.yesterdayGlobal,
    //     loading: false,
    //   };
    // }

    // case SET_MAP_DATA: {
    //   return {
    //     ...state,
    //     mapData: action.mapData,
    //     loading: false,
    //   };
    // }

    // case SET_USER_FAVOURITES: {
    //   return {
    //     ...state,
    //     userFavourites: action.userFavourites,
    //     loading: false,
    //   };
    // }

    // case SET_WORLD_COVID_NEWS: {
    //   return {
    //     ...state,
    //     worldCovidNews: action.worldCovidNews,
    //     loading: false,
    //   };
    // }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

  // return actions[action.type] || state;
};

export default dataReducer;
