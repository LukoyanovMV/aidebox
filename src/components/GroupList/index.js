import React from 'react';
import ListItem from './ListItem'

class GroupList extends React.Component{

    static propTypes = {
        list: React.PropTypes.array.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            activeItem: 0
        };
    }

    render(){
        let index = -1;
        let activeItem = this.props.activeItem;
        return (
            <div className="gl-list">
                {this.props.list.map(function(item){
                    index++;
                    return <ListItem key={item.iid} item={item} active={index == activeItem ? 1 : 0}/>;
                })}
            </div>
        )
    }
}

export default GroupList;