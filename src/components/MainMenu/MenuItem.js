import React from 'react';

class MenuItem extends React.Component {

    render(){
        return (
            <li onclick=""><i></i><span>{this.props.children}</span></li>
        );
    }
}

export default MenuItem;