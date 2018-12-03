import React, {Component} from 'react';

class Notificationbutt extends Component{

    render(){
        return (
            <div className='notification-button-div'>
                <div className='notification-button' >
                    <div>
                        <h5><image height="50">{this.props.image}{this.props.name}</image></h5>
                        <h5> Did something</h5>
                    </div>
                </div>
            </div>
        );
    }
}
export default Notificationbutt ;