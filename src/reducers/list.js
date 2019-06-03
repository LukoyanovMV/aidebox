import initialState from '../initialState';
import aTypes from '../actions/types';

const reducer = (state = initialState(), action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {

        case aTypes.NEW_SEARCH_QUERY:{
            newState.activeItem = 0;
            newState.activeItemType = 'app';
            return newState;
        }
        
        case aTypes.PERFORM_NAVIGATION:{
            newState.activeItem = action.activeItem;
            newState.activeItemType = action.activeItemType;
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;