export const SET_MAP_DATA = 'SET_MAP_DATA';
export const SET_USER_FAVOURITES = 'SET_USER_FAVOURITES';


const mapReducer = (state, action) => {
  switch (action.type) {



    case SET_MAP_DATA: {
      return {
        ...state,
        mapData: action.mapData,
        loading: false,
      };
    }

    case SET_USER_FAVOURITES: {
      return {
        ...state,
        userFavourites: action.userFavourites,
        loading: false,
      };
    }

    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }




  // return actions[action.type] || state;
};

export default mapReducer;
