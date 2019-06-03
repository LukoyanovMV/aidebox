import React from 'react';

var directions = [
    'row',
    'row-reverse',
    'column',
    'column-reverse'
];

class Layout extends React.Component {

    render(){

        let direction = !!~directions.indexOf(this.props['type']) ? this.props['type'] : 'row';
        
        let classes = ['tiny-Layout'];

        if (this.props['classes']) {
            classes.push(this.props['classes'].trim());
        }

        let style = {
            flexDirection: direction
        };

        return <div className={classes.join(' ')} style={style}>{this.props.children}</div>
    }
}

export default Layout;