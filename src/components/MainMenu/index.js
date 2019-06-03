import React from 'react';
import MenuItem from './MenuItem'

class MainMenu extends React.Component {

    constructor(){
        super();
        this.state = {
            activated: false
        };
        this.handleMenuActivation = this.handleMenuActivation.bind(this);
    }

    handleMenuActivation(){
        this.setState({activated: !this.state.activated});
        console.log('switch activity');
    }

    handleItemClick(){

    }

    render(){

        let classes = ['main-menu'];
        let style = {};

        if (this.props['classes']) {
            classes.push(this.props['classes'].trim());
        }

        if (this.state.activated) {
            classes.push('active');
        }

        return (
            <div className={classes.join(' ')} style={style}>
                <div className="main-menu-cont">
                    <div>
                        <button className="main-menu-button" onClick={this.handleMenuActivation}>&nbsp;</button>
                    </div>
                    <div className="main-menu-body">
                        <ul className="menu-items">
                            <MenuItem icon="">Menu item 1</MenuItem>
                            <MenuItem icon="">Menu item 1</MenuItem>
                            <MenuItem icon="">Menu item 1</MenuItem>
                            <MenuItem icon="">Menu item 1</MenuItem>
                            <MenuItem icon="">Menu item 1</MenuItem>
                        </ul>
                    </div>
                </div>
            </div>)
    }
}

export default MainMenu;