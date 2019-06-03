import { combineReducers } from 'redux';
import system from './system';
import applications from './applications';
import list from './list';

const combined = combineReducers({
    system,
    applications,
    list
});

export default combined;