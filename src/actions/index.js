import types from './types';

export default {
    updateAppList: function(apps){
        return {
            type: types.NEW_APP_LIST,
            apps: apps
        };
    },
    
    newSearchQuery: function(query){
        return {
            type: types.NEW_SEARCH_QUERY,
            query: query
        }
    },

    performNavigation: function(direction){
        return function(dispatch, getState){

            let length = getState().applications.filteredList.length;
            let activeItem = getState().list.activeItem;

            switch (direction){
                case 'NEXT':{
                    activeItem = activeItem < length-1 ? activeItem + 1 : 0;
                    break;
                }
                case 'PREV':{
                    activeItem = activeItem != 0 ? activeItem - 1 : length - 1;
                    break;
                }
            }

            dispatch ({
                type: types.PERFORM_NAVIGATION,
                activeItem: activeItem,
                activeItemType: 'app'
            })
        }
    },
    
    executeCurrent: () => {
        return (dispatch, getState) => {
            let activeItem = getState().list.activeItem;
            let activeItemType = getState().list.activeItemType;
            
            dispatch({
                type: 'EXECUTE_APP',
                item: activeItem,
                itemType: activeItemType                 
            })
        }
    }
}
