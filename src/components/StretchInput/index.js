import React from 'react';
import ReactDOM from 'react-dom';

class StretchInput extends React.Component {

    static propTypes = {
        onValChanged: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        this.setState(
            {height: node.offsetHeight}
        );
    }

    shouldComponentUpdate(){
        let node = ReactDOM.findDOMNode(this);
        this.setState(
            {height: node.offsetHeight}
        );
        return true;
    }

    render(){

        let classes = ['search-input'];
        let contStyle = this.props['style'] ? this.props['style'] : {};
        let inputStyle = {};

        this.props['stretchFont'] ? inputStyle.fontSize = this.props['stretchFont'] : false;

        if (this.state && this.state.height) {
            contStyle.height = this.state.height
        }

        if (this.props['classes']) {
            classes.push(this.props['classes'].trim());
        }

        return (
        <div className={classes.join(' ')} style={contStyle}>
            <input
                style={inputStyle}
                placeholder="Type to search"
                onInput={this.props.onValChanged}
            />
        </div>);
    }
}

export default StretchInput;