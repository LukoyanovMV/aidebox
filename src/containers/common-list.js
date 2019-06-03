import GroupList from '../components/GroupList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        list: state.applications.filteredList,
        activeItem: state.list.activeItem
    };
};

export default connect(mapStateToProps/*, mapDispatchToProps*/)(GroupList);