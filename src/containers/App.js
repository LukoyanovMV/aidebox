import React from 'react';
import CommonSearch from '../modules/CommonSearch';
import { connect } from 'react-redux';
import actions from '../actions'

const App = React.createClass({

    propTypes: {
        system: React.PropTypes.object.isRequired
    },

    _onKeyDown: function(e){

        let ctrl = e.ctrlKey,
            shift = e.shiftKey,
            alt = e.altKey;

        // (LEFT)
        if (e.keyCode == 37) {
            // this.props.onNavKey();
            // event.preventDefault();
        }

        //  (UP)
        if (e.keyCode == 38 && !ctrl && !shift && !alt) {
            this.props.onNavigation('PREV');
            event.preventDefault();
        }
        // RIGHT
        if (e.keyCode == 39) {
            // this.props.onNavKey();
            // e.preventDefault();
        }
        // DOWN
        if (e.keyCode == 40 && !ctrl && !shift && !alt) {
            console.log('down');
            this.props.onNavigation('NEXT');
            e.preventDefault();
        }

        // Execute command
        if (e.keyCode == 13) {
            console.log('Execute command');
            // ipcRenderer.send('execCommand', that.resultList.getSelected());
        }

    },

    componentWillMount:function(){
        window.addEventListener("keydown", this._onKeyDown);
    },


    render: function() {
        let system = this.props.system;

        if (!system) {
            return null;
        }

        if (system.activeModule == 'commonSearch') {
            return <CommonSearch />;
        }
    }
});

const mapStateToProps = function(state) {
    return {
        system: state.system
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        onNavigation: (direction)=>{
            dispatch(actions.performNavigation(direction))
        },
        onExecute: ()=>{
            dispatch(actions.performNavigation(direction))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

