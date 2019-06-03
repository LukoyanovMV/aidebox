import React from 'react';

class Box extends React.Component {

    render(){
        let classes = ['tiny-Layout-box'];
        let style = {};

        if (this.props['classes']) {
            classes.push(this.props['classes'].trim());
        }

        this.props['width'] ? style.width = this.props['width'] : false;
        this.props['height'] ? style.height = this.props['height'] : false;

        return <div className={classes.join(' ')} style={style}>{this.props.children}</div>
    }
}

export  default Box;