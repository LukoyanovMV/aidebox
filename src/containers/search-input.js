import StretchInput from '../components/StretchInput';
import { connect } from 'react-redux';
import actions from '../actions'

const mapStateToProps = (state) => {
    return {
        list: state.applications.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onValChanged: (event) => {
            dispatch(actions.newSearchQuery(event.target.value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StretchInput);