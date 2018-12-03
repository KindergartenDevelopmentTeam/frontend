import React, {Component} from 'react';

class People extends Component{
    typeName;

    render(){

        return(
        <div className = 'people-type-container'>
            <div className='people-button-div'>
                <div className='people-button'><h6><image height="40">{this.props.image}</image>{this.props.name}</h6></div>
            </div>
        </div>
        );
    }
}
export default People;