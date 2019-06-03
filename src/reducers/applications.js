import initialState from '../initialState';
import aTypes from '../actions/types';
import Matcher from '../Matcher';

let matcher = new Matcher();

const getFilteredItems = (apps) => {
    let fullRes;
    let result = [];
    let maxResCount = 16;
    let i = 0;
    matcher.setWorkQuery(apps.filterQuery);

    fullRes = apps.list
        .filter(function (app) {
            app.matcherRes = matcher.test(app.appName);
            return app.matcherRes != false;
        })
        .sort(function (a, b) {
            return a.matcherRes.rank - b.matcherRes.rank;
        });

    maxResCount = fullRes.length < maxResCount ? fullRes.length : maxResCount;

    while (i < maxResCount) {
        result.push({
            iid: i,
            label: fullRes[i].appName,
            icon: fullRes[i].icon,
            type: 'application'
        });
        i++;
    }

    return result;
};



const reducer = (state = initialState(), action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {
        
        case aTypes.NEW_APP_LIST: {
            newState.list = action.apps;
            return newState;
        }

        case aTypes.NEW_SEARCH_QUERY: {
            newState.filterQuery = action.query;
            newState.filteredList = getFilteredItems(newState);
            return newState
        }

        default: {
            return state;
        }
    }
};

export default reducer;