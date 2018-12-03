import React, {Component} from 'react';

class Contact extends Component{


    render() {
        return(
            <div className='contacts-button-div'>
                <div className='contact-button'><h5><image>{this.props.image}</image>{this.props.name}</h5></div>
            </div>
         );
    }
}
export default Contact;