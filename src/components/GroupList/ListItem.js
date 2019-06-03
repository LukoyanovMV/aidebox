import React from 'react';

class ListItem extends React.Component {

    constructor (props){
        super(props);
        this._svg = "";
    }

    static _createSVG (svgString){
        var parser = new DOMParser();
        var doc = parser.parseFromString(svgString, "image/svg+xml");
        var svgEl = doc.getElementsByTagName('svg')[0];
        return React.createElement('svg',{
            'viewBox': "0 0 "+parseInt(svgEl.getAttribute('width'))+" "+parseInt(svgEl.getAttribute('width')),
            width: 24,
            height: 24,
            dangerouslySetInnerHTML: {__html: svgEl.innerHTML}
        });
    }

    render() {
        let item = this.props.item;
        let iconStyle = {};
        let classes = ["gl-list-item"];

        if (item.icon.type == 'png') {
            iconStyle['backgroundImage'] = "url('"+item.icon['data']+"')";
        } else if (item.icon.type == 'svg' && this._svg == "") {
            this._svg = ListItem._createSVG(item.icon['data']);
        }

        if (this.props.active == 1) {
            classes.push('active');
        }

        return (
            <li className={classes.join(' ')}>
                <i style={iconStyle}>{this._svg}</i>
                <span>{item.label}</span>
            </li>
        )
    }
}

export default ListItem;