import initialState from '../initialState';
import aTypes from '../actions/types';

const reducer = (state = initialState(), action) => {
    
    let newState = Object.assign({}, state);
    
    switch (action.type) {
        
        default: {
            return state;
        }
    }
};

export default reducer;